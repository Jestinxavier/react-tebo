import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, useTheme, IconButton,Stack } from "@mui/material";
import { Icon } from "@iconify/react";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  TILT_CONTROLLER,
  APP_BAR_HEIGHT,
  ICON_WRAPPER_SIZE,
  ICON_SIZE,
  CONTROLLER_ICON_SIZE,
  CONTROLLER_ICON_WRAPPER_SIZE,
  CONTROLLER_ICON_BORDER_RADIUS,
} from "../../Constant/defaultValue";

export default function BottomDrawer({ children }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const theme = useTheme();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Stack>
            <IconButton
              className="fullscreen"
              
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
                marginTop: 30,
                // marginBottom: 50,
              }}
            >
              <Icon
                icon="material-symbols:missing-controller"
                width={CONTROLLER_ICON_SIZE}
                color={theme.palette.primary.contrastText}
                onClick={toggleDrawer(anchor, true)}
              />
            </IconButton>
          </Stack>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {children}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
