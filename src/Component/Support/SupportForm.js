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
import { raseAticket } from "../../Api/raseAticket";
import {getTicket} from "../../redux/slices/robot"
import {dispatch} from "../../redux/store"

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

const defaultValues = {
  ticket_content: "",
};
function SupportForm() {
  const { enqueueSnackbar } = useSnackbar();

  // const [value, setValue] = useState(defaultValues)
  const [image, setImage] = useState("");
  const [DateOfBerth, setDateOfBerth] = useState(new Date());

  const theme = useTheme();

  const VerifySchema = Yup.object().shape({
    ticket_content: Yup.string()
      .required("This field is required"),
  });


  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;



  const onSubmit = useCallback(async (data) => {
    try {
      const responseData = await raseAticket(data); // Add "await" here
      if (responseData) {
        enqueueSnackbar("Thank you for your complaint! We'll address it shortly.", { variant: "success" });
        reset();
        dispatch(getTicket());
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
      
          
            <Grid container spacing={2} sx={{ padding: 3 }}>
              <Grid item md={12} sm={12}>
                <RHFTextField
                  fullWidth
                  type="textarea"
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
                  name="ticket_content"
                  label=""
                  variant="outlined"
                  placeholder="Enter your complaints here"
                  multiline
                  rows={5}
                  rowsMax={10}
                />
              
              </Grid>

            
            </Grid>
           
          
        
          <Stack display="flex" alignItems="flex-end" mt={5}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                width: "150px",

                borderRadius: "15px",
                color: theme.palette.secondary.contrastText,

                padding: "9px",
                borderColor: "#d5d5d5",
                display: "flex",

                fontWeight: 100,
              }}
            >
              Raise A Ticket
            </Button>
          </Stack>
      
    </FormProvider>
  );
}

export default SupportForm;
