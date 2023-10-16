import React, { useContext, useEffect, useRef, useState } from "react";
import TiltController from "./TiltController";
import { SocketContext } from "../../Context/SocketContext";
import { TILT_CONTROLLER } from "../../Constant/defaultValue";
import { Icon } from "@iconify/react";
import RobotController from "./RobotController";
import VideoController from "../../Component/VideoController/VideoController";
import { callStartInfo, callEndedInfo } from "../../Api/callApi";
import { useSnackbar } from "../../Component/MUI/snackbar";
import ConferenceModal from "../../Modals/Conference/Conference";

import {
  IconButton,
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function VideoPlayerForConference({
  ICON_SIZE,
  APP_BAR_HEIGHT,
  controls,
  launchPad,
  ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_WRAPPER_SIZE,
  ConferenceAppBar,
  setLaunchPad,
  CONTROLLER_ICON_BORDER_RADIUS,
  CONTROLLER_ICON_SIZE,
  setControls,
  toIdUUID,
}) {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [callerApiId, setCallerApiId] = useState(null);
  const smBreakpoint = theme.breakpoints.values.sm; // Get the value of the sm breakpoint
  const objectStyleAlert = {
    boxShadow: "red 91px 34px 102px 120px inset",
    marginLeft: 0,
    filter:
      "grayscale(10%) saturate(4) blur(1px) brightness(1) contrast(1) hue-rotate(331deg) invert(0.01) sepia(0)",
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [ObjectDetectAlert, setObjectDetectAlert] = useState(false);
  // Calculate icon size based on sm breakpoint

  const iconSize = smBreakpoint <= 700 ? 35 : ICON_SIZE;

  const {
    myVideo,
    userVideo,
    remoteRef,
    localRef,
    PageTrigger,
    setPageTrigger,
    myId,
    me,
    localStream,
    remoteStream,
    processCall,
    obstacle,
  } = useContext(SocketContext);
  const regularVideoStyles = {
    width: controls ? "50%" : "100vw",
    height: controls ? "50%" : "100vh",
    objectFit: "cover",
    borderRadius: controls ? 10 : 0,
    marginTop: controls ? APP_BAR_HEIGHT : 0,
    marginLeft: controls ? APP_BAR_HEIGHT : 0,
  };

  const videoStyles = regularVideoStyles;

  useEffect(() => {
    setPageTrigger(true);
    setLaunchPad(!launchPad)
    return () => setPageTrigger(false);
  }, []);

  // useEffect(() => {
  //   if (localStream && localRef.current) {
  //     localRef.current.srcObject = localStream;
  //   }
  //   if (!remoteStream) {
  //     processCall();
  //   }
  //   if (remoteStream && remoteRef.current) {
  //     remoteRef.current.srcObject = remoteStream;
  //     callStartInfo(toIdUUID).then((data) => {
  //       setCallerApiId(data);
  //     });
  //   }
  // }, [localStream, remoteStream]);

  useEffect(() => {
    let continueProcessCall = true;

    const checkAndProcessCall = () => {
      if (!remoteStream && continueProcessCall) {
        processCall();
        setTimeout(checkAndProcessCall, 5000); // Call again after a delay
      } else {
        // remoteStream has data, you can stop calling processCall here
        continueProcessCall = false;
      }
    };

    if (localStream && localRef.current) {
      localRef.current.srcObject = localStream;
    }

    if (!remoteStream) {
      checkAndProcessCall(); // Initial call to check and process
    }

    if (remoteStream && remoteRef.current) {
      remoteRef.current.srcObject = remoteStream;
      callStartInfo(toIdUUID).then((data) => {
        setCallerApiId(data);
      });
    }

    // Clean up the effect when it's unmounted or when you want to stop the process
    return () => {
      continueProcessCall = false; // Stop the recursive calls
    };
  }, [localStream, remoteStream]);

  console.log(localStream, remoteStream, "localStream, remoteStream");

  useEffect(() => {
    if (obstacle) {
      enqueueSnackbar("There is an obstacle you cant move", {
        variant: "error",
      });
    }
  }, [obstacle]);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <div>
        <video
          src="/Video/Demo.mp4"
          autoPlay
          playsInline
          ref={remoteRef}
          onClick={() => setLaunchPad(!launchPad)}
          style={videoStyles}
        />

        <div style={{ position: "absolute", top: "0", width: "100%" }}>
          <Grid container>
            <Grid item sx={6} md={6}>
              <ConferenceAppBar AppBarHeight={APP_BAR_HEIGHT} />
            </Grid>
            <Grid item sx={6} md={6}>
              <div
                style={{
                  position: "relative",

                  right: "78px",
                  top: "23",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  paddingTop: "20px",
                }}
              >
                <video
                className="my-video"
                  src="/Video/Demo.mp4"
                  playsInline
                  ref={localRef}
                  muted
                  autoPlay
                  style={{
                    width: "20%",
                    height: "30%",
                    // border: "2px solid red",
                    borderRadius: 10,
                  }}
                />

                {/* <button onClick={() => processCall()}>onevent</button> */}
              </div>
            </Grid>
          </Grid>
        </div>
        {launchPad && !controls && (
          <VideoController
            CONTROLLER_ICON_BORDER_RADIUS={CONTROLLER_ICON_BORDER_RADIUS}
            CONTROLLER_ICON_WRAPPER_SIZE={CONTROLLER_ICON_WRAPPER_SIZE}
            CONTROLLER_ICON_SIZE={CONTROLLER_ICON_SIZE}
            TiltController={TiltController}
            TILT_CONTROLLER={TILT_CONTROLLER}
            setControls={setControls}
            controls={controls}
            ICON_SIZE={ICON_SIZE}
            callerApiId={callerApiId}
          />
        )}

        {controls || launchPad ? (
          ""
        ) : (
          <IconButton
            style={{
              position: "absolute",
              bottom: "0",
              border: "1px solid gray",
              borderColor: theme.palette.blueGray[900],
              borderRadius: "18px",
              background: theme.palette.blueGray[900],
              width: ICON_WRAPPER_SIZE,
              height: ICON_WRAPPER_SIZE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 30,
              marginBottom: 50,
            }}
          >
           
            <Icon
              icon="ion:game-controller-outline"
              width={ICON_SIZE}
              color={theme.palette.primary.contrastText}
              onClick={() => {
                setControls(true);
              }}
            />
          </IconButton>
        )}
      </div>

      <ConferenceModal
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        processCall={processCall}
      />
    </div>
  );
}
