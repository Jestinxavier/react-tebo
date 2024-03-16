import React, { useEffect } from "react";
import PersistentDrawerRight from "../Component/AppBar/PersistentDrawerRight";
import { Box, Fade, Typography, Container, Card, Grid } from "@mui/material";
import { useDrawerContext } from "../Context/DrawerContext";
import { Heading, CustomContainer } from "../Component/CustomComponent";

import { getUserDetails } from "../redux/slices/userdetail";
import { useSelector, useDispatch } from "../redux/store";
import { ProfileForm } from "./sections/Profile";
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
