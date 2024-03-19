import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import ConferenceAppBar from "../Component/VideoConference/ConferenceAppbar";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

// import { CopyToClipboard } from 'react-copy-to-clipboard';

// import { TiltController } from "../Component/VideoConference";
import VideoPlayer from "../Component/Backup/VideoPlayerForConference"; // Correct casing
import { SocketContext } from "../Context/SocketContext";

const APP_BAR_HEIGHT = 64;
const ICON_WRAPPER_SIZE = 80;
const ICON_SIZE = 50;
const CONTROLLER_ICON_SIZE = 30;
const CONTROLLER_ICON_WRAPPER_SIZE = 50;
const CONTROLLER_ICON_BORDER_RADIUS = 8;

function RobotVideoConferenceInterface() {
  const navigate = useNavigate();
  const [controls, setControls] = useState(false);
  const [launchPad, setLaunchPad] = useState(false);
  const [userId, setUserId] = useState("");

  const searchParams = new URLSearchParams();

  // const toIdUUID = searchParms.get('toId');
// Check orientation when the page loads

  const {
    myVideo,
    userVideo,
    leaveCall,
    disconnectUser,
  } = useContext(SocketContext);


  const DisConnectUser = () => {
    disconnectUser(userId);
  };

  useEffect(() => {
    navigate(`/RobotVideoConferenceInterface/?${searchParams.toString()}`);
    return () => {
      leaveCall();
      DisConnectUser();
    };
  }, []);


  return (
    <div>
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
      />
    </div>
  );
}

export default RobotVideoConferenceInterface;
