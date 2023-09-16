import React, { useEffect } from "react";
import PersistentDrawerRight from "../../Component/AppBar/PersistentDrawerRight";
import { Box, Fade, Typography, Container, Card, Grid } from "@mui/material";
import { useDrawerContext } from "../../Context/DrawerContext";
import { Heading, CustomContainer } from "../../Component/CustomComponent";

import { SettingsForm } from "../../Component/Settings";
function Settings() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
  } = useDrawerContext();



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
        <Heading>Settings</Heading>
       
          <SettingsForm />

      </CustomContainer>
    </Box>
  );
}

export default Settings;
