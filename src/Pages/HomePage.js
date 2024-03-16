import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import { useTheme } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "styled-components";
import Divider from "@mui/material/Divider";
import SocialButton from "../Component/Homepage/SocialButton";
const LogoImage = styled("img")(({ theme }) => ({
  width: "100% ",
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

const CustomTextField = styled(TextField)(() => ({
  borderRadius: "25px",
  marginTop: 0,
  "& fieldset": {
    borderRadius: "25px",
  },
  "& input": {
    borderRadius: "18px !important",
    height: "12px",
  },
}));
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function HomePage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundImage: "url(./images/LoginBg-Full.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={7}
        sx={
          {
            //   backgroundImage: 'url(https://source.unsplash.com/random)',
            //   backgroundRepeat: 'no-repeat',
            //   backgroundColor: (t) =>
            //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            //   backgroundSize: 'cover',
            //   backgroundPosition: 'center',
          }
        }
      >
        <Box>
          <LogoImage src="/images/Devlacus-Logo.png" alt="Image description" />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        // display="flex"
        //   component={Paper}
        elevation={6}
        square
      >
        <Box
          className="ggu10"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#ffffff",
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "1px solid #ff000000",
              borderRadius: "10px",
            }}
          >
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
                  color: "#fff",
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
                    borderBottom: "2px solid #fff",
                  }}
                />
              </Typography>
            </Box>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
              >
                <Item sx={{ width: "50%", p: "20px" }}>
                  <Typography
                    variant="p"
                    display="flex"
                    sx={{ fontStyle: "italic" }}
                  >
                    Username
                  </Typography>
                  <CustomTextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label=""
                    name="email"
                    //   autoComplete="email"
                    autoFocus
                    sx={{
                      borderRadius: "10px",
                      borderColor: "red",
                    }}
                  />
                  <Typography
                    variant="p"
                    display="flex"
                    sx={{ fontStyle: "italic" }}
                  >
                    Password
                  </Typography>
                  <CustomTextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label=""
                    type="password"
                    id="password"
                    //   autoComplete="current-password"
                  />

                  <FormControlLabel
                    sx={{ width: "100%" }}
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{
                      width: "100px",
                      mb: 2,
                      borderRadius: "20px",
                      color: "#000000",
                      padding: "9px",
                      borderColor: "#d5d5d5",
                      display: "flex",
                      fontWeight: 100,
                    }}
                  >
                    Sign In
                  </Button>
                  <Typography variant="caption">
                    Forgot {"  "}
                    <Link
                      href="#"
                      variant="caption"
                      sx={{ textDecoration: "none", color: "#ff8300" }}
                    >
                      Username or password?
                    </Link>
                  </Typography>
                </Item>
                <Item className="grid-divider">
                  <Box sx={{ width: "70px" }}>
                    <Typography>Signin</Typography>
                    <SocialButton />
                  </Box>
                </Item>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default HomePage;
