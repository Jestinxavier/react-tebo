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
import { useLocation, useNavigate } from "react-router-dom";
import { useDrawerContext } from "../../Context/DrawerContext";
import { SocketContext } from "../../Context/SocketContext";
import { Heading, CustomContainer } from "../../Component/CustomComponent";
import { getUserDetails } from "../../redux/slices/userdetail";
import { useSelector, useDispatch, dispatch } from "../../redux/store";
import { SettingsForm } from "../../Component/Settings";
import Iconify from "../../Component/MUI/iconify/Iconify";
import NoRobotCard from "../../Component/Homepage/NoRobotCard";
import { getRobot } from "../../redux/slices/robot";
import { IMAGE_PATH } from "../../config-global";
import Swal from "sweetalert2";

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
  const navigate = useNavigate()
  const { startMapping, stopMapping, allMapState,deleteMap } = useContext(SocketContext);
  const location = useLocation();
  const [startMap, setStartMap] = useState(false);
  const [mapExisist, setmapExisist] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const [currentMapStatus, setCurrentMapStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const robotList = useSelector(state=>state.robot.robots.robots)
  const teboId = searchParams.get("teboId");
  const [description, setDescription] = useState("Alright, team! It's robot mapping time – let's uncover the hidden treasures of our digital world, one pixel at a time, and sprinkle a dash of adventure into our robotic escapades!")
  const AddMap = () => {
    // const teboId = searchParams.get("teboId");
    startMapping(teboId);
    setStartMap(true);
  };


  const removeMap = (data,id) => {
    // navigate(`/robot-map?${searchParams.toString()}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      deleteMap(id);
      dispatch(getRobot())
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

console.log(robotList,"robotList***");
  const stopMappingProcess = () => {
    // const teboId = searchParams.get("teboId");
    startMapping(teboId);
    stopMapping(teboId);
    setStartMap(false);
  };

  useEffect(() => {
    console.log(imageUrl,"imageUrl");
  }, [imageUrl])
  

  const DeleteMapData = () => {
    // const teboId = searchParams.get("teboId");
    startMapping(teboId);
    setStartMap(true);
  };
  




  useEffect(() => {
    
    
    if (allMapState) {
      let Id = Object.keys(allMapState)[0];

      console.log(allMapState[Id], "allMapState.Id","Id:",Id,"teboId:",teboId,Id == teboId);
      if (Id == teboId) {
        setCurrentMapStatus(allMapState[Id]);
      }
    }
  }, [allMapState]);



  const filterData = ()=>{
     return robotList.filter(item=>item.robot.uuid==teboId)
  }

  useEffect(() => {
    console.log('====================================');
    console.log(filterData()[0]?.robot?.map_status);
    console.log('====================================');
    setCurrentMapStatus(filterData()[0]?.robot?.map_status)
  }, [])
  

  useEffect(() => {
    console.log('filterData()====================================');
    console.log(filterData(),currentMapStatus);
    console.log('====================================');
    if (currentMapStatus == "finished mapping") {
      setmapExisist(true);
      setStartMap(true);
      setDescription("");
    
      setImageUrl(filterData());
    
    }
    if (currentMapStatus == "map exists") {
      setmapExisist(true);
      setStartMap(true);
      dispatch(getRobot())
      setDescription("");
      console.log('filterData()====================================');
      console.log(filterData());
      console.log('====================================');
      setImageUrl(filterData());

    }
  }, [currentMapStatus]);

  console.log(currentMapStatus, "mapState");

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
        <Heading>Tebo Map</Heading>
        {
            console.log(imageUrl,"imageUrl")
          }
        {startMap ? (
          
          <Box>
            {mapExisist?<Box>
           
             <img src={`${IMAGE_PATH}${imageUrl[0].robot.map_path}`} alt="mapImage" />
             <Button
            variant="outlined"
            color="error"
            sx={{
              mt: 5,
            }}
            startIcon={<Iconify icon="mdi:map-marker-remove-outline" />}
            onClick={() => {
              removeMap(teboId);
            }}
          >
           Delete Map
          </Button>
            </Box>:<NoRobotCard
              image="/images/mapping.gif"
              Heading="Mapping Started"
              Status={currentMapStatus}
              description={description}
            />}
            {/* <Typography>{mapState}</Typography> */}
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
        {startMap ? (<>
          {!mapExisist&&<Button
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
          </Button>}
          </>
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
