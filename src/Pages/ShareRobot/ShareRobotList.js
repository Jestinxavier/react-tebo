import React, { useEffect } from "react";
import PersistentDrawerRight from "../../Component/AppBar/PersistentDrawerRight";
import { Box, Fade, Typography, Container, Card, Grid } from "@mui/material";
import { useDrawerContext } from "../../Context/DrawerContext";
import { Heading, CustomContainer } from "../../Component/CustomComponent";

import { SettingsForm } from "../../Component/Settings";
import CustomDataGridShareBot from "../../Component/DataGrid/CustomDataGridShareBot";
import { getSharedToRobot } from "../../redux/slices/robot";
import { dispatch, useSelector } from "../../redux/store";
function ShareRobotList() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
  } = useDrawerContext();
  const ShareRobotList = useSelector((state) => state.robot.shareRobotList);
  useEffect(() => {
    dispatch(getSharedToRobot());
  }, []);


  
  return (
    <Box sx={{marginTop:{xs:6,md:0}}}>
      <PersistentDrawerRight
        open={open}
        setOpen={setOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        setModalOpen={setModalOpen}
      />
      <CustomContainer>
        <Heading>Share Robot</Heading>

        {/* {ShareRobotList &&  */}
        <CustomDataGridShareBot ShareRobotList={ShareRobotList} />
        {/* } */}
      </CustomContainer>
    </Box>
  );
}

export default ShareRobotList;
