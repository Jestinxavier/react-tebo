import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { v4 as uuid } from "uuid";
import { validateSdpOffer } from "../Constant/herperFunction";
import { NODE_BASE_BASEURL } from "../config-global";

const SocketContext = createContext();
const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const [screenShareStream, setScreenShareStream] = useState(null); // New state for screen sharing stream
  const [name, setName] = useState("");
  const [PageTrigger, setPageTrigger] = useState(false);
  const [socket, setSocket] = useState(null);
  const [callerId, setCallerId] = useState(null);

  const localRef = useRef();
  const remoteRef = useRef();
  const [remoteStream, setRemoteStream] = useState(null);
  const [first, setfirst] = useState(false);
  const [alertWarningOnCall, setAlertWarningOnCall] = useState(null);
  const [readyStateMqtt, setReadyStateMqtt] = useState(true);
  const otherUserId = useRef(null);

  const [obstacle, setObstacle] = useState(false);
  const [obstacleData, setObstacleData] = useState("");
  const [mapState, setMapState] = useState(null);
  const [allMapState, setAllMapState] = useState(null);
  const [zoomAcknowledgementData, setZoomAcknowledgementData] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false); // New state for screen sharing

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const myId = useRef(null);

  const peerConnection = useRef(
    new RTCPeerConnection({
      sdpSemantics: "plan-b",
      bundlePolicy: "max-compat",
      rtcpMuxPolicy: "negotiate",
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        {
          urls: "turn:172.31.83.246:3478?transport=tcp",
          credential: "user",
          username: "root",
        },


      ],
    })
  );

  useEffect(() => {
    // "https://tebo.devlacus.com"
    const socketInstance = io(
      // "http://localhost:5000",
      // "https://tebo.devlacus.com",
      NODE_BASE_BASEURL,
     
      {
        // transports: ["websocket"],
        query: {
          callerId,
        },
      }
    );
    setSocket(socketInstance);
  }, []);





  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    let currentStreamCopy = null;
    if (PageTrigger && socket && otherUserId) {
      socket?.on("CredentialAcknowledgement", (data) => {
        console.log(data, "CredentialAcknowledgement");
        setZoomAcknowledgementData(data)
      });
      socket?.on("mobileLogData", (data) => {
        console.log("mobileLogData📲📲📲",data);
     
      });
    

  

  
      let isFront = false;
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              //  minWidth: 500, // Provide your own width, height and frame rate here
              // minHeight: 300,
              // minFrameRate: 30,

              minWidth: 1280,
              minHeight: 720,
              minFrameRate: 30,
            },
            //   facingMode: isFront ? "user" : "environment",
            // optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
          },
        })
        .then((stream) => {
          // Got stream!
         

          // setlocalStream(stream);
          currentStreamCopy = stream;
          stream.getTracks().map((track) => {
            peerConnection.current.addTrack(track, stream);
          });
        })
        .catch((error) => {
          console.log(error.message);
        });

      socket?.on("obstacleDetected", (data) => {
        if (data == "0") {
          setObstacleData("");
          setObstacle(false);
        } else {
          
          switch (data) {
            case "0":
              setObstacleData("");
              break;
            case "1":
              setObstacleData(
                "Obstacle detected on the front side of the robot.You can't move."
              );
              break;
            case "2":
              setObstacleData(
                "Obstacle detected on the right side of the robot.You can't move."
              );
              break;
            case "3":
              setObstacleData(
                "Obstacle detected on the left side of the robot.You can't move."
              );
              break;
            case "4":
              setObstacleData(
                "Obstacle detected on the back side of the robot.You can't move."
              );
              break;
            default:
              break;
          }
          setObstacle(true);
        }
      });
      socket?.on("readyState", (data) => {
        if (data === "ready") {
          setReadyStateMqtt(false);
        }
        // console.log("readyState", { data });
      });

      socket?.on("homeStatusChanged", (data) => {
        setAlertWarningOnCall(data);
      });

      socket?.on("mapState", (data) => {
        setMapState(data);
      });
    }

    socket?.on("mapStatusBroadcastMessage", (data) => {
      
      setAllMapState((prevState) => ({ ...prevState, ...data }));
    });
    return () => {
     
      currentStreamCopy?.getTracks().forEach((track) => track.stop());
    };
  }, [PageTrigger, socket]);

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer();
    // console.log("👺", sessionDescription);
    const roomId = uuid();
    const manageData = await validateSdpOffer(sessionDescription.sdp);
    if (manageData) {
      let localDiscripationdata =
        await peerConnection.current.setLocalDescription(sessionDescription);
  
      sendCall({
        calleeId: otherUserId.current,
        // calleeId: 'TEBO-GOKUL-NOKIA-TABLET',
        // rtcMessage: sessionDescription,
        roomId,
      });
    }
    // }, 5000);
    setfirst(true);
  }
  


  function startMapping(data) {
    // console.log("sdsdsd", data);
    socket?.emit("start-mapping", { id: data });
  }

  function stopMapping(data) {
    socket?.emit("stopMapping", { id: data });
  }

  function deleteMap(data) {
    socket?.emit("deleteMap", { id: data });
  }

  function sendCall(data) {
    //  start call is used for sending mqtt on start call time
    socket?.emit("start-call", { id: data.calleeId });
    // sending call state mqtt on start meeting time
    socket?.emit("start-meeting", { id: data.calleeId });
    socket?.emit("call", data);
  }

  

  const addUserId = (userId, toId) => {
    // console.log("addUserId");
    return new Promise((resolve, reject) => {
      // console.log({ userId });

      socket?.emit(
        "setMapUser",
        {
          from: userId,
          toId: toId,
        },
        (response) => {
          if (response.success) {
            // console.log("**Operation successful:", response);
            resolve(response); // Resolve with the entire response object
          } else {
            // console.log("**Operation failed:", response);
            reject(response.error); // Reject with the error message
          }
        }
      );

      // Note: This will be executed immediately after the emit, not waiting for the callback.
      socket?.emit("sentUserId", userId);
    });
  };

  const callUser = async (id) => {
    otherUserId.current = id;
  };



  function leave() {
    socket?.emit("meeting-ended", { id: otherUserId.current });
  }




  useEffect(() => {
    socket?.on("mqttMessageReceived", (payload) => {
      console.log("Received new MQTT message on the frontend:", payload);
    });

    const haldleSocket = (data) => {
      console.log(data, "data****");
      socket?.emit("setuuid", data);
    };

    haldleSocket("5w422bb3t23");
  }, []);

  const shareScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        setScreenShareStream(screenStream);

        // myVideo.current.srcObject = screenStream; // Update the source object to display screen share
        setIsScreenSharing(true);
      })
      .catch((error) => console.error("Error sharing screen:", error));
  };


 
  const disconnectUser = (userId) => {
    socket?.emit("disconnect-user", userId);
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket?.emit("meeting-ended", { id: otherUserId.current });
    stream?.getTracks().forEach((track) => track.stop());

    if (connectionRef.current) {
      // console.log("===================connectionRef.current=================");
      // console.log(connectionRef.current);
      // console.log("====================================");
      connectionRef.current.destroy();
    }

    // window.location.reload();

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    return true;
  };

  const sendMessage = (message) => {
    // socket?.emit("sentTo", message);
    // console.log("::::");
  };

  const setMqttRequestToServer = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    socket?.emit("move-manual", mqttData);
  };

  const setMqttSpeedControl = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    socket?.emit("speedControl", mqttData);
  };

  const setMqttRequestForTilting = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    // console.log(mqttData);
    socket?.emit("tilt-camera", mqttData);
  };

  const sentZoomCredentials = (data,userId) => {
    // console.log("hhhh",data,userId);
    let zoomData = {data,id:userId}
    socket?.emit("zoomData", zoomData);
    return true 
  };
  const setMqttRequestForGotoHome = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    // console.log(mqttData);
    socket?.emit("goto-home", mqttData);
  };

  const setMqttRequestForGotoDock = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    // console.log(mqttData);
    socket?.emit("goto-Dock", mqttData);
  };

  const setMqttRequestForMeetingEnd = (data, Id, myId) => {
    let mqttData = {
      data,
      Id,
      myId,
    };

    // console.log(mqttData);
    socket?.emit("meeting-end", mqttData);
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        alertWarningOnCall,
        obstacle,
        sentZoomCredentials,
        allMapState,
        callAccepted,
        myVideo,
        localRef,
        remoteRef,
        otherUserId,
        remoteStream,
        processCall,
        leave,
        setMqttRequestForTilting,
        setMqttRequestForGotoHome,
        setMqttRequestForGotoDock,
        setMqttRequestForMeetingEnd,
        userVideo,
        stream,
        name,
        setName,
        setCallerId,
        setMqttRequestToServer,
        setMqttSpeedControl,
        callEnded,zoomAcknowledgementData,

        callUser,
        leaveCall,
        shareScreen,
        isScreenSharing,
        PageTrigger,
        setPageTrigger,
        myId,
        obstacleData,
        addUserId,
        disconnectUser,
        sendMessage,
        startMapping,
        stopMapping,
        deleteMap,
        mapState,
        setObstacle,
        readyStateMqtt,setZoomAcknowledgementData,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
