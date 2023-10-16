import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
  useReducer,
} from "react";
import ReactPlayer from "react-player";
import ConferenceAppBar from "../../Component/VideoConference/ConferenceAppbar";
import VideoController from "../../Component/VideoController/VideoController";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
// import JoyRide, { ACTIONS, EVENTS, STATUS } from "react-joyride";
import Joyride, { STATUS } from "react-joyride";
import "./styles.css";
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
import { TiltController } from "../../Component/VideoConference";
import VideoPlayer from "../../Component/VideoConference/VideoPlayerForConference"; // Correct casing
import { TILT_CONTROLLER } from "../../Constant/defaultValue";
import { RobotController } from "../../Component/VideoConference";
import { SocketContext } from "../../Context/SocketContext";
import { ContextProvider } from "../../Context/SocketContext";

const APP_BAR_HEIGHT = 64;
const ICON_WRAPPER_SIZE = 80;
const ICON_SIZE = 50;
const CONTROLLER_ICON_SIZE = 30;
const CONTROLLER_ICON_WRAPPER_SIZE = 50;
const CONTROLLER_ICON_BORDER_RADIUS = 8;

function VideoConference() {
  const theme = useTheme();
  const location = useLocation();
  const joyrideRef = useRef(null);

  const [controls, setControls] = useState(false);
  const [launchPad, setLaunchPad] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [userId, setUserId] = useState("");

  const searchParms = new URLSearchParams(location.search);

  const userUUID = searchParms.get("myid");
  const toIdUUID = searchParms.get("toId");

  const [runTour, setRunTour] = useState(true);
  const [run, setRun] = useState(true);
  // wakingmen.gif
  const steps = [
    {
      content: (
        <div>
          <img src="/images/Airplane.gif" alt="Image Alt Text" />
          <div class="card-content">
            <h2 class="card-title">Take A Tour </h2>
            <p class="card-description">Let's begin our journey With Tebo!</p>
          </div>
        </div>
      ),
      locale: { skip: <strong aria-label="skip">SKIP</strong> },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <div>
          <img src="/images/Touch.jpg" alt="Image Alt Text" />
          <div class="card-content">
            <h2 class="card-title">For Controller</h2>
            <p class="card-description">Touch the center of the screen to access the controller button for controlling the Tebo.</p>
          </div>
        </div>
      ),
      floaterProps: {
        disableAnimation: true,
      },
      spotlightPadding: 20,
      target: ".video-controller",
    },
    
    {
      content:     <div>
      <img src="/images/myVideo.gif" alt="Image Alt Text" />
      <div class="card-content">
        <h2 class="card-title">Preview</h2>
        <p class="card-description">You can preview your video here.</p>
      </div>
    </div>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".my-video",
      // title: "Our projects",
    },
    {
      content:     <div>
      <img src="/images/camareTilt.jpeg" alt="Image Alt Text" />
      <div class="card-content">
        <h2 class="card-title">Tilt Control</h2>
        <p class="card-description">You can preview your video here.</p>
      </div>
    </div>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".my-tilt",
      // title: "Our projects",
    },
    {
      content:     <div>
      <img src="/images/reconnect.gif" alt="Image Alt Text" />
      <div class="card-content">
        <h2 class="card-title">Reconnect Tebo</h2>
        <p class="card-description">If Tebo is not connected, you can force a connection by clicking the 'Reconnect' button.</p>
      </div>
    </div>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".reconnect",
      // title: "Our projects",
    },
    {
      content:     <div>
      <img src="/images/fullscreen.jpeg" alt="Image Alt Text" />
      <div class="card-content">
        <h2 class="card-title">Screen Size</h2>
        <p class="card-description">You can use this button to switch between full-screen and minimal-screen modes.</p>
      </div>
    </div>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".fullscreen",
      // title: "Our projects",
    },
   
    {
      content:     <div>
      <img src="/images/gohome.gif" alt="Image Alt Text" />
      <div class="card-content">
        <h2 class="card-title">Go Home</h2>
        <p class="card-description">If you press the 'Go Home' button, Tebo will move to the docking station.</p>
      </div>
    </div>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".gohome",
      // title: "Our projects",
    },
    
    {
      content:     <div>
      <img src="/images/callend.gif" alt="Image Alt Text" />
      <div class="card-content">
        <h2 class="card-title">Call End</h2>
        <p class="card-description">This button is used to end the call.</p>
      </div>
    </div>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".endcall",
      // title: "Our projects",
    },
    
    {
      content:     <div>
      <img src="/images/micmute.gif" alt="Image Alt Text" />
      <div class="card-content">
        <h2 class="card-title">Mute Button</h2>
        <p class="card-description">This button is used to mute and unmute the microphone.</p>
      </div>
    </div>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".mutebutton",
      // title: "Our projects",
    },
    {
      content:     <div>
      <img src="/images/controller.gif" alt="Image Alt Text" />
      <div class="card-content">
        <h2 class="card-title">Tebo Controller</h2>
        <p class="card-description">These buttons are used to control Tebo's movement, including moving forward, backward, left, and right.</p>
      </div>
    </div>,
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
      },
      target: ".robotController",
      // title: "Our projects",
    }, 
   
    
    
  ];

  const getHelpers = (helpers) => {
    joyrideRef.current = helpers;
  };

  const handleClickStart = (e) => {
    e.preventDefault();
    setRun(true);
  };

  const handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }

    console.groupCollapsed(type);
    console.log(data);
    console.groupEnd();
  };

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
    callUser(toIdUUID);
    // callUser('TEBO-GOKUL-NOKIA-TABLET')
  }, [userUUID, toIdUUID]);

  const addUser = useCallback(() => {
    console.log("hhh55", userId);
    addUserId(userId);
  }, [userId, addUserId]);

  const DisConnectUser = useCallback(() => {
    disconnectUser(userId);
  });

  return (
    <div>
      <Joyride
        callback={handleJoyrideCallback}
        continuous={true}
        getHelpers={getHelpers}
        run={run}
        scrollToFirstStep={true}
        showProgress={true}
        showSkipButton={true}
        steps={steps}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <div
        className="video-controller"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></div>

      <div className="react-player" style={{ display: "none" }}></div>
      <VideoPlayer
        className="tour-logo"
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
