import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerRight from "../Drawer/DrawerRight";
import { useTheme } from "@mui/material/styles";
import Image from "mui-image";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, dispatch } from "../../redux/store";
import Iconify from "../../Component/MUI/iconify";
import { useAuthContext } from "../../auth/useAuthContext";

import { TourController, postTourController } from "../../redux/slices/robot";
import axios from "../../utils/axios";
import VideoAlert from "../Modal/VideoAlert";
import ReadyStateDialogBox from "../Modal/ReadyStateDialogBox";
import { SocketContext } from "../../Context/SocketContext";
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#e7e7e700 !important",
  boxShadow:
    "0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(0 0 0 / 0%) !important",
}));
export default function ConferenceAppBar({ AppBarHeight }) {
  const [OpenMenu, setOpenMenu] = React.useState(false);
  const [robot, setRobot] = React.useState([]);
  const [alertModal, setAlertModal] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teboId = searchParams.get("toId");
  const sharedRobot = searchParams.get("sharedRobot");
  const [readyState, setReadyState] = React.useState(true);
  const { readyStateMqtt } = React.useContext(SocketContext);
  const { user } = useAuthContext();
  const robotList = useSelector((state) => state?.robot?.robots?.robots);
  const sharedList = useSelector((state) => state?.robot?.sharedRobot?.robots);

  const handleClickOpen = () => {
    setReadyState(true);
  };
  // const handleClose = () => {
  //   setReadyState(false);
  // };
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") {
      return;
    }
    setReadyState(false);
  };

  const theme = useTheme();
  const filterData = () => {
    if (sharedRobot) {
      setRobot(sharedList?.filter((item) => item?.robot?.uuid == teboId));
    } else {
      setRobot(robotList?.filter((item) => item?.robot?.uuid == teboId));
    }
  };
  const imageData = [
    {
      percentage: "100",
      image: "/images/hundredPercentage.png",
    },
    {
      percentage: "90",
      image: "/images/ninetypercentage.png",
    },
    {
      percentage: "80",
      image: "/images/Eightypercentage.png",
    },
    {
      percentage: "30",
      image: "/images/Thirtypercentage.png",
    },
    {
      percentage: "20",
      image: "/images/Twintypercentage.png",
    },
    {
      percentage: "10",
      image: "/images/tenpercentage.png",
    },
    {
      percentage: "5",
      image: "/images/tenpercentage.png",
    },
    {
      percentage: "0",
      image: "/images/tenpercentage.png",
    },
  ];
  const imageFilter = (data) => {
    let filterData = imageData.filter(
      (item) => Number(item.percentage) <= data
    );
    return filterData[0].image;
  };
  const takeATour = (data) => {
    dispatch(TourController(data));
  };

  React.useEffect(() => {
    filterData();
    console.log({ user });
  }, []);
  React.useEffect(() => {
    if (!readyStateMqtt) {
      setReadyState(false);
    }
  }, [readyStateMqtt]);

  React.useEffect(() => {
    if (robot.length > 0) {
      console.log("robot[0]?.robot?.map_status", robot[0]?.robot?.map_status);
      if (robot[0]?.robot?.map_status == "no map") {
        setAlertMessage(
          "It is essential to map the room first. We strongly recommend mapping the area before initiating Tebo movement. If you don't map the area, automatic docking will not be possible, and you will need to do it manually."
        );
        setAlertModal(true);
      }
    }
  }, [robot]);

  React.useEffect(() => {
    if (!readyState) {
      setAlertMessage("Tebo is ready to use");
      setAlertModal(true);
    }
  }, [readyState]);

  const closeModal = () => {
    setAlertModal(false);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "absolute",
        width: "100%",
        zIndex: 99,
        minHeight: AppBarHeight,
      }}
    >
      <CustomAppBar position="static">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%"
            className="cobra333"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Image src="/images/PureLogo.png" width={50} />

              {robot?.map((item) => (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Image
                    sx={{ transform: "rotateZ(89deg)" }}
                    src={imageFilter(item?.robot.battery_charge)}
                    width={18}
                    fit={"contain"}
                  />
                  <Typography variant="caption" color="success.main">
                    {item?.robot.battery_charge}%
                  </Typography>
                </Stack>
              ))}
              <Box
              // sx={{border:'1px solid black',borderRadius:30,width:36,height:36}}
              >
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, color: theme.palette.secondary.contrastText }}
                  onClick={() => takeATour(true)}
                >
                  <Image src="/images/takeatour.png" width={50} />
                </IconButton>
              </Box>
            </Stack>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, color: theme.palette.secondary.contrastText }}
              onClick={() => setOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton> */}
          </Stack>
        </Toolbar>
        <DrawerRight OpenMenu={OpenMenu} setOpenMenu={setOpenMenu} />
        <VideoAlert
          open={alertModal}
          onClose={closeModal}
          message={alertMessage}
        />
        <ReadyStateDialogBox
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={readyState}
        />
      </CustomAppBar>
    </Box>
  );
}
