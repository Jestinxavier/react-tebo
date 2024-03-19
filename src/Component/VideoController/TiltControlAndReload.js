import React, { useContext, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
// import ConferenceAppBar from "../Component/VideoConference/ConferenceAppbar";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import { SocketContext } from "../../Context/SocketContext";

import {
  IconButton,
  Stack,
} from "@mui/material";
// import { TILT_CONTROLLER } from "../../Constant/defaultValue";
import {
  TILT_CONTROLLER,
  CONTROLLER_ICON_SIZE,
  CONTROLLER_ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_BORDER_RADIUS,
} from "../../Constant/defaultValue";
import TiltController from "../VideoConference/TiltController";
import { useSelector } from "../../redux/store";

function TiltControlAndReload({ setControls, controls }) {
  const theme = useTheme();
  const {zoomUserData, toIdUUID} = useSelector((state) => state?.robot?.zoomCredentials);
  const zoomCredentials = useSelector((state) => state?.robot?.zoomSdkCredentials)

  const { sentZoomCredentials } = useContext(SocketContext);
  const reconnectButton = useRef(null);

  
  const reConnectStream = ()=>{
  let zoomData = {zoomUserData, toIdUUID,zoomCredentials}

    // console.log("reConnectStream",{zoomData, toIdUUID});
    sentZoomCredentials(zoomData, toIdUUID)
  }
  return (
    <div>
      <div
      // style={{ position: "absolute",
      // bottom: 0 }}
      >
        <div style={{ marginLeft: 80, width: "100%" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
              spacing={2}
            >
              <TiltController TiltController={TILT_CONTROLLER} />
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="baseline"
                spacing={2}
              >
                <IconButton
                  className="reconnect"
                  ref={reconnectButton}
                  style={{
                    border: "1px solid gray",
                    borderColor: theme.palette.blueGray[900],
                    borderRadius: CONTROLLER_ICON_BORDER_RADIUS,
                    background: theme.palette.blueGray[900],
                    width: CONTROLLER_ICON_WRAPPER_SIZE,
                    height: CONTROLLER_ICON_WRAPPER_SIZE,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 30,
                    marginBottom: 50,
                  }}
                  onClick={() => {
                    reConnectStream();
                  }}
                >
                  <Icon
                    icon="pajamas:retry"
                    width={CONTROLLER_ICON_SIZE}
                    color={theme.palette.primary.contrastText}
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default TiltControlAndReload;
