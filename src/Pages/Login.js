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
import LoginForm from "../Component/Auth/LoginForm";
import { PATH_AUTH } from "../Routes/paths";
import { LinkToNavigate } from "../Component/Link";

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

function Login() {
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

      <Stack
        justifyContent="flex-end"
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
                Login
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
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{ p: 3 }}
            >
              <Box sx={{ flex: 1 }}>
                <LoginForm />

                {/* <Typography variant="caption">
              Forgot {"  "}
              <Link
                href="#"
                variant="caption"
                sx={{
                  textDecoration: "none",
                  color: theme.palette.secondary.main,
                }}
              >
                Username or password?
              </Link>
            </Typography> */}
                <LinkToNavigate
                  HigliteName="Forgot "
                  Subject="Username or password?"
                  navigateTo={"/login"}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.secondary.contrastText,
                  }}
                  // onClick={}
                >
                  Sign Up Now
                </Typography>

                <SocialButton />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Login;
