import React, { useContext } from "react";
import ReactPlayer from "react-player";
// import ConferenceAppBar from "../Component/VideoConference/ConferenceAppbar";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import {
  RobotController,
  VideoStreamControllerButtons,
} from "../../Component/VideoConference";
import useArrowKeyHandlers from "../../hooks/useArrowKeyHandlers";
import { useLocation } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";
import BottomDrawer from "../VideoConference/BottomDrawer";
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import TiltController from '../VideoConference/TiltController'
import { TILT_CONTROLLER } from "../../Constant/defaultValue";

import {
  IconButton,
  Stack,
  Grid,
  Box,
} from "@mui/material";
import TiltControlAndReload from "./TiltControlAndReload";

function VideoController({
  CONTROLLER_ICON_BORDER_RADIUS,
  CONTROLLER_ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_SIZE,
  
  setControls,
  
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
  const { setMqttRequestToServer, processCall } = useContext(SocketContext);
  const toIdUUID = searchParms.get("toId");

  const callback = React.useCallback(() => {
    setLongPressed(true);
  }, []);

  const handleUp = (isPressed) => {
    if (isPressed) {
      // console.log("Up arrow pressed");
      setMqttRequestToServer("forward", toIdUUID);

      // Your logic for up arrow key press
    } else {
      // console.log("Up arrow released");
      setMqttRequestToServer("stop", toIdUUID);

      // Your logic for up arrow key release
    }
  };

  const handleDown = (isPressed) => {
    if (isPressed) {
      // console.log("Down arrow pressed");
      setMqttRequestToServer("back", toIdUUID);
      // Your logic for down arrow key press
    } else {
      // console.log("Down arrow released");
      setMqttRequestToServer("stop", toIdUUID);

      // Your logic for down arrow key release
    }
  };

  const handleRight = (isPressed) => {
    if (isPressed) {
      // console.log("Right arrow pressed");
      setMqttRequestToServer("right", toIdUUID);

      // Your logic for right arrow key press
    } else {
      // console.log("Right arrow released");
      setMqttRequestToServer("stop", toIdUUID);

      // Your logic for right arrow key release
    }
  };

  const handleLeft = (isPressed) => {
    if (isPressed) {
      // console.log("Left arrow pressed");
      setMqttRequestToServer("left", toIdUUID);

      // Your logic for left arrow key press
    } else {
      // console.log("Left arrow released");
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
      <Grid
        container
        sx={{ position: "absolute", bottom: "0px", display: "flex" }}
        spacing={2}
      >
        <Grid
          sx={{
            display: "flex",
            alignItems: "flex-end",
            display: { xs: "none", md: "flex" },
          }}
          item
          md={4}
          xs={12}
        >
         
          <TiltControlAndReload setControls={setControls} controls={controls} />

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
            sx={{ display: { xs: "none", md: "flex" } }}
            width="100%"
          >
            <VideoStreamControllerButtons
              CONTROLLER_ICON_BORDER_RADIUS={CONTROLLER_ICON_BORDER_RADIUS}
              CONTROLLER_ICON_WRAPPER_SIZE={CONTROLLER_ICON_WRAPPER_SIZE}
              CONTROLLER_ICON_SIZE={CONTROLLER_ICON_SIZE}
              callerApiId={callerApiId}
            />
          </Stack>
        </Grid>
        <Grid item md={4} xs={12} className="robotController">
          <Box sx={{display:{md:'block',xs:'none'}}}>
        <RobotController
            CONTROLLER_ICON_BORDER_RADIUS={CONTROLLER_ICON_BORDER_RADIUS}
            CONTROLLER_ICON_WRAPPER_SIZE={iconSize}
            CONTROLLER_ICON_SIZE={CONTROLLER_ICON_SIZE}
          />
          </Box>
          <Stack flexDirection='row' justifyContent="space-around" sx={{ display: { xs: "flex", md: "none" } }}>
          <TiltController TiltController={TILT_CONTROLLER} />
          <RobotController
            CONTROLLER_ICON_BORDER_RADIUS={CONTROLLER_ICON_BORDER_RADIUS}
            CONTROLLER_ICON_WRAPPER_SIZE={iconSize}
            CONTROLLER_ICON_SIZE={CONTROLLER_ICON_SIZE}
          />
            <BottomDrawer>
              <VideoStreamControllerButtons
                CONTROLLER_ICON_BORDER_RADIUS={CONTROLLER_ICON_BORDER_RADIUS}
                CONTROLLER_ICON_WRAPPER_SIZE={CONTROLLER_ICON_WRAPPER_SIZE}
                CONTROLLER_ICON_SIZE={CONTROLLER_ICON_SIZE}
                callerApiId={callerApiId}
              />
            </BottomDrawer>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default VideoController;
