import React, { useContext, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
// import ConferenceAppBar from "../Component/VideoConference/ConferenceAppbar";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import {
  RobotController,
  VideoStreamControllerButtons,
} from "../VideoConference";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { LongPressEventType, useLongPress } from "use-long-press";
import useArrowKeyHandlers from "../../hooks/useArrowKeyHandlers";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";

import {
  IconButton,
  Stack,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";
// import { TILT_CONTROLLER } from "../../Constant/defaultValue";
import {
  TILT_CONTROLLER,
  APP_BAR_HEIGHT,
  ICON_WRAPPER_SIZE,
  ICON_SIZE,
  CONTROLLER_ICON_SIZE,
  CONTROLLER_ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_BORDER_RADIUS,
} from "../../Constant/defaultValue";
import TiltController from "../VideoConference/TiltController";
import { useSelector } from "../../redux/store";

function TiltControlAndReload({ setControls, controls }) {
  const theme = useTheme();
  const {zoomUserData, toIdUUID} = useSelector((state) => state?.robot?.zoomCredentials);
  const zoomCredentials = useSelector((state) => state?.robot?.zoomSdkCredentials)

  const { processCall, remoteStream,sentZoomCredentials } = useContext(SocketContext);
  const reconnectButton = useRef(null);

  // useEffect(() => {
  //   let intervalId;

  //   const checkAndReconnect = () => {
  //     if (remoteStream === null) {
  //       console.log("Reconnecting...");
  //       // reconnectButton.current.click();
  //     } else {
  //       console.log("Remote stream is not null. Stopping interval.");
  //       clearInterval(intervalId);
  //     }
  //   };

  //   // Initial check
  //   checkAndReconnect();

  //   // Set up the interval to check every 3 seconds
  //   intervalId = setInterval(checkAndReconnect, 5000);

  //   // Clean up the interval when the component is unmounted or remoteStream changes
  //   return () => clearInterval(intervalId);
  // }, [remoteStream]);

  const reConnectStream = ()=>{
  let zoomData = {zoomUserData, toIdUUID,zoomCredentials}

    // console.log("reConnectStream",{zoomData, toIdUUID});
    sentZoomCredentials(zoomData, toIdUUID)
  }
  return (
    <div>
      <div
      // style={{ position: "absolute",
      // bottom: 0 }}
      >
        <div style={{ marginLeft: 80, width: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
              spacing={2}
            >
              <TiltController TiltController={TILT_CONTROLLER} />
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="baseline"
                spacing={2}
              >
                {/* <IconButton
              className="fullscreen"
                style={{
                  border: "1px solid gray",
                  borderColor: theme.palette.blueGray[900],
                  borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                  background: theme.palette.blueGray[900],
                  width: CONTROLLER_ICON_WRAPPER_SIZE,
                  height: CONTROLLER_ICON_WRAPPER_SIZE,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 30,
                  marginBottom: 50,
                }}
                onClick={() => {}}
              >
                <Icon
                  icon="material-symbols:zoom-out-map-rounded"
                  width={CONTROLLER_ICON_SIZE}
                  color={theme.palette.primary.contrastText}
                  onClick={() => {
                    setControls(!controls);
                  }}
                />
              </IconButton> */}

                <IconButton
                  className="reconnect"
                  ref={reconnectButton}
                  style={{
                    border: "1px solid gray",
                    borderColor: theme.palette.blueGray[900],
                    borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                    background: theme.palette.blueGray[900],
                    width: CONTROLLER_ICON_WRAPPER_SIZE,
                    height: CONTROLLER_ICON_WRAPPER_SIZE,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 30,
                    marginBottom: 50,
                  }}
                  onClick={() => {
                    console.log("clicked*****");
                    reConnectStream();
                    
                  }}
                >
                  <Icon
                    icon="pajamas:retry"
                    width={CONTROLLER_ICON_SIZE}
                    color={theme.palette.primary.contrastText}
                    // onClick={() => {
                    //   console.log("clicked*****");
                    //   processCall();
                    // }}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default TiltControlAndReload;
