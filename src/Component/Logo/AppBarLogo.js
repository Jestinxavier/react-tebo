import React from "react";
import { styled } from "@mui/material/styles";
const LogoImage = styled("img")(({ theme }) => ({
  width: { sm: "50%", md: "100%", xs: "30%" },
  height: "auto",
  objectFit: "cover",
  marginLeft: 10,
  marginTop: 6,
 
}));
function AppBarLogo() {
  return (
    <>
      <LogoImage src="/images/logo.png" alt="Image description" />
    </>
  );
}

export default AppBarLogo;
