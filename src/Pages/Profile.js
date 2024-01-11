import React, { useEffect } from "react";
import PersistentDrawerRight from "../Component/AppBar/PersistentDrawerRight";
import { Box, Fade, Typography, Container, Card, Grid } from "@mui/material";
import { useDrawerContext } from "../Context/DrawerContext";
import { Heading, CustomContainer } from "../Component/CustomComponent";

import { getUserDetails } from "../redux/slices/userdetail";
import { useSelector, useDispatch } from "../redux/store";
import { ProfileForm } from "../Component/Profile";
function Profile() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
  } = useDrawerContext();

  useEffect(() => {
    return () => handleDrawerClose()
    
  }, [])

  function checkOrientation() {
    console.log('window.orientation====================================')
    console.log("window.orientation",window.orientation)
    console.log('====================================')
    // alert(window.orientation)
    if (window.orientation === undefined) {
      // window.orientation is not supported, use other methods if needed
      console.log("Orientation not supported");
    } else {
      if (window.orientation === 0 || window.orientation === 180) {
        console.log("Portrait orientation");
      } else {
        console.log("Landscape orientation");
      }
    }
  }
  
  // Call the function when the page loads
  checkOrientation();
  
  // Listen for orientation changes
  window.addEventListener("orientationchange", checkOrientation);
  return (
    <Box>
      <PersistentDrawerRight
        open={open}
        setOpen={setOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        setModalOpen={setModalOpen}
      />
      <CustomContainer>
        <Heading>Profile</Heading>
        <Card sx={{ padding: {md:10,xs:1} }}>
          <ProfileForm />
        </Card>
      </CustomContainer>
    </Box>
  );
}

export default Profile;
