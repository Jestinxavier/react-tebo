import React, { useCallback } from "react";
import FormProvider, {
  RHFTextField,
  RHFSelectPhoneNumber,
  RHFDatePicker,
} from "../../Component/MUI/hook-form";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography, Stack } from "@mui/material";
import { updateSignupData } from "../../Api/authApi";
import { useSnackbar } from "../../Component/MUI/snackbar";
import { useAuthContext } from "../../auth/useAuthContext";
import { formatDateToYYYYMMDD } from "../../utils/momentformat";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const theme = useTheme();
  const { register } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const defaultValues = {
    email: "",
  };

  const VerifySchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),

    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

    name: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters"),

    // date_of_birth: Yup.date()
    // .required("Date of Birth is required")
    // .max(new Date(new Date().setHours(0, 0, 0, 0) - 1), "Date of Birth must be in the past"),

    phone_number: Yup.string().required("Phone number is required"),
    // .matches(/^\d{10}$/, "Phone number must be a 10-digit number"),
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
      if (data.phone_number) {
        data.phone_number = data.phone_number.replace(/\s+/g, ""); // Remove all spaces
      }
      if (data.date_of_birth) {
        data.date_of_birth = formatDateToYYYYMMDD(data.date_of_birth);
      }
      try {
        await register(data);
        enqueueSnackbar("Login successfully", { variant: "success" });
        navigate("/");
        reset();
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
      // updateSignupData(data)
      //   .then((data) => {
      //     console.log("Data updated:", data);
      //     enqueueSnackbar("SignUp Successfully",{variant:"success"});

      //   })
      //   .catch((error) => {
      //     enqueueSnackbar(error.message,{variant:"error"});
      //     console.error("Error updating data:", error);
      //   });

      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("DATA:", {
        email: data.email,
      });

      // ... (other code)
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* <Grid item md={12}> */}
      <Grid container spacing={1}>
        <Grid item md={6} sx={12}>
          <Typography
            variant="p"
            display="flex"
            sx={{
              fontStyle: "italic",
              color: theme.palette.secondary.contrastText,
            }}
          >
            Username
          </Typography>
          <RHFTextField
            fullWidth
            sx={{
              borderRadius: "15px",
              marginTop: 0,
              "& fieldset": {
                borderRadius: "15px",
              },
              "& input": {
                borderRadius: "15px !important",
                height: "12px",
              },
            }}
            name="name"
            label=""
          />
        </Grid>

        <Grid item md={6} sx={12}>
          <Typography
            variant="p"
            display="flex"
            sx={{
              fontStyle: "italic",
              color: theme.palette.secondary.contrastText,
            }}
          >
            email
          </Typography>
          <RHFTextField
            fullWidth
            sx={{
              borderRadius: "15px",
              marginTop: 0,
              "& fieldset": {
                borderRadius: "15px",
              },
              "& input": {
                borderRadius: "15px !important",
                height: "12px",
              },
            }}
            name="email"
            label=""
          />
        </Grid>

        <Grid item md={6} sx={12}>
          <Typography
            variant="p"
            display="flex"
            sx={{
              fontStyle: "italic",
              color: theme.palette.secondary.contrastText,
            }}
          >
            Password
          </Typography>
          <RHFTextField
            fullWidth
            sx={{
              borderRadius: "15px",
              marginTop: 0,
              "& fieldset": {
                borderRadius: "15px",
              },
              "& input": {
                borderRadius: "15px !important",
                height: "12px",
              },
            }}
            type="password"
            name="password"
            label=""
          />
        </Grid>

        <Grid item md={6} sx={12}>
          <Typography
            variant="p"
            display="flex"
            sx={{
              fontStyle: "italic",
              color: theme.palette.secondary.contrastText,
            }}
          >
            confom Password
          </Typography>
          <RHFTextField
            fullWidth
            sx={{
              borderRadius: "15px",
              marginTop: 0,
              "& fieldset": {
                borderRadius: "15px",
              },
              "& input": {
                borderRadius: "15px !important",
                height: "12px",
              },
            }}
            type="password"
            name="confirm_password"
            label=""
          />
        </Grid>

        <Grid item md={6} sx={12}>
          <Typography
            variant="p"
            display="flex"
            sx={{
              fontStyle: "italic",
              color: theme.palette.secondary.contrastText,
            }}
          >
            Phone
          </Typography>
          <RHFSelectPhoneNumber
            fullWidth
            defaultCountry="GR"
            sx={{
              borderRadius: "15px",
              marginTop: 0,
              "& fieldset": {
                borderRadius: "15px",
              },
              "& input": {
                borderRadius: "15px !important",
                height: "12px",
              },
            }}
            name="phone_number"
          />
        </Grid>
        <Grid item md={6} sx={12}>
          <Typography
            variant="p"
            display="flex"
            sx={{
              fontStyle: "italic",
              color: theme.palette.secondary.contrastText,
            }}
          >
            Date
          </Typography>
          <RHFDatePicker
            name="date_of_birth"
            fullWidth
            sx={{
              borderRadius: "15px",
              marginTop: 0,
              "& fieldset": {
                borderRadius: "15px",
              },
              "& input": {
                borderRadius: "15px !important",
                height: "12px",
              },
            }}
          />
        </Grid>

        {/* </Grid> */}
      </Grid>

      <Grid container mt={theme.spacing(1)}>
        <Grid item md={12}>
          <Stack direction="row" spacing={2}>
            {/* <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                width: "100px",
                color: theme.palette.secondary.main,
                borderRadius: "15px",
                color: theme.palette.secondary.contrastText,
                padding: "9px",
                borderColor: "#d5d5d5",
                display: "flex",

                fontWeight: 100,
              }}
            >
              Login
            </Button> */}
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                width: "100px",
                color: theme.palette.secondary.main,
                borderRadius: "15px",
                background: theme.palette.grey[900],
                padding: "9px",
                borderColor: "#d5d5d5",
                display: "flex",

                fontWeight: 100,
              }}
            >
              Sign Up
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default SignupForm;
