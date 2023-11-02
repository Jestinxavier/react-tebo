import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Icon } from "@iconify/react";
import Logo from "../Logo/Logo";
import AppBarLogo from "../Logo/AppBarLogo";
import Skeleton from '@mui/material/Skeleton';

import { Button, Card, Grid } from "@mui/material";
// import AdSense from "react-adsense";
// import { Adsense } from "@ctrl/react-adsense";
import ProductSlider from "./ProductSlider";
import { mockData } from "../../Constant/MockData";
import { Stack } from "@mui/system";
import { AdsComponents } from "../Google";
import { useAuthContext } from '../../auth/useAuthContext';
import { useNavigate } from "react-router-dom";
import CustomAvatar from "../MUI/custom-avatar/CustomAvatar";

import {IMAGE_PATH} from "../../config-global"
import iconify from "../iconify";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  console.log(theme, "theme,****123");
  return {
    iconifycolor: {
      "&:hover": {
        color: "red",
      },
      iconcolor: {
        "&:hover": {
          color: theme.palette.secondary.light,
        },
      },
    },
  };
});

const CutomFlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  justifyContent: "space-between",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  borderBottom: "1px solid",
  borderColor: theme.palette.primary.main,
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: "100%",
  },
  "@media (max-width: 780px)": {
    minHeight: 128,
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.secondary.contrastText,
  boxShadow: "0px 0px 0px",
}));
function TopAppBar({ open, setOpen, handleDrawerOpen, handleDrawerClose }) {
  const classes = useStyles();
  const theme = useTheme();
  const {user} = useAuthContext()
  const navigate = useNavigate()
console.log(user,"user");
  return (
    <div>
      <CssBaseline />

      <CustomAppBar position="fixed" open={open} className="777">
        <StyledToolbar>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            sx={{ color: theme.palette.secondary.contrastText }}
            onClick = {()=>{
              navigate('/home')
            }}
          >
            <AppBarLogo />
          </Stack>

          {/* <CutomFlexBox> */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
              <Card
              mx={5}
              onClick={() =>
                navigate('/home')
              }
              sx={{
                border: "1px solid #f7f6f6",
                display: "flex",
                justifyContent: "center",
                height: "45px",
                width: "45px",
                cursor: "pointer",
                mx: "3px",
                padding: "3px",
                alignItems: "center",
                borderRadius: "200px",
              }}
            >
              <Icon
                width="50%"
                height="50%"
                icon='line-md:home-md'
                // className={classes.iconcolor}
                // color={theme.palette.blueGray[900]}
              />
            </Card>
            <Box display={{ xs: "none", sm: "flex" }}>
              {/* <Box
                component="img"
                src="/images/Login_03.jpg"
                sx={{ height: "50px" }}
              /> */}



              <CustomAvatar
                alt="Tebo User profile Pic"
                src={IMAGE_PATH+user.image_path || "/images/Login_03.jpg"}
                sx={{ width: 50, height: 50 }}
              />

              <Box>
                <CutomFlexBox sx={{ ml: 2 }}>
                  <Typography
                    component="p"
                    variant="h6"
                    sx={{
                      fontSize: 12,
                      color: theme.palette.primary.light,
                      fontStyle: "italic",
                    }}
                  >
                    Welcome
                  </Typography>
                  {user? <Typography
                    component="h6"
                    variant="h6"
                    sx={{ ml: 1, fontSize: 12 }}
                  >  
                  {user?.name}
                  </Typography>:
                  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
                </CutomFlexBox>
                <Typography
                  sx={{
                    color: theme.palette.secondary.light,
                    ml: 2,
                    fontSize: 12,
                  }}
                >
                
                  Email : {user.email}
                </Typography>
              </Box>

            

              <IconButton size="large" aria-label="search" color="inherit">
                <Icon icon="bi:info-circle" />
              </IconButton>
            </Box>
            {!open ? (
              <IconButton
                size="large"
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              ""
            )}
          </Stack>
          {/* </CutomFlexBox> */}
        </StyledToolbar>
      </CustomAppBar>
    </div>
  );
}

export default TopAppBar;
