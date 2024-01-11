import * as React from "react";
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
import { Button, Card, Grid } from "@mui/material";
// import AdSense from "react-adsense";
// import { Adsense } from "@ctrl/react-adsense";
import ProductSlider from "./ProductSlider";
import { mockData } from "../../Constant/MockData";
import { Stack } from "@mui/system";
import { AdsComponents } from "../Google";
import TopAppBar from "../../Component/AppBar/TopAppBar";
import DrawerRight from '../../Component/Drawer/DrawerRight';

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

const BottomIcon = [
  { iconname: "ph:chat-dots-fill" },
  { iconname: "ant-design:notification-filled" },
  { iconname: "material-symbols:mail" },
  { iconname: "mdi:cellphone-settings-variant" },
  { iconname: "material-symbols:ecg-heart" },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

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

// const ContentBox = styled(
//   Box)({ theme }) => ({
//     backgroundImage: "linear-gradient(49deg, #021421, #072a44,#082a43)",
//     borderRadius: "15px",
//     display: "flex",
//     flexDirection: "column",
//     boxShadow: "0px 3px 6px #bbb5b5b8",
//     justifyContent: "center",
//     alignItems: "center",
//   }))
// );

// const ContentBox = styled(Box)(({ theme }) => ({
//   backgroundImage: "linear-gradient(49deg, #021421, #072a44,#082a43)",
//   borderRadius: "15px",
//   display: "flex",
//   flexDirection: "column",
//   boxShadow: "0px 3px 6px #bbb5b5b8",
//   justifyContent: "center",
//   alignItems: "center",
//   padding: "12px",
// }));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundImage: "linear-gradient(49deg, #021421, #072a44,#082a43)",
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0px 3px 6px #bbb5b5b8",
  justifyContent: "center",
  alignItems: "center",
  padding: "22px",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const CutomFlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
}));
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  color: theme.palette.secondary.contrastText,
  boxShadow: "0px 0px 0px",
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
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

const IconClass = styled(Icon)(({ theme }) => ({
  "& .iconify": {
    transition: "color 0.2s ease-in-out",
  },
  "&:hover .iconify": {
    color: "red",
  },
}));

const NavigationData = [
  {
    icon: "/images/icon-report.png",
    name: "ANALYTICS",
  },
  {
    icon: "/images/icon-robot.png",
    name: "ADD ROBOT",
  },
  {
    icon: "/images/icon-call.png",
    name: "LOGS",
  },
  {
    icon: "/images/icon-setting.png",
    name: "SETTINGS",
  },
  {
    icon: "/images/icon-suppot.png",
    name: "SUPPORT",
  },
  {
    icon: "/images/icon-profile.png",
    name: "PROFILE",
  },
];
export default function PersistentDrawerRight({
  open,
  setOpen,
  handleDrawerOpen,
  handleDrawerClose,
  setModalOpen
}) {

  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }} className="">
      <CssBaseline />

      {/*------------------------------- app bar-------------------- */}
    
      <TopAppBar
        open={open}
        setOpen={setOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      {/* --------------------------- drawer --------------------*/}

      <DrawerRight setModalOpen={setModalOpen} setOpenMenu={setOpen} OpenMenu={open} />

    </Box>
  );
}
