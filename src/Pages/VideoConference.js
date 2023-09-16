import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import ReactPlayer from "react-player";
import ConferenceAppBar from "../Component/VideoConference/ConferenceAppbar";
import VideoController from "../Component/VideoController/VideoController";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from 'react-router-dom';
 

// import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  IconButton,
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { TiltController } from "../Component/VideoConference";
import VideoPlayer from "../Component/VideoConference/VideoPlayerForConference"; // Correct casing
import { TILT_CONTROLLER } from "../Constant/defaultValue";
import { RobotController } from "../Component/VideoConference";
import { SocketContext } from "../Context/SocketContext";
import { ContextProvider } from "../Context/SocketContext";


// function CameraPlayer({ topMargin }) {
//   const [cameras, setCameras] = useState([]);
//   const videoRef = useRef();
//   const theme = useTheme();

//   // useEffect(() => {

//   //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//   //     console.log(navigator.mediaDevices, "getUserMedia supported");
//   //     navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//   //       videoRef.current.srcObject = stream;
//   //     });
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   const enumerateCameras = async () => {
//   //     const devices = await navigator.mediaDevices.enumerateDevices();
//   //     const cameras = devices.filter((device) => device.kind === "videoinput");
//   //     setCameras(cameras);
//   //   };

//   //   enumerateCameras();

//   //   const intervalId = setInterval(enumerateCameras, 5000);

//   //   return () => clearInterval(intervalId);
//   // }, []);

//   console.log(cameras, "cameras");
//   return (
//     <div
//       style={{
//         position: "relative",
//         right: "40px",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "flex-end",
//       }}
//     >
//       <video
//         src="/Video/Demo2.mp4"
//         ref={videoRef}
//         autoPlay
//         playsInline
//         muted
//         style={{
//           width: "20%",
//           height: "30%",
//           borderRadius: 10,
//           marginTop: topMargin,
//         }}
//       />
//     </div>
//   );
// }

const APP_BAR_HEIGHT = 64;
const ICON_WRAPPER_SIZE = 80;
const ICON_SIZE = 50;
const CONTROLLER_ICON_SIZE = 30;
const CONTROLLER_ICON_WRAPPER_SIZE = 50;
const CONTROLLER_ICON_BORDER_RADIUS = 8;

function VideoConference() {
  const theme = useTheme();
  const location = useLocation();

  const [controls, setControls] = useState(false);
  const [launchPad, setLaunchPad] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [userId, setUserId] = useState("");

  const searchParms = new URLSearchParams(location.search);

  const userUUID = searchParms.get('myid');
  const toIdUUID = searchParms.get('toId');


  const {
    name,
    callAccepted,
    myVideo,
    userVideo,
    callEnded,
    stream,
    call,
    isScreenSharing,
    shareScreen,
    stopScreenSharing,
    answerCall,
    me,
    myId,
    setName,
    leaveCall,
    callUser,
    addUserId,
    disconnectUser,
  } = useContext(SocketContext);
  

  useEffect(() => {
    addUserId(userUUID);
    callUser(toIdUUID)
    // callUser('TEBO-GOKUL-NOKIA-TABLET')

  }, [userUUID,toIdUUID])
  

  const addUser = useCallback(() => {
    console.log("hhh55", userId);
    addUserId(userId);
  }, [userId, addUserId]);

  const DisConnectUser = useCallback(() => {
    disconnectUser(userId);
  });


  return (
    <div>
      <div className="react-player" style={{ display: "none" }}></div>
      <VideoPlayer
        myVideo={myVideo}
        userVideo={userVideo}
        ICON_SIZE={ICON_SIZE}
        APP_BAR_HEIGHT={APP_BAR_HEIGHT}
        controls={controls}
        launchPad={launchPad}
        ICON_WRAPPER_SIZE={ICON_WRAPPER_SIZE}
        CONTROLLER_ICON_WRAPPER_SIZE={CONTROLLER_ICON_WRAPPER_SIZE}
        ConferenceAppBar={ConferenceAppBar}
        setLaunchPad={setLaunchPad}
        CONTROLLER_ICON_BORDER_RADIUS={CONTROLLER_ICON_BORDER_RADIUS}
        CONTROLLER_ICON_SIZE={CONTROLLER_ICON_SIZE}
        setControls={setControls}
        toIdUUID={toIdUUID}
      />

      {controls && (
        <Grid
          container
          sx={{ position: "absolute", bottom: "0px" }}
          spacing={2}
        >
          <VideoController
            CONTROLLER_ICON_BORDER_RADIUS={CONTROLLER_ICON_BORDER_RADIUS}
            CONTROLLER_ICON_WRAPPER_SIZE={CONTROLLER_ICON_WRAPPER_SIZE}
            CONTROLLER_ICON_SIZE={CONTROLLER_ICON_SIZE}
            TiltController={TiltController}
            TILT_CONTROLLER={TILT_CONTROLLER}
            setControls={setControls}
            controls={controls}
            ICON_SIZE={ICON_SIZE}
          />
          

          {/*--------- The below code is to do extra funcationality ----------*/}

          {/* {me && (
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h6">
                  Account Info
                </Typography>
                <TextField
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                {console.log(myId, "myId")}
                <input
                  ref={myId}
                  value={me}
                  style={{ border: "1px solid red" }}
                ></input>
               
                <Button variant="contained" color="primary" fullWidth>
                  Copy Your ID {me}
                </Button>
              
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography gutterBottom variant="h6">
                  Make a call
                </Typography>
                <TextField
                  label="ID to call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Sent Id"
                  onChange={(e) => setUserId(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={addUser}
                >
                  sendUser Id
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={DisConnectUser}
                >
                  DissConnect User
                </Button>

                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={leaveCall}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => callUser(idToCall)}
                  >
                    Call
                  </Button>
                )}
                {call.isReceivingCall && !callAccepted && (
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <h1>{call.name} is calling:</h1>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={answerCall}
                    >
                      Answer
                    </Button>
                  </div>
                )}
              </Grid>
            </Grid>
          )} */}
        </Grid>
      )}
    </div>
  );
}

export default VideoConference;
