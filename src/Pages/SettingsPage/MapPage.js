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
import MappingInstructionsDialog from "./Modal/MappingInstructionsDialog";
import { useSnackbar } from "../../Component/MUI/snackbar";

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
  const navigate = useNavigate();
  const { startMapping, stopMapping, allMapState, deleteMap } =
    useContext(SocketContext);
  const location = useLocation();
  const [startMap, setStartMap] = useState(false);
  const [mapExisist, setmapExisist] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = new URLSearchParams(location.search);
  const [currentMapStatus, setCurrentMapStatus] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [status, setStatus] = useState("Requested");
  const robotList = useSelector((state) => state.robot.robots.robots);
  const teboId = searchParams.get("teboId");
  const [openDialog, setOpenDialog] = useState(false);

  const [description, setDescription] = useState(
    "Alright, team! It's robot mapping time – let's uncover the hidden treasures of our digital world, one pixel at a time, and sprinkle a dash of adventure into our robotic escapades!"
  );
  const AddMap = () => {
    // const teboId = searchParams.get("teboId");
    startMapping(teboId);
    setStartMap(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const removeMap = (id) => {
    // navigate(`/robot-map?${searchParams.toString()}`);
    Swal.fire({
      title: "Are you sure?",
      text: "We will send a request to  Tebo to remove the map. Once deleted, you won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      deleteMap(id);
      dispatch(getRobot());

      if (currentMapStatus === "map deleted") {
        // console.log("im in ***");
        // Swal.fire("Deleted!", "we are sent the message .", "success");
        navigate(`/settings`);
      }
    });
  };

  // console.log(robotList, "robotList***");
  const stopMappingProcess = () => {
    // const teboId = searchParams.get("teboId");
    startMapping(teboId);
    stopMapping(teboId);
    setStartMap(false);
  };

  useEffect(() => {
    console.log(imageUrl, "imageUrl");
  }, [imageUrl]);

  const DeleteMapData = () => {
    // const teboId = searchParams.get("teboId");
    startMapping(teboId);
    setStartMap(true);
  };

  useEffect(() => {
    if (allMapState) {
      let Id = Object.keys(allMapState)[0];

      // console.log(
      //   allMapState[Id],
      //   "allMapState.Id",
      //   "Id:",
      //   Id,
      //   "teboId:",
      //   teboId,
      //   Id == teboId
      // );
      if (Id == teboId) {
        setCurrentMapStatus(allMapState[Id]);
      }
    }
  }, [allMapState]);

  const filterData = () => {
    return robotList?.filter((item) => item?.robot?.uuid == teboId);
  };

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getRobot());
    try {
      let filterValue = filterData();
      if (filterValue.length > 0) {
        setCurrentMapStatus(filterData()[0]?.robot?.map_status);
      }
    } catch (error) {
      navigate(`/settings`);
    }
  }, []);

  useEffect(() => {
   
    switch (currentMapStatus) {
      case "robot not docked":
        setStatus("interrupted");
        enqueueSnackbar(
          `We couldn't initiate the start mapping process because the Tebo is not docked.`,
          { variant: "error" }
        );
        stopMappingProcess();
        break;
      case "robot battery is low":
        setStatus("Low battery in Tebo");
        enqueueSnackbar(
          `The Tebo battery level is not sufficient to initiate the mapping process.`,
          { variant: "error" }
        );
        stopMappingProcess();
        break;
        case "docking":
          enqueueSnackbar(`The tebo is docking.`, {
            variant: "info",
          });
          break;

          case "unable to find dock":
            enqueueSnackbar(`Unable to find dock.`, {
              variant: "error",
            });
          break;

          case "docking unsuccessful":
            enqueueSnackbar(`Docking unsuccessful.`, {
              variant: "error",
            });
          break;


          case "docking successful":
            enqueueSnackbar(`Docking successful.`, {
              variant: "success",
            });
            break;

            case "docking unsuccessful":
              enqueueSnackbar(`Docking unsuccessful.`, {
                variant: "error",
              });
              break;

        
      case "mapping":
        setStatus("Started");
        enqueueSnackbar(`The mapping is initiated on tebo.`, {
          variant: "info",
        });
        break;

      // case "finished mapping":

      case "map exists":
        setmapExisist(true);
        setStartMap(true);
        dispatch(getRobot());
        setDescription("");
      
        setImageUrl(filterData());
        navigate(`/robot-map?${searchParams.toString()}`);
        enqueueSnackbar(`The mapping is saved in Tebo`, {
          variant: "info",
        });
        break;

      case "saving map":
        setmapExisist(true);
        setStartMap(true);
        dispatch(getRobot());
        setDescription("");
       
        setImageUrl(filterData());
        navigate(`/robot-map?${searchParams.toString()}`);
        break;

      case "finished mapping":
        enqueueSnackbar(`The mapping is fished from tebo side.`, {
          variant: "info",
        });
        break;

      case "map deleted":
        enqueueSnackbar(`Successfully deleted map from tebo.`, {
          variant: "success",
        });
        navigate(`/settings`);
        // Swal.fire("Deleted!", "we are sent the message .", "success");

        break;
      default:
        // enqueueSnackbar(currentMapStatus, { variant: 'info' });
        break;
    }
  }, [currentMapStatus]);

  // console.log(currentMapStatus, "mapState");

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
        {startMap ? (
          <Box>
            {/* {console.log({ mapExisist })} */}
            {mapExisist ? (
              <Box>
                <img
                  src={`${IMAGE_PATH}${imageUrl[0].robot.map_path}`}
                  alt="mapImage"
                />
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
              </Box>
            ) : (
              <NoRobotCard
                image="/images/mapping.gif"
                Heading={`Mapping ${status}`}
                Status={currentMapStatus}
                description={description}
              />
            )}
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
        {startMap ? (
          <>
            {!mapExisist && (
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
            )}
          </>
        ) : (
          <Button
            variant="outlined"
            color="error"
            sx={{
              mt: 5,
            }}
            startIcon={<Iconify icon="gala:add" />}
            // onClick={() => {
            //   AddMap();
            // }}
            onClick={handleOpenDialog}
          >
            Add Map
          </Button>
        )}
        {/* <Button
          variant="outlined"
          color="error"
          sx={{
            mt: 5,
          }}
          startIcon={<Iconify icon="gala:add" />}
          onClick={handleOpenDialog}
        >
        Add Map
        </Button> */}
      </CustomContainer>
      <MappingInstructionsDialog
        open={openDialog}
        onClose={handleCloseDialog}
        AddMap={AddMap}
      />
    </Box>
  );
}

export default MapPage;
