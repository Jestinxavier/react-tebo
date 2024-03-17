import React, { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "styled-components";
import Divider from "@mui/material/Divider";
import SocialButton from "../Component/Homepage/SocialButton";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas";
import {
  IconButton,
  InputAdornment,
  Box,
  Stack,
  Card,
  Container,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../Component/Logo/Logo";
import ProminentAppBar from "../Component/AppBar/ProminentAppBar";
import PersistentDrawerRight from "../Component/AppBar/PersistentDrawerRight";
import { mockData } from "../Constant/MockData";
import Iconify from "../Component/MUI/iconify/Iconify";
import { getRobot,getSharedRobotList, getZoomCredentials, updateOnlineStatus, updateSharedRobotList } from "../redux/slices/robot";
import { useDispatch, useSelector } from "../redux/store";
import { SocketContext } from "../Context/SocketContext";
import { useDrawerContext } from "../Context/DrawerContext";
import { useAuthContext } from "../auth/useAuthContext";
import NoRobotCard from '../Component/Homepage/NoRobotCard'
import { ADMIN } from "../config-global";
// import {
//   CarouselBasic1,
//   CarouselBasic2,
//   CarouselBasic3,
//   CarouselBasic4,
//   CarouselAnimation,
//   CarouselThumbnail,
//   CarouselCenterMode,
// } from '../../../sections/_examples/extra/carousel';
import {
  CarouselCenterMode,
  CarouselTeboMode,
  CarouselBasic3,
} from "../Component/MUI/sections/_examples/extra/carousel";
import SleekCarousel from "../Component/Carousel/SleekCarousel";
import TopAppBar from "../Component/AppBar/TopAppBar";
import TransitionsDialogs from "../Component/Modal/TransitionsDialogs";
import { Heading } from "../Component/CustomComponent";



function Home() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
  } = useDrawerContext();

const {setCallerId,socket } = useContext(SocketContext);
  const [Form, setForm] = useState([]);
  const [robotList, setRobotList] = useState(null);
  const [shareRobotList, setShareRobotList] = useState(null)
  const { user } = useAuthContext();

  const Robots = useSelector((state) => state?.robot?.robots);
  const sharedRobots = useSelector((state) => state?.robot?.sharedRobot)


  const { sendMessage,addUserId } = useContext(SocketContext);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(open, "open");
  // }, [open]);

  const formFieldValue = (name, value) => {
    let data = {};
    data[name] = value;
    setForm((pre) => {
      return { ...pre, ...data };
    });
  };

  useEffect(() => {
    // const concatArray = robotList.concat(Robots);
    setRobotList(Robots);
    
  }, [Robots]);



  useEffect(() => {
    setShareRobotList(sharedRobots)
    // console.log(sharedRobots,"sharedRobots");
  }, [sharedRobots])
  

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(getRobot());
    dispatch(getSharedRobotList());
    dispatch(getZoomCredentials());
   
    sendMessage("testing from Tebo");
  }, []);

  useEffect(() => {
    socket.on("liveStatus", (onlineRes) => {
      const result = robotList?.map((data) => {
        if (onlineRes.TeboUserId == data.robot.uuid) {
          return { ...data, liveStatus: onlineRes.status };
        }
        return data;
      });

      const sharedRobotResult = sharedRobots?.map((data) => {
        if (onlineRes.TeboUserId == data.robot.uuid) {
          return { ...data, liveStatus: onlineRes.status };
        }
        return data;
        });
      dispatch(updateOnlineStatus(result))
      dispatch(updateSharedRobotList(sharedRobotResult))
  });

  }, [socket,robotList,sharedRobots])
  

  useEffect(() => {
    // addUserId(user?.random_id);
    setCallerId(user?.random_id);
  }, [user])
  

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        action.resetForm();
      },
    });

  return (
<>
   {ADMIN?<Stack
   pt={10}
      px={3}
      sx={{
        // height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundPosition: "initial",
      }}
    >
      <Typography component="h3" variant="h3">Admin Dashboard</Typography>
      <Typography>An administrator's role is not just about managing systems and processes; it's about enabling and empowering the collective potential of a team to achieve extraordinary results.</Typography>
      <PersistentDrawerRight
          open={open}
          setOpen={setOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          setModalOpen={setModalOpen}
        />
    </Stack> :
    
    <Stack
      pt={10}
      sx={{
        // height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // backgroundPosition: "center",
        backgroundPosition: "initial",
      }}
    >
      {/* <Box sx={{ display: "flex" }}>
        <TopAppBar
          open={open}
          setOpen={setOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
      </Box> */}

      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={2}
      >
        <Box sx={{marginTop:{md:1,xs:1},marginRight:{xs:3}} } >
          <Button
            variant="outlined"
            color="error"
            startIcon={<Iconify icon="gala:add" />}
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Tebo
          </Button>
        </Box>
      </Stack>
      <Box mx={5}>
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12} md={12}>
          <Heading>My Robots</Heading>
         
          {robotList?.length>0? <CarouselTeboMode mockData={robotList} />:
           <NoRobotCard 
           image ="/images/Tebo.gif"
           Heading = "No Tebo Found"
           description ="No robot currently assigned to your email address"
            />}
          </Grid>

          <Grid item sm={12} xs={12} md={12}>
          <Heading>Shared Robots</Heading>
          
          {shareRobotList? <CarouselTeboMode mockData={shareRobotList} sharedRobot />:

            <NoRobotCard 
           image ="/images/sharerobot.gif"
           Heading = "Share Tebo Not found"
           description ="Nobody is currently sharing Tebo with you."
            />}
          </Grid>
        </Grid>

        <PersistentDrawerRight
          open={open}
          setOpen={setOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          setModalOpen={setModalOpen}
        />

        <Box>
          {/* <LogoImage src="./images/logo.png" alt="Image description" /> */}
          {/* <Logo /> */}
          {/* <SleekCarousel /> */}
        </Box>
      </Box>
      <TransitionsDialogs modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </Stack>}
    </>
  );
}

export default Home;
