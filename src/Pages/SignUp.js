import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "styled-components";
import Divider from "@mui/material/Divider";
import SocialButton from "../Component/Homepage/SocialButton";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../Component/Logo/Logo";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "../Component/Auth";
import { LinkToNavigate } from "../Component/Link";
import { PATH_DASHBOARD, PATH_AUTH } from "../Routes/paths";

const LogoImage = styled("img")(({ theme }) => ({
  width: { sm: "50%", md: "100%", xs: "30%" },
  height: "auto",
  objectFit: "cover",
  marginLeft: 10,
  marginTop: 6,
  [theme.breakpoints.up("sm")]: {
    width: 320,
    height: 60,
  },
  [theme.breakpoints.up("md")]: {
    width: 320,
    height: 60,
  },
}));

const Item = styled("box")(({ theme }) => ({
  backgroundColor: "#ff000000",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SignUp() {
  const theme = useTheme();
  const [Form, setForm] = useState([]);
  const navigate = useNavigate();
  const formFieldValue = (name, value) => {
    let data = {};
    data[name] = value;
    setForm((pre) => {
      return { ...pre, ...data };
    });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    console.log(Form, "data*****");
  }, [Form]);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        navigate("/home");
        action.resetForm();
      },
    });



  return (
    <Stack
      sx={{
        height: { md: "100vh", xs: "" },
        backgroundImage: { md: "url(./images/LoginBg-Full.jpg)", xs: "" },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundPosition: "initial",
      }}
    >
      <Box>
        <Box>
          <Logo />
        </Box>
      </Box>
      <Grid container sx={{ height: "100%" }}>
        <Grid item md={6} sm={12}></Grid>
        <Grid item md={6} sm={12}>
          <Stack
            justifyContent="flex-end"
            alignItems="center"
            direction={{ xs: "column", sm: "row" }}
            sx={{ height: "100%" }}
          >
            <Box
              className="ggu10"
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                // width: { sm: "100%", md: "50%" },
                minHeight: 300,
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.background.default,
                  my: "6px",
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #ff000000",
                  borderRadius: "10px",
                  boxShadow: "-1px 3px 17px #adadad",
                }}
              >
                {/* Login header */}
                <Box
                  sx={{
                    backgroundColor: "#031521",
                    width: "100%",
                    borderRadius: "10px 10px 0px 0px",
                    pl: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-around",
                    height: "60px",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.background.default,
                      position: "relative",
                      display: "inline-block",
                      pb: "4px",
                    }}
                    component="h1"
                    variant="h6"
                  >
                    Sign up
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        borderBottom: "2px solid ",
                        borderColor: theme.palette.background.paper,
                      }}
                    />
                  </Typography>
                </Box>

                <Stack
                  direction="row"
                  // divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                  sx={{ p: 3 }}
                >
                  <Box sx={{ flex: 1 }}>
                    <SignupForm />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        width: "100%",
                        mt:1,
                        ml:1
                      }}
                    >
                      <LinkToNavigate
                        HigliteName="Go to "
                        Subject="Login page"
                        navigateTo={PATH_AUTH.login}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>
          {/* <div
            onClick={() => {
              navigate("/RobotVideoConferenceInterface/");
            }}
          >
            backup link
          </div> */}
        </Grid>
      </Grid>
    </Stack>
  );
}

export default SignUp;
