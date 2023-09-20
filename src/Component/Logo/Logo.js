import React from "react";
import { styled } from "@mui/material/styles";
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
function Logo() {
  return (
    <>
      <LogoImage src="/images/logo.png" alt="Image description" />
    </>
  );
}

export default Logo;
