import React, { useContext, useEffect, useState } from "react";
import { IconButton, Box, Stack, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Icon } from "@iconify/react";
// import {ControllingButtonComponent} from '../ButtonComponent'
import { LongPressEventType, useLongPress } from "use-long-press";
import { SocketContext } from "../../Context/SocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer";
import "./RobotController.css";
import { postSpeed } from "../../redux/slices/robot";
import { dispatch, useSelector } from "../../redux/store";

let preDefendSpeed = [
  {
    image: "1x.png",
    value: "2",
  },
  {
    image: "2x.png",
    value: "3",
  },
  {
    image: "3x.png",
    value: "1",
  },
];
function RobotController({
  CONTROLLER_ICON_BORDER_RADIUS,
  CONTROLLER_ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_SIZE,
}) {
  const [enabled, setEnabled] = React.useState(true);
  const [longPressed, setLongPressed] = React.useState(false);
  const [momentController, setMomentController] = React.useState(null);
  const [speedControl, setSpeedControl] = useState();
  const [incrementSpeed, setIncrementSpeed] = useState(null);
  const location = useLocation();
  const navigate = useNavigate()
  const speedRate = useSelector((state) =>state?.robot?.speedControl)
  const theme = useTheme();
  const searchParms = new URLSearchParams(location.search);

  const { setMqttRequestToServer, setMqttSpeedControl } =
    useContext(SocketContext);
  const toIdUUID = searchParms.get("toId");

  const callback = React.useCallback(() => {
    setLongPressed(true);
  }, []);

  useEffect(() => {
    
    console.log(speedRate,"incrementSpeed");
    setIncrementSpeed(speedRate)
  }, [speedRate])
  
  useEffect(() => {
   if(incrementSpeed){
    dispatch(postSpeed(incrementSpeed))
    }
  }, [incrementSpeed])
  

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        // Call the function you want to trigger when the Up arrow is pressed
        handleUpArrowPress();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowUp") {
        // Call the function you want to trigger when the Up arrow is released
        handleUpArrowRelease();
      }
    };

    const handleUpArrowPress = () => {
      // Logic for when Up arrow is pressed
      console.log("Up arrow pressed");
    };

    const handleUpArrowRelease = () => {
      // Logic for when Up arrow is released
      console.log("Up arrow released");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const postSpeedControl = (data) => {
    setMqttSpeedControl(data, toIdUUID);
  };
  const sentMqttControlMessage = (data) => {
    if (data) {
      if (data.context === "moveForward") {
        if (data["moveForward"]) {
          setMqttRequestToServer("forward", toIdUUID);
        } else {
          setMqttRequestToServer("stop", toIdUUID);
        }
      }
      if (data.context === "moveLeft") {
        if (data["moveLeft"]) {
          setMqttRequestToServer("left", toIdUUID);
        } else {
          setMqttRequestToServer("stop", toIdUUID);
        }
      }
      if (data.context === "moveRight") {
        if (data["moveRight"]) {
          setMqttRequestToServer("right", toIdUUID);
        } else {
          setMqttRequestToServer("stop", toIdUUID);
        }
      }
      if (data.context === "moveBackWard") {
        if (data["moveBackWard"]) {
          setMqttRequestToServer("back", toIdUUID);
        } else {
          setMqttRequestToServer("stop", toIdUUID);
        }
      }
    }
  };
  const [start, setStart] = useState();
  const bind = useLongPress(enabled ? callback : null, {
    onStart: (event, meta) => {
      meta[meta.context] = true;
      console.log("Press started", { ...meta });
      let momentControllerData = setInterval(() => {
        console.log("Press started", meta);
        sentMqttControlMessage(meta);
      }, 100);
      setStart(momentControllerData);

      // setMomentController({ meta });
    },
    onFinish: (event, meta) => {
      setLongPressed(false);
      meta[meta.context] = false;
      setMomentController({ meta });
      sentMqttControlMessage(meta);
      // sentMqttControlMessage({meta})
      clearInterval(start);
      console.log("Long press finished", meta);
    },
    onCancel: (event, meta) => {
      meta[meta.context] = false;
      clearInterval(start);
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
    <>
      <Box display={{ xs: "none", md: "block" }}>
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
            sx={{
              // border: "1px solid",
              borderRadius: "100%",
              // background: "black"
            }}
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
                borderColor: theme.palette.blueGray[800],
                borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                background: theme.palette.blueGray[800],
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
                    borderColor: theme.palette.blueGray[800],
                    // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                    borderRadius: "8px 8px 0px 0px",
                    background: theme.palette.blueGray[800],
                    width: CONTROLLER_ICON_WRAPPER_SIZE,
                    height: CONTROLLER_ICON_WRAPPER_SIZE,
                    marginBottom: "-1px",
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
                  // justifyContent="space-between"
                  alignItems="center"
                  // spacing={2}
                  mt="0px !important"
                >
                  <IconButton
                    {...moveLeft}
                    style={{
                      border: "1px solid gray",
                      borderRadius: "8px 0px 0px 8px",
                      borderColor: theme.palette.blueGray[800],
                      // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                      background: theme.palette.blueGray[800],
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
                  {preDefendSpeed.map((data, index) => {
                    if (index + 1 == incrementSpeed) {
                      return (<>
                        {incrementSpeed && <IconButton
                          style={{
                            border: "1px solid gray",
                            borderColor: theme.palette.blueGray[800],
                            marginLeft: "-1px",
                            // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                            borderRadius: "10px 10px 10px 10px",
                            background: theme.palette.blueGray[800],
                            width: CONTROLLER_ICON_WRAPPER_SIZE + 10,
                            height: CONTROLLER_ICON_WRAPPER_SIZE + 10,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            postSpeedControl(data.value);
                            if (incrementSpeed >= 3 && incrementSpeed) {
                              setIncrementSpeed(1);
                              return;
                            }
                            if(incrementSpeed){
                            setIncrementSpeed((pre) => pre + 1);
                            }
                          }}
                        >
                          <img
                            src={`/images/${data.image}`}
                            alt="Image Alt Text"
                          />
                        </IconButton>}
                        </>
                      );
                    }
                    return null;
                  })}
                

                  <IconButton
                    {...moveRight}
                    style={{
                      border: "1px solid gray",
                      borderColor: theme.palette.blueGray[800],
                      // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                      borderRadius: "0px 8px 8px 0px",
                      marginLeft: "-1px",
                      background: theme.palette.blueGray[800],
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
                  className="998"
                  style={{
                    border: "1px solid gray",
                    borderColor: theme.palette.blueGray[800],
                    // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                    borderRadius: "0px 0px 8px 8px",
                    marginTop: "-1px",
                    background: theme.palette.blueGray[800],
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
      </Box>
      <Stack
        direction="row"
        justifyContent={{ md: "flex-end", xs: "center" }}
        alignItems="center"
        spacing={2}
        display={{ xs: "flex", md: "none" }}
        // style={{ marginRight: 80 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            // border: "1px solid",
            borderRadius: "100%",
            // background: "black"
          }}
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
                borderColor: theme.palette.blueGray[800],
                borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                background: theme.palette.blueGray[800],
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
                  borderColor: theme.palette.blueGray[800],
                  // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                  borderRadius: "8px 8px 0px 0px",
                  background: theme.palette.blueGray[800],
                  width: CONTROLLER_ICON_WRAPPER_SIZE,
                  height: CONTROLLER_ICON_WRAPPER_SIZE,
                  marginBottom: "-1px",
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
                // justifyContent="space-between"
                alignItems="center"
                // spacing={2}
                mt="0px !important"
              >
                <IconButton
                  {...moveLeft}
                  style={{
                    border: "1px solid gray",
                    borderRadius: "8px 0px 0px 8px",
                    borderColor: theme.palette.blueGray[800],
                    // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                    background: theme.palette.blueGray[800],
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
                   
                  />
                </IconButton>
                {preDefendSpeed.map((data, index) => {
                  if (index + 1 == incrementSpeed) {
                    return (
                      <IconButton
                        style={{
                          border: "1px solid gray",
                          borderColor: theme.palette.blueGray[800],
                          marginLeft: "-1px",
                          // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                          borderRadius: "10px 10px 10px 10px",
                          background: theme.palette.blueGray[800],
                          width: CONTROLLER_ICON_WRAPPER_SIZE + 10,
                          height: CONTROLLER_ICON_WRAPPER_SIZE + 10,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => {
                          postSpeedControl(data.value);
                          if (incrementSpeed >= 3 && incrementSpeed ) {
                            setIncrementSpeed(1);
                            return;
                          }
                          if(incrementSpeed){
                          setIncrementSpeed((pre) => pre + 1);
                          }
                        }}
                      >
                        {/* <Icon
                  icon="ic:round-play-arrow"
                  width={CONTROLLER_ICON_SIZE}
                  color={theme.palette.primary.contrastText}
                  // onClick={() => {
                  //   setControls(!controls);
                  // }}
                /> */}

                        <img
                          src={`/images/${data.image}`}
                          alt="Image Alt Text"
                        />
                      </IconButton>
                    );
                  }
                  return null;
                })}
                <IconButton
                  {...moveRight}
                  style={{
                    border: "1px solid gray",
                    borderColor: theme.palette.blueGray[800],
                    // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                    borderRadius: "0px 8px 8px 0px",
                    marginLeft: "-1px",
                    background: theme.palette.blueGray[800],
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
                className="998"
                style={{
                  border: "1px solid gray",
                  borderColor: theme.palette.blueGray[800],
                  // borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                  borderRadius: "0px 0px 8px 8px",
                  marginTop: "-1px",
                  background: theme.palette.blueGray[800],
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

      {/* <Steering /> */}
    </>
  );
}

export default RobotController;
