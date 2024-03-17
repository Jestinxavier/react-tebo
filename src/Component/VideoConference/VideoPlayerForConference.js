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
import ZoomVideo, { VideoQuality } from "@zoom/videosdk";

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
import useArrowKeyHandlers from "../../hooks/useArrowKeyHandlers";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../auth/useAuthContext";
import { dispatch, useSelector } from "../../redux/store";
import {  storZoomCredentials  } from "../../redux/slices/robot";
import { NODE_BASE_BASEURL } from "../../config-global";

let videoCanvas = document.querySelector("#participant-videos-canvas");
const vidHeight = 270;
const vidWidth = 480;
const getVideoXandY = (index, totalUser) => {
  const gridSize = Math.ceil(Math.sqrt(totalUser));
  const x = (index % gridSize) * vidWidth;
  const y = (gridSize - Math.floor(index / gridSize) - 1) * vidHeight;
  return { x, y };
};

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
  const { user } = useAuthContext();
  // ------- zoom States -------
  const [client] = useState(() => ZoomVideo.createClient());
  const [stream, setStream] = useState(null);
  const participantVideoCanvasRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [participantUserIds, setParticipantUserIds] = useState([]);
  const [audioStarted, setAudioStarted] = useState(false);
  const micStatus = useSelector((state) => state?.robot?.muteMic);
  const callState = useSelector((state) => state?.robot?.callState);
  const zoomCredentials = useSelector((state) => state?.robot?.zoomSdkCredentials)

  // const zoomCredentials = localStorage.getItem('zoomCredentials');

  console.log({ micStatus });
  //  --------------------------

  const {
    myVideo,
    userVideo,
    remoteRef,
    localRef,
    PageTrigger,
    setPageTrigger,
    setMqttRequestToServer,
    sentZoomCredentials,zoomAcknowledgementData,setZoomAcknowledgementData,
    myId,
    me,
    localStream,
    remoteStream,
    processCall,
    obstacle,
    setObstacle,
    readyState,
    obstacleData,
  } = useContext(SocketContext);

  const uniqId = uuidv4();
  let zoomUserData = {
    sessionName: `${uniqId}${toIdUUID}`,
    role: 1,
    sessionKey: `${uniqId}`,
    userIdentity: `1234`,
    name: user.name,
  };

  // Zoom Functions --------------------------------
  const joinSession = async () => {
console.log("api Fetching 999",zoomCredentials);

    // let zoomCredentialsData = JSON.parse(zoomCredentials)
   

    try {
      // Initialize the Zoom client
      await client.init("en-US", "Global", { patchJsMedia: true });
      // Fetch the signature from your backend
      const response = await fetch(
        `${NODE_BASE_BASEURL}/generateSignature`,
        // "http://localhost:5000/generateSignature",
      // "https://tebo.devlacus.com/generateSignature",
            
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sdkKey:zoomCredentials.zoom_account_id,
            sdkSecret:zoomCredentials.zoom_secret_key,
            sessionName: zoomUserData.sessionName,
            role: zoomUserData.role, // 0 for attendee, 1 for host
            sessionKey: zoomUserData.sessionKey,
            userIdentity: zoomUserData.userIdentity,
          }),
        }
      );
      const { signature } = await response.json();

      // Join the session using the generated signature
     const joinRes =  await client.join(
        `${zoomUserData.sessionName}`,
        signature,
        `${user.name}`,
        zoomUserData.userIdentity
      );

      // Once joined, get the media stream and set user ID
      const mediaStream = client.getMediaStream();
      setStream(mediaStream);
      const userInfo = client.getCurrentUserInfo();
      const sessionId = await client.getSessionInfo().sessionId;
      
      setUserId(userInfo.userId);

      // Fetch and set the current users
      const currentUsers = await client.getAllUser();
     
      setParticipantUserIds(currentUsers.map((user) => user.userId));
    } catch (error) {
      console.error("Error joining the Zoom session:", error);
    }
  };

  const handleVideoStart = async () => {
    try {
      if (stream) {
        if (stream.isRenderSelfViewWithVideoElement()) {
          
          await stream.startVideo({
            videoElement: document.querySelector("#my-self-view-video"),
          });
        } else {
          try {
            // await stream.startVideo();
            await stream.startVideo({ originalRatio: true, hd: true });
            console.log({ stream });

            if (userId) {
              // client.on("video-aspect-ratio-change", async (payload) => {
              //   const { userId, aspectRatio } = payload;
              //   console.log({aspectRatio},"***********xxxxxx************");
              //   const height = 720 / aspectRatio;
              //   // resize the video
              //   await stream.adjustRenderedVideoPosition(
              //     participantVideoCanvasRef.current,
              //     userId,
              //     360,
              //     height,
              //     0,
              //     0
              //   );
              //   });

              client.on("video-capturing-change", (payload) => {
                try {
                  if (payload.state === "Started") {
                    // console.log("Capture started");
                  } else if (payload.state === "Stopped") {
                    // console.log("Capture stopped");
                  } else {
                    // console.log("Stop capturing Failed");
                  }
                } catch (error) {
                  console.log(error);
                }
              });
              // stream.renderVideo(
              //   participantVideoCanvasRef.current,
              //   userId,
              //   360, 640, 0, 0, 1
              // );
            }
          } catch (error) {
            console.log(error);
          }
        }
        // console.log("Video started");
      }
    } catch (error) {
      console.error("Error starting video:", error);
    }
  };

  const handleVideoStop = async () => {
    try {
      if (stream) {
        await stream.stopVideo();
        // console.log("Video stopped");
      }
    } catch (error) {
      console.error("Error stopping video:", error);
    }
  };
  let audioDecode;
  let audioEncode;
  const startAudioButton = async () => {
    var isSafari = window.safari !== undefined;

    // Ensure stream is not null before trying to call methods on it
    if (stream) {
      if (isSafari) {
        if (audioEncode && audioDecode) {
          await stream?.startAudio(); // Using optional chaining
          setAudioStarted(true);
        } else {
          console.log("safari audio has not finished initializing");
        }
      } else {
        await stream?.startAudio(); // Using optional chaining
        setAudioStarted(true);
      }
    } else {
      console.log("Stream is not initialized.");
    }
  };

  const audioController = async () => {
    if (stream) {
      // Check if stream is initialized
      if (audioStarted) {
        if (micStatus) {
          // console.log("mute audio**********");
          // Your logic when micStatus is true
          await stream.unmuteAudio();
        } else {
          // console.log("unmute audio*********");
          // Your logic when micStatus is false
          await stream.muteAudio();
        }
      } else {
        // Initialize or handle the absence of stream appropriately
      }
      startAudioButton();
    } else {
      console.log("Stream is not initialized.");
    }
  };

  const renderVideo = async (event) => {
    const mediaStream = client.getMediaStream();
    if (event?.action === "Stop") {
      await mediaStream.stopRenderVideo(videoCanvas, event.userId);
    }
    const usersWithVideo = client
      .getAllUser()
      .filter((e) => e.bVideoOn)
      .reverse();
    const numberOfUser = usersWithVideo.length;
    for await (const [index, user] of usersWithVideo.entries()) {
      const { x, y } = getVideoXandY(index, numberOfUser);
      if (event.userId === user.userId && user.bVideoOn) {
        await mediaStream.renderVideo(
          videoCanvas,
          user.userId,
          vidWidth,
          vidHeight,
          x,
          y,
          2
        );
      } else if (user.bVideoOn) {
        await mediaStream
          .adjustRenderedVideoPosition(
            videoCanvas,
            user.userId,
            vidWidth,
            vidHeight,
            x,
            y
          )
          .catch((e) => console.log(e));
      }
    }
    const canvasHeight =
      numberOfUser > 4
        ? vidHeight * 3
        : numberOfUser > 1
        ? vidHeight * 2
        : vidHeight;
    const canvasWidth =
      numberOfUser > 4
        ? vidWidth * 3
        : numberOfUser > 1
        ? vidWidth * 2
        : vidWidth;
    try {
      videoCanvas.height = canvasHeight;
      videoCanvas.width = canvasWidth;
    } catch (e) {
      mediaStream?.updateVideoCanvasDimension(
        videoCanvas,
        canvasWidth,
        canvasHeight
      );
    }
  };

  const toggleVideo = async () => {
    const mediaStream = client.getMediaStream();
    if (mediaStream.isCapturingVideo()) {
      await mediaStream.stopVideo();
      await renderVideo({
        action: "Stop",
        userId: client.getCurrentUserInfo().userId,
      });
    } else {
      await mediaStream.startVideo();
      await renderVideo({
        action: "Start",
        userId: client.getCurrentUserInfo().userId,
      });
    }
  };

  // your start audio button click

  const leaveMeeting = async () => {
    try {
      if (client) {
        await client.leave();
        console.log("Left the meeting successfully");
      }
    } catch (error) {
      console.error("Error leaving the meeting:", error);
    }
  };

  useEffect(() => {
    if (callState) {
      leaveMeeting();
    }
  }, [callState, leaveMeeting]);
