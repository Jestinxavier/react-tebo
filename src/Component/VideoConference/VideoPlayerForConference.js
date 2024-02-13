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
import ZoomVideo from "@zoom/videosdk";

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

  //  --------------------------

  const {
    myVideo,
    userVideo,
    remoteRef,
    localRef,
    PageTrigger,
    setPageTrigger,
    setMqttRequestToServer,
    sentZoomCredentials,
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
    await sentZoomCredentials(zoomUserData, toIdUUID);

    try {
      // Initialize the Zoom client
      await client.init("en-US", "Global", { patchJsMedia: true });

      // Fetch the signature from your backend
      const response = await fetch("http://localhost:5000/generateSignature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionName: zoomUserData.sessionName,
          role: zoomUserData.role, // 0 for attendee, 1 for host
          sessionKey: zoomUserData.sessionKey,
          userIdentity: zoomUserData.userIdentity,
        }),
      });
      const { signature } = await response.json();

      // Join the session using the generated signature
      await client.join(
        `${zoomUserData.sessionName}`,
        signature,
        `${user.name}`,
        zoomUserData.userIdentity
      );

      // Once joined, get the media stream and set user ID
      const mediaStream = client.getMediaStream();
      setStream(mediaStream);
      const userInfo = client.getCurrentUserInfo();
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
                    console.log("Capture started");
                  } else if (payload.state === "Stopped") {
                    console.log("Capture stopped");
                  } else {
                    console.log("Stop capturing Failed");
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
        console.log("Video started");
      }
    } catch (error) {
      console.error("Error starting video:", error);
    }
  };

  const handleVideoStop = async () => {
    try {
      if (stream) {
        await stream.stopVideo();
        console.log("Video stopped");
      }
    } catch (error) {
      console.error("Error stopping video:", error);
    }
  };

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
    joinSession();

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

    client.on("user-added", onUserAdded);
    client.on("user-removed", onUserRemoved);

    return () => {
      client.off("user-added", onUserAdded);
      client.off("user-removed", onUserRemoved);
    };
  }, []);

  useEffect(() => {
    const onPeerVideoStateChange = async (payload) => {
      if (payload.action === "Start") {
        // Assume a function to get video stream (this is an example and might not exist in the SDK)
        const HDVideo = await stream?.isSupportHDVideo();
        console.log(HDVideo, "HDVideo");
        stream.subscribeVideoStatisticData();

        client.on("video-statistic-data-change", (payload) => {
          console.log(payload.height,"HD"); // 720 or 360
        });
        const videoStream = await client.getAllUser();
        {
          console.log({ videoStream });
        }
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

        console.log({ stream }, "stream******&&&&&");
        videoStream.forEach((user) => {
          if (user.bVideoOn) {
            stream.renderVideo(
              document.querySelector("#participant-videos-canvas"),
              user.userId,
              400,
              200,
              0,
              0,
              3
            );
          }
        });
      }
    };

    if (client && stream) {
      client.on("peer-video-state-change", onPeerVideoStateChange);
      client.on("video-statistic-data-change", (payload) => {
        console.log("height of the video", payload.height); // 720 or 360
      });
      stream.startAudio({ backgroundNoiseSuppression: true });
      stream.enableBackgroundNoiseSuppression(true)
      // stream.startAudio();
      handleVideoStart();
    }

    return () => {
      if (client) {
        client.off("peer-video-state-change", onPeerVideoStateChange);
      }
    };
  }, [client, stream]);

  // Zoom Function ended --------------------------

  // Show loading screen while joining session and getting participant list

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
        console.log({ DataLogger: data });
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
            muted
            // width="1920"
            // height="1080"
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
