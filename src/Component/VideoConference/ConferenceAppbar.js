import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerRight from "../Drawer/DrawerRight";
import { useTheme } from "@mui/material/styles";

import Image from "mui-image";
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#e7e7e700 !important",
 boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(0 0 0 / 0%) !important',
}));
export default function ConferenceAppBar({ AppBarHeight }) {
  const [OpenMenu, setOpenMenu] = React.useState(false);
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "absolute",
        width: "100%",
        zIndex: 99,
        minHeight: AppBarHeight,
      }}
    >
      <CustomAppBar position="static">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%"
            className="cobra333"
          >
            <Image src="/images/PureLogo.png" width={50} />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2,color:theme.palette.secondary.contrastText }}
              onClick={() => setOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
        <DrawerRight
        OpenMenu={OpenMenu}  
        setOpenMenu ={setOpenMenu}
        />
      </CustomAppBar>
    </Box>
  );
}
