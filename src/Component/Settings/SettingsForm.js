import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import FormProvider, {
  RHFTextField,
  RHFPasswordTextField,
  RHFSelectPhoneNumber,
  RHFDatePicker,
} from "../MUI/hook-form";
import { getUserDetails } from "../../redux/slices/userdetail";
import {
  regularFormatDate,
  formatDateToYYYYMMDD,
} from "../../utils/momentformat";
import { addProfile } from "../../Api/addProfile";
import {
  Grid,
  Card,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "../MUI/snackbar";
import ImageUpload from "../FileUpload/ImageUpload";
import SettingsCard  from "./Card/SettingsCard";
import {getRobot} from "../../redux/slices/robot"
import {dispatch,useSelector} from '../../redux/store';
import Grow from '@mui/material/Grow';
import NoRobotCard from '../../Component/Homepage/NoRobotCard'

const defaultValues = {
  email: "",
  phone_number: "",
};
function SettingsForm() {
  const { enqueueSnackbar } = useSnackbar();
  // const [value, setValue] = useState(defaultValues)
  const [image, setImage] = useState("");
  const myAllRobot = useSelector(state=>state?.robot?.robots?.robots)
  const [DateOfBerth, setDateOfBerth] = useState(new Date());
  const [checked, setChecked] = React.useState(false);

  const userDetail = useSelector(
    (state) => state?.userdetail?.userdetails?.owner
  );
  const theme = useTheme();

  const VerifySchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    phone_number: Yup.string().required("Phone Number is required"),
    name: Yup.string().required("Name is required"),
  });
  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getRobot())
    setChecked((prev) => !prev);
  }, []);


  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    if (userDetail !== undefined) {
      // const {name,email,date_of_birth,image_path} = userDetail
      const DOB = regularFormatDate(userDetail.date_of_birth);
      const responseValues = {
        name: userDetail?.name,
        email: userDetail?.email,
        date_of_birth: DOB,
        image_path: userDetail.image_path,
        phone_number: userDetail.phone,
      };

      setDateOfBerth(DOB);
      reset(responseValues);
    }
  }, [userDetail]);

  const onSubmit = useCallback(async (data) => {
    try {
      const dataOfBirth = formatDateToYYYYMMDD(data.date_of_birth);
      data.date_of_birth = dataOfBirth;
      let updatedData = null

  
   

        let profile_pic = image.imageFile.file;
         updatedData = {...data,profile_pic:profile_pic }
      

      if(updatedData){
        const responseData = await addProfile(data);
        if (responseData) {
          enqueueSnackbar(
            "Thank you for your complaint! We'll address it shortly.",
            { variant: "success" }
          );
          //   navigate("/");
          reset();
        }
      }

     
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }, []);

  return (
    <FormProvider
      methods={methods}
      sx={{ padding: 20 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {myAllRobot?<Grid container spacing={2} >
  
         
      {myAllRobot?.map((robotData,index)=><Grid item md={4} sm={12}>
          <SettingsCard robotData={robotData} key={index} />
          
        </Grid>)}
  
      </Grid>:<Box>
        
        <NoRobotCard 
           image ="/images/NoTeboSettings.gif"
           Heading = "You Have No Tebo"
           description ="No Tebo currently assigned to your email address"
            />
        </Box>}
    </FormProvider>
  ); 
}

export default SettingsForm;
