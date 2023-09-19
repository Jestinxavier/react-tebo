import React, { useEffect } from "react";
import PersistentDrawerRight from "../../Component/AppBar/PersistentDrawerRight";
import { Box, Fade, Typography, Container, Card, Grid } from "@mui/material";
import { useDrawerContext } from "../../Context/DrawerContext";
import { Heading, CustomContainer } from "../../Component/CustomComponent";

import { SettingsForm } from "../../Component/Settings";
import DataGrid from "../../Component/DataGrid/CustomDataGrid";
import { getCallLogs } from "../../redux/slices/robot";
import { dispatch, useSelector } from "../../redux/store";
function CallLogs() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
  } = useDrawerContext();
  const callLogs = useSelector((state) => state.robot.calllogs);

  useEffect(() => {
    dispatch(getCallLogs());
  }, []);

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
        <Heading>Call Logs</Heading>

        {callLogs && <DataGrid callLogs={callLogs} />}
      </CustomContainer>
    </Box>
  );
}

export default CallLogs;
