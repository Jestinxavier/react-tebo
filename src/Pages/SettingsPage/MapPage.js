import React, { useEffect, useState, useContext } from "react";
import PersistentDrawerRight from "../../Component/AppBar/PersistentDrawerRight";
import {
  Box,
  Fade,
  Typography,
  Container,
  Card,
  Grid,
  Skeleton,
  Button,
} from "@mui/material";
import { useDrawerContext } from "../../Context/DrawerContext";
import { SocketContext } from "../../Context/SocketContext";

import { Heading, CustomContainer } from "../../Component/CustomComponent";

import { getUserDetails } from "../../redux/slices/userdetail";
import { useSelector, useDispatch } from "../../redux/store";
import { SettingsForm } from "../../Component/Settings";
import Iconify from "../../Component/MUI/iconify/Iconify";
import NoRobotCard from "../../Component/Homepage/NoRobotCard";

function MapPage() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
    mapState,
  } = useDrawerContext();
  const { startMapping, stopMapping } = useContext(SocketContext);

  const [startMap, setStartMap] = useState(false);
  const [mapExisist, setmapExisist] = useState(false)

  const AddMap = () => {
    startMapping();
    setStartMap(true);
  };

  const stopMappingProcess = () => {
    stopMapping();
    setStartMap(false);
  };

  const DeleteMapData = () => {
    startMapping();
    setStartMap(true);
  };

  useEffect(() => {
  if(mapState == "finished mapping"){
    setmapExisist(true)
  }
  
  }, [mapState])
  
  

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
        <Heading>Robot Map</Heading>

        {startMap? (
          <Box>
            <NoRobotCard
              image="/images/mapping.gif"
              Heading="Mapping Started"
              description="Alright, team! It's robot mapping time – let's uncover the hidden treasures of our digital world, one pixel at a time, and sprinkle a dash of adventure into our robotic escapades!"
            />
            <Typography>{mapState}</Typography>
          </Box>
        ) : (
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: "27%" }} />
          </Skeleton>
        )}



        {/* {mapExisist?  <Button
            variant="outlined"
            color="error"
            sx={{
              mt: 5,
            }}
            startIcon={<Iconify icon="gala:add" />}
            onClick={() => {
              DeleteMapData();
            }}
          >
            Delete Map
          </Button>
          : */}
        {startMap ? (
          <Button
            variant="outlined"
            color="error"
            sx={{
              mt: 5,
            }}
            startIcon={<Iconify icon="gala:add" />}
            onClick={() => {
              stopMappingProcess();
            }}
          >
            Stop Mapping
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="error"
            sx={{
              mt: 5,
            }}
            startIcon={<Iconify icon="gala:add" />}
            onClick={() => {
              AddMap();
            }}
          >
            Add Map
          </Button>
        )}
      </CustomContainer>
    </Box>
  );
}

export default MapPage;
