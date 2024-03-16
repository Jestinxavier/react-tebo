import React, { useContext, useState } from "react";
import ReactPlayer from "react-player";
// import ConferenceAppBar from "../Component/VideoConference/ConferenceAppbar";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import RobotController from "./RobotController";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { LongPressEventType, useLongPress } from "use-long-press";
import useArrowKeyHandlers from "../../hooks/useArrowKeyHandlers";
import { useLocation,useNavigate } from "react-router-dom";
import { SocketContext } from "../../Context/SocketContext";
import { Box } from "@mui/material";
import Iconify from "../../Component/MUI/iconify";
import {callEndedInfo} from "../../Api/callApi"
 import { muteFunctionality,leaveMeeting } from "../../redux/slices/robot";
import { dispatch } from "../../redux/store";

function VideoStreamControllerButtons({
  CONTROLLER_ICON_BORDER_RADIUS,
  CONTROLLER_ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_SIZE,
  callerApiId
}) {
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
    disconnectUser,
    setType,
    otherUserId,
    switchCamera,
    toggleCamera,
    leave,
    toggleMic,
  } = useContext(SocketContext);
  const [mute, setMute] = useState(false);
  const [gotoHome, setGotoHome] = useState(false)
  const [docking, setDocking] = useState(false)
  const theme = useTheme();
  const [muteButtonName, setMuteButtonName] = useState("ic:sharp-mic");
const location = useLocation();
const navigate = useNavigate()
const searchParms = new URLSearchParams(location.search);
const { setMqttRequestForGotoHome,setMqttRequestForGotoDock,setMqttRequestForMeetingEnd } = useContext(SocketContext);
const toIdUUID = searchParms.get("toId");
const MyId = searchParms.get("myid")


  const gotoHomeHandler = () => {
    

    if(gotoHome){
    setGotoHome(!gotoHome)
    setMqttRequestForGotoHome(!gotoHome,toIdUUID)

    }else{
      setGotoHome(!gotoHome)
      setMqttRequestForGotoHome(!gotoHome,toIdUUID)
    }

  };

  const muteMic = () => {
    console.log("mute");
  
    if (mute) {
      setMuteButtonName("ic:sharp-mic");
      // toggleMic()
// stream.muteAudio()
      dispatch(muteFunctionality());
      setMute(!mute);
    }else{
      setMuteButtonName("material-symbols:mic-off");
      setMute(!mute);
      dispatch(muteFunctionality());
      // stream.unmuteAudio()
      // toggleMic()
    }

  };

  const callControl = () => {
   
    
    setGotoHome(!gotoHome)
    // setMqttRequestForGotoHome(!gotoHome,toIdUUID)
    dispatch(leaveMeeting())
    setMqttRequestForMeetingEnd(!docking,toIdUUID,MyId)
    callEndedInfo(callerApiId)
    
    leaveCall().then(()=>{
      navigate("/")
    })
   
    leave() 
  };

  const Docking = () => {
    if(docking){
      setDocking(!docking)
      setMqttRequestForGotoDock(!docking,toIdUUID)
  
      }else{
        setDocking(!docking)
        setMqttRequestForGotoDock(!docking,toIdUUID)
      }
  };

  const switchCameraDevice = ()=>{
    switchCamera()
  }
  const cameraToggle = ()=>{
    toggleCamera()
  }


  const callControlingButtonGroups = [
    {
      name: "fluent:home-20-filled",
      funcationToCall: gotoHomeHandler,
      Color:theme.palette.primary.contrastText,
      classNameValue:"gohome",
    },
    // {
    //   name: "ri:parking-box-fill",
    //   funcationToCall: Docking,
    //   Color:theme.palette.primary.contrastText

    // },
    {
      name: "fluent:call-end-24-filled",
      funcationToCall: callControl,
      classNameValue:"endcall",
    color: 'red',

    },
    {
      name: muteButtonName,
      funcationToCall: muteMic,
      Color:theme.palette.primary.contrastText,
      classNameValue:"mutebutton",


    },
    
  ];
  return (
    <Box
      sx={{
        background: {md:"#0000004a",xs:"#000"},
        border: "1px solid #00000005",
        display: "flex",
        flex: 1,
        border: "1px solid black",
        borderRadius: {xs:0,md:50},
        padding: "10px",
        justifyContent: 'space-around'
       
      }}
    >
      {callControlingButtonGroups.map((data, index) => (
        <Box
          sx={{
            backgroundColor: data.color,
            borderRadius: '40px',
            padding: '9px',
            margin: '1px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={index}
          className={data?.classNameValue}
          onClick={() => {
            data?.funcationToCall();
          }}
          
        >
          <Iconify
            icon={data.name}
            width={CONTROLLER_ICON_SIZE}
            color={theme.palette.primary.contrastText}
            height={30}
          />
        </Box>
      ))}
    </Box>
  );
}

export default VideoStreamControllerButtons;
