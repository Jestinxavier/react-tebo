import React, { useContext } from "react";
import { IconButton, Box, Stack, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
// import {ControllingButtonComponent} from '../ButtonComponent'
import { LongPressEventType, useLongPress } from "use-long-press";
import { SocketContext } from "../../Context/SocketContext";
import { useLocation } from 'react-router-dom';



function RobotController({
  CONTROLLER_ICON_BORDER_RADIUS,
  CONTROLLER_ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_SIZE,
}) {
  const [enabled, setEnabled] = React.useState(true);
  const [longPressed, setLongPressed] = React.useState(false);
  const [momentController, setMomentController] = React.useState(null);
  const location = useLocation();

  const theme = useTheme();
  const searchParms = new URLSearchParams(location.search);

  const { setMqttRequestToServer } = useContext(SocketContext);
  const toIdUUID = searchParms.get('toId');

  const callback = React.useCallback(() => {
    setLongPressed(true);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        // Call the function you want to trigger when the Up arrow is pressed
        handleUpArrowPress();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowUp') {
        // Call the function you want to trigger when the Up arrow is released
        handleUpArrowRelease();
      }
    };

    const handleUpArrowPress = () => {
      // Logic for when Up arrow is pressed
      console.log('Up arrow pressed');
    };

    const handleUpArrowRelease = () => {
      // Logic for when Up arrow is released
      console.log('Up arrow released');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const sentMqttControlMessage = (data) => {
    if (data) {
      if (data.context === "moveForward") {
        if (data["moveForward"]) {
          setMqttRequestToServer("forward",toIdUUID);
        } else {
          setMqttRequestToServer("stop",toIdUUID);       
        }
      }
      if (data.context === "moveLeft") {
        if (data["moveLeft"]) {
          setMqttRequestToServer("left",toIdUUID);
        } else {
          setMqttRequestToServer("stop",toIdUUID);       
        }
      }
      if (data.context === "moveRight") {
        if (data["moveRight"]) {
          setMqttRequestToServer("right",toIdUUID);
        } else {
          setMqttRequestToServer("stop",toIdUUID);       
        }
      }
      if (data.context === "moveBackWard") {
        if (data["moveBackWard"]) {
          setMqttRequestToServer("Back",toIdUUID);
        } else {
          setMqttRequestToServer("stop",toIdUUID);       
        }
      }
    }
  };

  const bind = useLongPress(enabled ? callback : null, {
    onStart: (event, meta) => {
      meta[meta.context] = true;
      console.log("Press started", { ...meta });
      sentMqttControlMessage(meta);

      // setMomentController({ meta });
    },
    onFinish: (event, meta) => {
      setLongPressed(false);
      meta[meta.context] = false;
      setMomentController({ meta });
      sentMqttControlMessage(meta);
      // sentMqttControlMessage({meta})

      console.log("Long press finished", meta);
    },
    onCancel: (event, meta) => {
      meta[meta.context] = false;
      console.log("moving forward is stoped", meta);
      sentMqttControlMessage(meta);
    },
    //onMove: () => console.log("Detected mouse or touch movement"),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: false,
    cancelOutsideElement: true,
    detect: LongPressEventType.Pointer,
  });
  const moveForward = bind("moveForward");
  const moveLeft = bind("moveLeft");
  const moveRight = bind("moveRight");
  const moveBackWard = bind("moveBackWard");


  return (
    <Stack
      direction="row"
      justifyContent={{ md: "flex-end", xs: "center" }}
      alignItems="center"
      spacing={2}
      style={{ marginRight: 80 }}
    >
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
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {/* <ControllingButtonComponent buttonStyle= {{
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
              } }

              iconName="mdi:arrow-left-thin"
              width={CONTROLLER_ICON_SIZE}
              color={theme.palette.primary.contrastText}
             /> */}
            <IconButton
              {...moveForward}
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
              }}
            >
              <Icon
                icon="mdi:arrow-up-thin"
                width={CONTROLLER_ICON_SIZE}
                color={theme.palette.primary.contrastText}
                // onClick={() => {
                //   setControls(!controls);
                // }}
              />
            </IconButton>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <IconButton
                {...moveLeft}
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
                }}
              >
                <Icon
                  icon="mdi:arrow-left-thin"
                  width={CONTROLLER_ICON_SIZE}
                  color={theme.palette.primary.contrastText}
                  // onClick={() => {
                  //   setControls(!controls);
                  // }}
                />
              </IconButton>
              <IconButton
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
                }}
              >
                <Icon
                  icon="ic:round-play-arrow"
                  width={CONTROLLER_ICON_SIZE}
                  color={theme.palette.primary.contrastText}
                  // onClick={() => {
                  //   setControls(!controls);
                  // }}
                />
              </IconButton>
              <IconButton
                {...moveRight}
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
                }}
              >
                <Icon
                  icon="mdi:arrow-right-thin"
                  width={CONTROLLER_ICON_SIZE}
                  color={theme.palette.primary.contrastText}
                  // onClick={() => {
                  //   setControls(!controls);
                  // }}
                />
              </IconButton>
            </Stack>

            <IconButton
            {...moveBackWard}
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
              }}
            >
              <Icon
                icon="mdi:arrow-down-thin"
                width={CONTROLLER_ICON_SIZE}
                color={theme.palette.primary.contrastText}
                // onClick={() => {
                //   setControls(!controls);
                // }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default RobotController;


