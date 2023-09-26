import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// const socket = io("http://192.168.60.234:5000");

// const socket = io("https://tebo.devlacus.com/");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState(null);
  const [screenShareStream, setScreenShareStream] = useState(null); // New state for screen sharing stream
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [PageTrigger, setPageTrigger] = useState(false);
  const [me, setMe] = useState("");
  const [socket, setSocket] = useState(null);
  const [callerId, setCallerId] = useState(null);

  const [localStream, setlocalStream] = useState(null);
  const localRef = useRef();
  const remoteRef = useRef();
  const [remoteStream, setRemoteStream] = useState(null);
  const [type, setType] = useState("JOIN");
  const [localMicOn, setlocalMicOn] = useState(true);
  const [localWebcamOn, setlocalWebcamOn] = useState(true);
  const [first, setfirst] = useState(false);
  const otherUserId = useRef(null);

  const [obstacle, setObstacle] = useState(false);
  const [mapState, setMapState] = useState(null);

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
        // {
        //   urls: "stun:stun1.l.google.com:19302",
        // },
        // {
        //   urls: "stun:stun2.l.google.com:19302",
        // },
        // { urls: "stun:stun.services.mozilla.com" },
        // { urls: "stun:stun3.l.google.com:19302" },
        // { urls: "stun:stun4.l.google.com:19302" },
        { urls: "stun:stun.ekiga.net" },
        {urls: 'turn:172.31.83.246:3478?transport=tcp', credential: 'user', username: 'root'}
      ],
    })
  );

  useEffect(() => {
    if (callerId) {
      console.log("====================================");

      console.log(callerId, "callerId,");
      console.log("====================================");
      // "https://tebo.devlacus.com"
      const socketInstance = io(
        // "http://localhost:5000",
        "https://tebo.devlacus.com",
        {
          // transports: ["websocket"],
          query: {
            callerId,
          },
        }
      );
      setSocket(socketInstance);
    }
  }, [callerId]);

  useEffect(() => {
    console.log(remoteStream, "remoteStream");
  }, [remoteStream]);

  async function processAccept() {
    peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(remoteRTCMessage.current)
    );
    const sessionDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(sessionDescription);
    answerCall({
      callerId: otherUserId.current,
      rtcMessage: sessionDescription,
    });
  }

  let remoteRTCMessage = useRef(null);

  useEffect(() => {
    let currentStreamCopy = null;
    if (PageTrigger && socket && otherUserId) {
      socket?.on("newCall", (data) => {
        console.log(data, "newCall");
        remoteRTCMessage.current = data.rtcMessage;
        otherUserId.current = data.callerId;
        setType("INCOMING_CALL");
      });

      socket?.on("callAnswered", (data) => {
        console.log("callAnswered", data);
        remoteRTCMessage.current = data.rtcMessage;
        console.log(peerConnection, "peerConnection");
        peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(remoteRTCMessage.current)
        );
        setType("WEBRTC_ROOM");
      });
      socket.on("call-state", (data) => {
        console.log(data, "call-state");
      });

      socket?.on("ICEcandidate", (data) => {
        let message = data.rtcMessage;

        if (peerConnection.current) {
          peerConnection?.current
            .addIceCandidate(
              new RTCIceCandidate({
                candidate: message.candidate,
                sdpMid: message.id,
                sdpMLineIndex: message.label,
              })
            )
            .then((data) => {
              console.log("SUCCESS");
            })
            .catch((err) => {
              console.log("Error", err);
            });
        }
      });

      let isFront = false;
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              // minWidth: 500, // Provide your own width, height and frame rate here
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
          console.log(stream.getTracks(), "Got stream!");

          setlocalStream(stream);
          currentStreamCopy = stream;
          stream.getTracks().map((track) => {
            peerConnection.current.addTrack(track, stream);
          });
        })
        .catch((error) => {
          console.log(error.message);
        });

      peerConnection.current.onaddstream = (event) => {
        console.log(event, "onaddStream****");
        console.log("onaddstream", event.stream);
        setRemoteStream(event.stream);
      };

      socket?.on("obstacleDetected", (data) => {
        console.log(data, "obstacleDetected***");

        if (data == "1") {
          setObstacle(true);
        } else {
          console.log(data, "obstacleDetected***");

          setObstacle(false);
        }
      });

      socket?.on("mapState", (data) => {
        setMapState(data);
      });

      // peerConnection.current.addEventListener("addstream", (ev) => setRemoteStream(ev.stream), false);

      // Setup ice handling
      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          sendICEcandidate({
            calleeId: otherUserId.current,
            rtcMessage: {
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate,
            },
          });
        } else {
          console.log("End of candidates.");
        }
      };
    }

    return () => {
      socket?.off("newCall");
      socket?.off("callAnswered");
      socket?.off("ICEcandidate");
      currentStreamCopy?.getTracks().forEach((track) => track.stop());
    };
  }, [PageTrigger, socket]);

  async function processCall() {
    const sessionDescription = await peerConnection.current.createOffer();
    console.log("👺", sessionDescription);

    await peerConnection.current.setLocalDescription(sessionDescription);
    console.log("otherUserId.current", sessionDescription, peerConnection);
    // setTimeout(() => {
    console.log("otherUserId.current", otherUserId.current);
    sendCall({
      calleeId: otherUserId.current,
      // calleeId: 'TEBO-GOKUL-NOKIA-TABLET',
      rtcMessage: sessionDescription,
    });
    // }, 5000);
    setfirst(true);
  }
  function sendICEcandidate(data) {
    socket?.emit("ICEcandidate", data);
  }

  function answerCall(data) {
    socket?.emit("answerCall", data);
  }

  function startMapping() {
    console.log("sdsdsd");
    socket?.emit("start-mapping", { id: otherUserId.current });
  }

  function stopMapping() {
    socket?.emit("stopMapping", { id: otherUserId.current });
  }

  function deleteMap() {
    socket?.emit("deleteMap", { id: otherUserId.current });
  }

  function sendCall(data) {
    // console.log(data,socket,'sending call')
    console.log();

    socket?.emit("start-call", { id: data.calleeId });

    socket?.emit("start-meeting", { id: data.calleeId });
    socket?.emit("call", data);
  }

  const addUserId = (userId) => {
    setCallerId(userId);
    socket?.emit("setMapUser", {
      from: userId,
      toId: otherUserId.current,
    });
    socket?.emit("sentUserId", userId);
  };

  const callUser = async (id) => {
    otherUserId.current = id;
  };

  function switchCamera() {
    localStream.getVideoTracks().forEach((track) => {
      track._switchCamera();
    });
  }

  function toggleCamera() {
    localWebcamOn ? setlocalWebcamOn(false) : setlocalWebcamOn(true);
    localStream.getVideoTracks().forEach((track) => {
      localWebcamOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  function toggleMic() {
    localMicOn ? setlocalMicOn(false) : setlocalMicOn(true);
    localStream.getAudioTracks().forEach((track) => {
      localMicOn ? (track.enabled = false) : (track.enabled = true);
    });
  }

  function leave() {
    socket?.emit("meeting-ended", { id: otherUserId.current });
    peerConnection.current.close();
    setlocalStream(null);
    stream.getTracks().forEach((track) => {
      track.stop();
    });
    setType("JOIN");
  }

  // =============================

  // useEffect(() => {
  //   const videoRendering = () => {
  //     if (PageTrigger) {
  //       navigator.mediaDevices
  //         .getUserMedia({
  //           video: {
  //             width: { ideal: 3840 },
  //             height: { ideal: 2160 },
  //             frameRate: { ideal: 60 },
  //             facingMode: "user",
  //           },
  //           audio: true,
  //         })
  //         .then((currentStream) => {
  //           setStream(currentStream);
  //           // myVideo.current.srcObject = currentStream;
  //         })
  //         .catch((error) => {
  //           console.error("Error accessing media devices:", error);
  //           alert(error.message);
  //         });

  //       // socket?.on("me", (id) => {
  //       //   setMe(id);
  //       // });

  //       socket?.on("callUser", ({ from, name: callerName, signal }) => {
  //         setCall({ isReceivingCall: true, from, name: callerName, signal });
  //       });
  //     }
  //   };
  //   // setTimeout(() => {
  //   //   videRendering();
  //   // }, 5000);
  //   videoRendering();
  // }, [PageTrigger]);

  useEffect(() => {
    socket?.on("me", (id) => {
      setMe(id);
    });
    console.log(socket?.id, "😶‍🌫️", socket);
  }, [socket]);

  useEffect(() => {
    socket?.on("mqttMessageReceived", (payload) => {
      console.log("Received new MQTT message on the frontend:", payload);
    });

    // socket?.on("mqttMessageReceived", (payload) => {
    //   console.log("Received new MQTT message on the frontend:", payload);

    // });
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

  const stopScreenSharing = () => {
    if (screenShareStream) {
      screenShareStream.getTracks().forEach((track) => track.stop());
      setIsScreenSharing(false);

      // Restore the original video stream
      // myVideo.current.srcObject = stream;
    }
  };

  // const answerCall = () => {
  //   setCallAccepted(true);

  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //     config: {
  //       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],

  //       sdpTransform: (sdp) => {
  //         sdp = sdp.replace(
  //           /a=mid:video\r\n/g,
  //           "a=mid:video\r\nb=AS:56000\r\n"
  //         ); // Adjust maxBitrate to 56000 kbps (56 Mbps)
  //         return sdp;
  //       },
  //     },
  //   });

  //   peer.on("signal", (data) => {
  //     console.log('==================={ signal: data, to: call.from }=================');
  //     console.log({ signal: data, to: call.from });
  //     console.log('====================================');
  //     socket?.emit("answerCall", { signal: data, to: call.from });
  //   });

  //   peer.on("stream", (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // };

  // const answerCall = () => {
  //   setCallAccepted(true);

  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //     config: {
  //       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  //       sdpTransform: (sdp) => {
  //         sdp = sdp.replace(
  //           /a=mid:video\r\n/g,
  //           "a=mid:video\r\nb=AS:56000\r\n"
  //         ); // Adjust maxBitrate to 56000 kbps (56 Mbps)
  //         return sdp;
  //       },
  //     },
  //   });

  //   peer.on("signal", (data) => {
  //     console.log("Answering call and emitting signal:", data);
  //     socket?.emit("answerCall", { signal: data, to: call.from });
  //   });

  //   peer.on("stream", (currentStream) => {
  //     userVideo.current.srcObject = currentStream;
  //   });

  //   // Log events for debugging
  //   peer.on("connect", () => {
  //     console.log("Peer connection established.");
  //   });

  //   peer.on("data", (data) => {
  //     console.log("Received data from peer:", data);
  //   });

  //   peer.on("error", (error) => {
  //     console.error("Peer connection error:", error);
  //   });

  //   peer.signal(call.signal);

  //   connectionRef.current = peer;
  // };

  // const callUser = async (id) => {
  //   try {
  //     socket?.emit("getSocketId", id);

  //     const userSocketId = await new Promise((resolve) => {
  //       socket?.on("getSocketId", (socketId) => {
  //         // socketId = socketIdFromBackent;
  //         resolve(socketId);
  //       });
  //     });

  //     const peer = new Peer({
  //       initiator: true,
  //       trickle: false,
  //       stream,
  //       config: {
  //         iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  //         sdpTransform: (sdp) => {
  //           sdp = sdp.replace(
  //             /a=mid:video\r\n/g,
  //             "a=mid:video\r\nb=AS:56000\r\n"
  //           ); // Adjust maxBitrate to 56000 kbps (56 Mbps)
  //           return sdp;
  //         },
  //       },
  //     });
  //     console.log(peer, "SocketIdFromBackend", userSocketId);

  //     peer.on("signal", (data) => {
  //       socket?.emit("callUser", {
  //         userToCall: userSocketId,
  //         signalData: data,
  //         from: me,
  //         name,
  //       });
  //     });

  //     peer.on("stream", (currentStream) => {
  //       userVideo.current.srcObject = currentStream;
  //     });

  //     socket?.on("callAccepted", (signal) => {
  //       setCallAccepted(true);

  //       peer.signal(signal);
  //     });

  //     connectionRef.current = peer;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const disconnectUser = (userId) => {
    socket?.emit("disconnect-user", userId);
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket?.emit("meeting-ended", { id: otherUserId.current });
    stream?.getTracks().forEach((track) => track.stop());

    if (connectionRef.current) {
      console.log("===================connectionRef.current=================");
      console.log(connectionRef.current);
      console.log("====================================");
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
    console.log("::::");
  };

  const setMqttRequestToServer = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    socket?.emit("move-manual", mqttData);
  };

  const setMqttRequestForTilting = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    console.log(mqttData);
    socket?.emit("tilt-camera", mqttData);
  };

  const setMqttRequestForGotoHome = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    console.log(mqttData);
    socket?.emit("goto-home", mqttData);
  };

  const setMqttRequestForGotoDock = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    console.log(mqttData);
    socket?.emit("goto-Dock", mqttData);
  };

  const setMqttRequestForMeetingEnd = (data, Id) => {
    let mqttData = {
      data,
      Id,
    };

    console.log(mqttData);
    socket?.emit("meeting-end", mqttData);
  };

  return (
    <SocketContext.Provider
      value={{
        obstacle,
        call,
        callAccepted,
        myVideo,
        localRef,
        remoteRef,
        otherUserId,
        localStream,
        remoteStream,
        setType,
        processCall,
        switchCamera,
        toggleMic,
        toggleCamera,
        leave,
        setMqttRequestForTilting,
        setMqttRequestForGotoHome,
        setMqttRequestForGotoDock,
        setMqttRequestForMeetingEnd,
        userVideo,
        stream,
        name,
        setName,
        setMqttRequestToServer,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        shareScreen,
        stopScreenSharing,
        isScreenSharing,
        PageTrigger,
        setPageTrigger,
        myId,
        addUserId,
        disconnectUser,
        sendMessage,
        startMapping,
        stopMapping,
        deleteMap,
        mapState,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
