import React, { useState,useCallback } from "react";
import FormProvider, {
  RHFTextField,
  RHFPasswordTextField,
} from "../../Component/MUI/hook-form";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import {updateLoginData} from "../../Api/authApi"
import {
  Grid,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "../../Routes/paths";
import Iconify from "../../Component/MUI/iconify";
import { useSnackbar } from '../../Component/MUI/snackbar';
import { useAuthContext } from '../../auth/useAuthContext';

function LoginForm() {
  const { login } = useAuthContext();
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    email: "",
    password:"",
  };
  const VerifySchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
      password: Yup.string()
      .required("Password is required"),
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
      await login(data.email, data.password);
      enqueueSnackbar('Login successfully',{variant:'success'})
      navigate('/')
      reset()
      
    } catch (error) {
      if(error.message=="Cannot destructure property 'owner' of '(intermediate value)(intermediate value)(intermediate value)' as it is undefined."){
        enqueueSnackbar('Incorrect Username or Password. Please try again.The selected owner email is invalid.',{variant:'error'})
        return 
      }else if(error.message=="Cannot read properties of undefined (reading 'owner')"){
        enqueueSnackbar('Incorrect Username or Password. Please try again.The selected owner email is invalid.',{variant:'error'})
        return
      }else{
      enqueueSnackbar(error.message,{variant:'error'})
      }

    }

    // try {
    //   updateLoginData(data)
    //     .then((data) => {
    //       console.log("Data updated:", data);
    //       enqueueSnackbar("SignUp Successfully",{variant:"success"});

    //     })
    //     .catch((error) => {
    //       enqueueSnackbar(error.message,{variant:"error"});
    //       console.error("Error updating data:", error);
    //     });

    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   console.log("DATA:", {
    //     email: data.email,
    //   });

    //   // ... (other code)

    // } catch (error) {
    //   console.error(error);
    // }
  }, []); 
  
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* <Grid item md={12}> */}
      <Grid container spacing={1}>
        <Grid item md={12}>
          <Typography
            variant="p"
            display="flex"
            sx={{
              fontStyle: "italic",
              color: theme.palette.secondary.contrastText,
            }}
          >
            Email
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
        <Grid item md={12}>
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
            name="password"
            label=""
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
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        {/* </Grid> */}
      </Grid>

      <Grid container mt={theme.spacing(1)}>
        <Grid item md={12}>
          <Stack direction="row" spacing={2}>
            <Button
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
            </Button>
            <Button
              onClick={() => navigate(PATH_AUTH.register)}
              type="submit"
              fullWidth
              variant="outlined"
              color="error"

              sx={{
                width: "100px",
                borderRadius: "15px",
                // background: theme.palette.grey[900],
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

export default LoginForm;
