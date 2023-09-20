import React, { useContext, useEffect, useRef,useState } from "react";
import { SocketContext } from "../../Context/SocketContext";

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
}) {
  const theme = useTheme();
  const smBreakpoint = theme.breakpoints.values.sm; // Get the value of the sm breakpoint
  const objectStyleAlert =  {
    boxShadow: 'red 91px 34px 102px 120px inset', 
    marginLeft: 0 ,
    filter: 'grayscale(10%) saturate(4) blur(1px) brightness(1) contrast(1) hue-rotate(331deg) invert(0.01) sepia(0)',
}

const [ObjectDetectAlert, setObjectDetectAlert] = useState(false);
  // Calculate icon size based on sm breakpoint

  const iconSize = smBreakpoint <= 700 ? 35 : ICON_SIZE ;

  const { myVideo, userVideo, PageTrigger, setPageTrigger, myId, me } =
    useContext(SocketContext);
    const regularVideoStyles = {
      width: controls ? "50%" : "100vw",
      height: controls ? "50%" : "100vh",
      objectFit: 'cover',
      borderRadius: controls ? 10 : 0,
      marginTop: controls ? APP_BAR_HEIGHT : 0,
      marginLeft: controls ? APP_BAR_HEIGHT : 0,
            };

    const videoStyles = regularVideoStyles
  useEffect(() => {
   
    setPageTrigger(true);
    return () => 
      setPageTrigger(false);
    
  }, []);

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
          ref={userVideo}
          onClick={() => setLaunchPad(!launchPad)}
          style={videoStyles}
        />

        <div style={{ position: "absolute", top: "0", width: "100%" }}>
          <Grid container>
           
            <Grid item sx={6} md={6}>
              <div
                style={{
                  position: "relative",
                  right: "78px",
                  top:"23",
                  paddingRight:'50px',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",

                }}
              >
                <video
                  src="/Video/Demo.mp4"
                  playsInline
                  ref={myVideo}
                  muted
                  autoPlay
                  style={{
                    width: "20%",
                    height: "30%",
                    // border: "2px solid red",
                    borderRadius: 10,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </div>
  
      </div>


    </div>
  );
}
