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
import { useSnackbar } from "../../Component/MUI/snackbar";
import ImageUpload from "../FileUpload/ImageUpload";
import { useSelector, useDispatch } from "../../redux/store";
const defaultValues = {
  email: "",
  phone_number: "",
};
function ProfileForm() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  // const [value, setValue] = useState(defaultValues)
  const [image, setImage] = useState("");
  const [DateOfBerth, setDateOfBerth] = useState(new Date());
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
     
console.log(image,"image");
      if (image.upload) {
        data.profile_pic = image.imageFile.file;
      }
      console.log(data, "data**");

      const responseData = await addProfile(data);
      if (responseData) {
        enqueueSnackbar("Login successfully", { variant: "success" });
        //   navigate("/");
        reset();
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
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <ImageUpload
            image={image}
            setImage={setImage}
            name="Upload Your Profile"
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <Card>
            <Grid container spacing={2} sx={{ padding: 3 }}>
              <Grid item md={6} sm={12}>
                <RHFTextField
                  fullWidth
                  sx={{
                    margin: "10px",

                    borderRadius: "15px",
                    marginTop: "20px",
                    "& fieldset": {
                      borderRadius: "15px",
                    },
                    "& input": {
                      borderRadius: "15px !important",
                      height: "12px",
                      paddingBottom: "25px",
                    },
                  }}
                  name="name"
                  label="name"
                />
                <RHFSelectPhoneNumber
                  fullWidth
                  defaultCountry="GR"
                  sx={{
                    margin: "10px",
                    marginTop: "20px",

                    borderRadius: "15px",

                    "& fieldset": {
                      borderRadius: "15px",
                    },
                    "& input": {
                      borderRadius: "15px !important",
                      height: "12px",
                      paddingBottom: "25px",
                    },
                  }}
                  name="phone_number"
                  label="Phone Number"
                />
              </Grid>

              <Grid item md={6} sm={12}>
                <RHFTextField
                  fullWidth
                  sx={{
                    margin: "10px",

                    borderRadius: "15px",
                    marginTop: "20px",
                    "& fieldset": {
                      borderRadius: "15px",
                    },
                    "& input": {
                      borderRadius: "15px !important",
                      height: "12px",
                      paddingBottom: "25px",
                    },
                  }}
                  name="email"
                  label="email"
                />
                <Box
                  sx={{
                    marginLeft: "10px",

                    borderRadius: "15px",
                    marginTop: "20px",
                    "& fieldset": {
                      borderRadius: "15px",
                    },
                    "& input": {
                      borderRadius: "15px !important",
                      height: "12px",
                      paddingBottom: "25px",
                    },
                  }}
                >
                  <RHFDatePicker
                    name="date_of_birth"
                    fullWidth
                    dateValue={DateOfBerth}
                    sx={{
                      "& fieldset": {
                        borderRadius: "15px",
                      },
                      "& input": {
                        borderRadius: "15px !important",
                        height: "12px",
                        paddingBottom: "25px",
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Card>
          <Stack display="flex" alignItems="flex-end" mt={5}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                width: "100px",

                borderRadius: "15px",
                color: theme.palette.secondary.contrastText,

                padding: "9px",
                borderColor: "#d5d5d5",
                display: "flex",

                fontWeight: 100,
              }}
            >
              submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default ProfileForm;