const passCredentialToApp = async () => {
  let zoomData = {zoomUserData, toIdUUID,zoomCredentials}
  dispatch(storZoomCredentials(zoomData))
  const zoomAknowlegment = await sentZoomCredentials(zoomData, toIdUUID)
  setZoomAcknowledgementData(true)
  return zoomAknowlegment
}
  useEffect(() => {
    // const clientSideTelemetry = client?.getLoggerClient()
    const fetchData = async () => {
      let Aknowlegment = await passCredentialToApp();
      if (Aknowlegment) {
        joinSession();
      }
    };
    
    const onUserAdded = (payload) => {
      setParticipantUserIds((prevIds) => [
        ...new Set([...prevIds, payload.userId]),
      ]);
    };

    const onUserRemoved = (payload) => {
      setParticipantUserIds((prevIds) =>
        prevIds.filter((id) => id !== payload.userId)
      );
    };

    client.on("network-quality-change", (payload) => {
      console.log({ networkQualityChange: payload });
      // enqueueSnackbar(payload,{variant:"info"})
    });
    client.on("user-added", onUserAdded);
    client.on("user-removed", onUserRemoved);
    // clientSideTelemetry.reportToGlobalTracing()
    fetchData()
    return () => {
      client.off("user-added", onUserAdded);
      client.off("user-removed", onUserRemoved);
    };
  }, []);
  useEffect(() => {
    // console.log({zoomAcknowledgementData});
  if(!zoomAcknowledgementData){
    passCredentialToApp()
  }
  }, [zoomAcknowledgementData])
  

  useEffect(() => {
    const onPeerVideoStateChange = async (payload) => {
      if (payload.action === "Start") {
        // Assume a function to get video stream (this is an example and might not exist in the SDK)
        const HDVideo = await stream?.isSupportHDVideo();
        // console.log(HDVideo, "HDVideo");
        
        const videoStream = await client.getAllUser();

        // client.on("video-aspect-ratio-change", async (payload) => {
        //   const { userId, aspectRatio } = payload;
        //   console.log({aspectRatio}, "Aspect Ratio Log");
        //   const height = 1080 / aspectRatio; // Correct calculation for height
        //   // Resize the video
        //   await stream.adjustRenderedVideoPosition(
        //     document.querySelector("#participant-videos-canvas"), // Ensure this ID matches your canvas element
        //     userId,
        //     1080, // Desired width
        //     height, // Calculated height
        //     0,
        //     1
        //   );
        // });

        // console.log({ stream }, "stream******&&&&&");
        // console.log({participant:videoStream});
        videoStream.forEach((user) => {
          if (user.bVideoOn) {
            stream.renderVideo(
              document.querySelector("#participant-videos-canvas"),
              user.userId,
              1920,
              1080,
              0,
              0,
              VideoQuality.Video_1080P

            );
          }
        });
      }
    };

   
      stream?.subscribeVideoStatisticData();
      stream?.subscribeAudioStatisticData()

      client?.on("peer-video-state-change", onPeerVideoStateChange);
      client?.on("video-statistic-data-change", (payload) => {
        
        const label = payload.encoding
          ? "Sending video statistic:"
          : "Receiving video statistic:";
        console.log(payload,)
      });
      client.on('audio-statistic-data-change', (payload) => {
        // console.log({'audio-statistic-data-change':payload})
       })
      


      // stream.enableBackgroundNoiseSuppression(true)
      // stream.muteAudio()

      // stream.startAudio();
      handleVideoStart();
    

    return () => {
      if (client) {
        client.off("peer-video-state-change", onPeerVideoStateChange);
        client.off("video-statistic-data-change")
      }
    };
  }, [client, stream, userId]);

  useEffect(() => {
    // console.log(micStatus, "micStatus************************");
    if (stream) {
      audioController();
    }
  }, [audioController, micStatus, stream]);

  // Zoom Function ended --------------------------

  // Show loading screen while joining session and getting participant list

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
    setLaunchPad(!launchPad);
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
        // console.log({ DataLogger: data });
        setCallerApiId(data);
      });
    }

    // Clean up the effect when it's unmounted or when you want to stop the process
    return () => {
      continueProcessCall = false; // Stop the recursive calls
    };
  }, [localStream, remoteStream]);

  useEffect(() => {
    if (obstacle) {
      enqueueSnackbar(obstacleData, {
        variant: "error",
        onClose: () => {
          setObstacle(false);
        },
      });
    }
  }, [obstacle, obstacleData]);

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
        <div style={{ transform: "scaleX(-1)" }}>
          {/* <video
            src="/Video/Demo.mp4"
            autoPlay
            playsInline
            ref={remoteRef}
            onClick={() => setLaunchPad(!launchPad)}
            style={videoStyles}
          />  */}

          <canvas
            id="participant-videos-canvas"
            ref={participantVideoCanvasRef}
            style={videoStyles}
            width="1920"
            height="1080"
          ></canvas>
        </div>
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
                {/* <video
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
                /> */}
                <video
                  playsInline
                  id="my-self-view-video"
                  style={{
                    width: "20%",
                    height: "30%",
                    // border: "2px solid red",
                    borderRadius: 10,
                  }}
                  muted
                  autoPlay
                />

                {/* <Box onClick={()=>startAudioButton()}>oosspp</Box> */}

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
      {/* <button onClick={() => toggleVideo()}>toggleVideo</button> */}
    </div>
  );
}
