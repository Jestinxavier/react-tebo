import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import styled from "styled-components";
import Google from "../../Pages/Authatication/AuthaticationGoogle";
import MyFacebookButton from "../../Pages/Authatication/MyFacebookButton";
import FacebookAuth from "react-facebook-auth";
import FacebookLogin from '@greatsumini/react-facebook-login';
import Authatication from '../../Pages/Authatication/Authatication'

const ImageWrapper = styled("img")(({ theme }) => ({
  cursor: "pointer",
  borderRadius: "15px",
  border: "0px",
  width: 200,
  // boxShadow: "11px 2px 5px #cfcfcf",
  boxShadow: "2px 2px 5px #817f7f",
  transition: "0.3s",
  "&:active": {
    // boxShadow: "0px 2px 4px #ff8888",
    boxShadow: "0px 2px 4px #cfcfcf",
    transform: "translateY(4px)",
  },
}));

const socialImage = [
  "signin-google.jpg",
  "signin-email.jpg",
  "signin-linkedin.jpg",
];
function SocialButton() {
  const authenticate = (response) => {
   
    // Api call to server so we can validate the token
  };
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      {/* <GoogleOAuthProvider clientId="873869484443-ac9ncvoc6vif5vc67pn619g1ba1jjogq.apps.googleusercontent.com">  */}
        {/* <ImageWrapper src={`./images/${data}`} /> */}
        {/* <Authatication /> */}
      <Google />
      {/* </GoogleOAuthProvider>  */}

{/* <FacebookLogin
  appId="1326090128300626"
  style={{
    backgroundColor: '#4267b2',
    color: '#fff',
    fontSize: '16px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '4px',
  }}
/> */}
    </Stack>
  );
}

export default SocialButton;
