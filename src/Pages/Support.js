import React, { useEffect } from "react";
import PersistentDrawerRight from "../Component/AppBar/PersistentDrawerRight";
import { Box, Fade, Typography, Container, Card, Grid } from "@mui/material";
import { useDrawerContext } from "../Context/DrawerContext";
import { Heading, CustomContainer } from "../Component/CustomComponent";

import { getUserDetails } from "../redux/slices/userdetail";
import { useSelector, useDispatch } from "../redux/store";
import { SupportForm } from "../Component/Support";
function Support() {
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
        <Heading>Support</Heading>
        <Card sx={{ padding: 10 }}>
          <SupportForm />
        </Card>
      </CustomContainer>
    </Box>
  );
}

export default Support;
