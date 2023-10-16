import React, { useContext } from "react";
import ReactPlayer from "react-player";
// import ConferenceAppBar from "../Component/VideoConference/ConferenceAppbar";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import {
  RobotController,
  VideoStreamControllerButtons,
} from "../../Component/VideoConference";
import ButtonComponent from "../../Component/ButtonComponent/ButtonComponent";
import { LongPressEventType, useLongPress } from "use-long-press";
import useArrowKeyHandlers from "../../hooks/useArrowKeyHandlers";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";

// import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  IconButton,
  Stack,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
} from "@mui/material";

function VideoController({
  CONTROLLER_ICON_BORDER_RADIUS,
  CONTROLLER_ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_SIZE,
  TiltController,
  setControls,
  TILT_CONTROLLER,
  controls,
  ICON_SIZE,
  callerApiId,
}) {
  const theme = useTheme();
  const smBreakpoint = theme.breakpoints.values.sm; // Get the value of the sm breakpoint

  // Calculate icon size based on sm breakpoint
  const iconSize = smBreakpoint <= 700 ? 35 : ICON_SIZE;

  const [enabled, setEnabled] = React.useState(true);
  const [longPressed, setLongPressed] = React.useState(false);
  
  const location = useLocation();
  const searchParms = new URLSearchParams(location.search);
  const { setMqttRequestToServer,processCall } = useContext(SocketContext);
  const toIdUUID = searchParms.get("toId");

  const callback = React.useCallback(() => {
    setLongPressed(true);
  }, []);

  const handleUp = (isPressed) => {
    if (isPressed) {
      console.log("Up arrow pressed");
      setMqttRequestToServer("forward", toIdUUID);

      // Your logic for up arrow key press
    } else {
      console.log("Up arrow released");
      setMqttRequestToServer("stop", toIdUUID);

      // Your logic for up arrow key release
    }
  };

  const handleDown = (isPressed) => {
    if (isPressed) {
      console.log("Down arrow pressed");
      setMqttRequestToServer("back", toIdUUID);
      // Your logic for down arrow key press
    } else {
      console.log("Down arrow released");
      setMqttRequestToServer("stop", toIdUUID);

      // Your logic for down arrow key release
    }
  };

  const handleRight = (isPressed) => {
    if (isPressed) {
      console.log("Right arrow pressed");
      setMqttRequestToServer("right", toIdUUID);

      // Your logic for right arrow key press
    } else {
      console.log("Right arrow released");
      setMqttRequestToServer("stop", toIdUUID);

      // Your logic for right arrow key release
    }
  };

  const handleLeft = (isPressed) => {
    if (isPressed) {
      console.log("Left arrow pressed");
      setMqttRequestToServer("left", toIdUUID);

      // Your logic for left arrow key press
    } else {
      console.log("Left arrow released");
      setMqttRequestToServer("stop", toIdUUID);

      // Your logic for left arrow key release
    }
  };

  useArrowKeyHandlers({
    up: handleUp,
    down: handleDown,
    right: handleRight,
    left: handleLeft,
  });

  return (
    <>
      <Grid container sx={{ position: "absolute", bottom: "0px", 
    display: 'flex' }} spacing={2}>
        <Grid
          sx={{ display: "flex", alignItems: "flex-end" }}
          item
          md={4}
          xs={12}
        >
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
                      <IconButton
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
                      </IconButton>
                       <IconButton
                      className="reconnect"
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
                      >
                        <Icon
                       
                          icon="pajamas:retry"
                          width={CONTROLLER_ICON_SIZE}
                          color={theme.palette.primary.contrastText}
                          onClick={() => {
                            setControls(!controls);
                            processCall();
                          }}
                        />
                      </IconButton> 
                    </Stack>
                  </Stack>
                </Stack>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          sx={{ display: "flex", alignItems: "flex-end" }}
          item
          md={4}
          xs={12}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
           
            width="100%"
          >
            <VideoStreamControllerButtons 
             CONTROLLER_ICON_BORDER_RADIUS  = {CONTROLLER_ICON_BORDER_RADIUS}
             CONTROLLER_ICON_WRAPPER_SIZE = {CONTROLLER_ICON_WRAPPER_SIZE}
             CONTROLLER_ICON_SIZE = {CONTROLLER_ICON_SIZE}
             callerApiId={callerApiId}
            />
          </Stack>
        </Grid>
        <Grid item md={4} xs={12} className='robotController'>
          <RobotController
            CONTROLLER_ICON_BORDER_RADIUS={CONTROLLER_ICON_BORDER_RADIUS}
            CONTROLLER_ICON_WRAPPER_SIZE={iconSize}
            CONTROLLER_ICON_SIZE={CONTROLLER_ICON_SIZE}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default VideoController;
