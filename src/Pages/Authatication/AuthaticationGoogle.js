import React, { useState, useEffect, useRef } from "react";
import axios from "../../utils/axios";
import { Box, Button } from "@mui/material";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import { Icon } from "@iconify/react";

// import Authatication from './Authatication'
function AuthaticationGoogle() {
  const [googleLoginUrl, setGoogleLoginUrl] = useState(null);
  const [callbackUrl, setCallbackUrl] = useState(null);
  const count = useRef(0);
  const googleLoginUrlRef = useRef();
  useEffect(() => {
    axios
      .get("/google-login/redirect", {
        headers: { accept: "application/json" },
      })
      .then((response) => {
        const { data } = response;
        setCallbackUrl(data.url);
        googleLoginUrlRef.current.href = data.url;
        console.log("======data.url==============================");
        console.log(data.url);
        console.log("====================================");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(callbackUrl, { headers: { accept: "application/json" } })
      .then((response) => {
        const { data } = response;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [callbackUrl]);

  const handleInput = (data) => {
    axios
      .get(callbackUrl, { headers: { accept: "application/json" } })
      .then((response) => {
        const { data } = response;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <Box>
      {/* <Button onClick={() => handleInput(callbackUrl)}>
        {" "}
        Sign in with Google
      </Button> */}

      <a ref={googleLoginUrlRef} className="App-link" href="#" style={{textDecoration: 'none'}}>
        <Box
          sx={{
            border: "1px solid #e9e5e5",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            padding:1,
            color: "#8b8b8b",
            fontWeight: "600",
            borderRadius: '8px',

          }}
        >
          <Icon height={30} icon="flat-color-icons:google" />
          <Box sx={{ml:1}}>Sign in with Google</Box>
        </Box>
      </a>
      {/* <GoogleButton
      ref={googleLoginUrlRef} 
  onClick={() => { handleInput(callbackUrl) }}
  
> 
</GoogleButton> */}
      {/* <Authatication /> */}
    </Box>
  );
}

export default AuthaticationGoogle;
