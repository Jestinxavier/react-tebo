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
import { getRobot,getSharedRobotList } from "../redux/slices/robot";
import { useDispatch, useSelector } from "../redux/store";
import { SocketContext } from "../Context/SocketContext";
import { useDrawerContext } from "../Context/DrawerContext";
import { useAuthContext } from "../auth/useAuthContext";
import NoRobotCard from '../Component/Homepage/NoRobotCard'

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

const Item = styled("box")(({ theme }) => ({
  backgroundColor: "#ff000000",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const nda = [
  {
    description:
      "Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    image:
      "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_1.jpg",
    title: "Apply These 7 Secret Techniques To Improve Event",
  },
  {
    description:
      "Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    image:
      "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_1.jpg",
    title: "Apply These 7 Secret Techniques To Improve Event",
  },
  {
    description:
      "Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    image:
      "https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_1.jpg",
    title: "Apply These 7 Secret Techniques To Improve Event",
  },
];

const CustomTextField = styled(TextField)(() => ({
  borderRadius: "15px",
  marginTop: 0,
  "& fieldset": {
    borderRadius: "15px",
  },
  "& input": {
    borderRadius: "15px !important",
    height: "12px",
  },
}));

function Home() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
  } = useDrawerContext();

  const theme = useTheme();
  const [Form, setForm] = useState([]);
  const [robotList, setRobotList] = useState(mockData);
  const [shareRobotList, setShareRobotList] = useState(null)
  const { user } = useAuthContext();

  const Robots = useSelector((state) => state?.robot?.robots?.robots);
  const sharedRobots = useSelector((state) => state?.robot?.sharedRobot?.robots)


  const { sendMessage,addUserId } = useContext(SocketContext);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(open, "open");
  }, [open]);

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
    console.log(sharedRobots,"sharedRobots");
  }, [sharedRobots])
  

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(getRobot());
    dispatch(getSharedRobotList());
    addUserId(user?.random_id)
    sendMessage("testing from Tebo");
  }, []);

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
        <Box m={5}>
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
           
          {robotList? <CarouselTeboMode mockData={robotList} />:
           <NoRobotCard 
           image ="/images/Tebo.gif"
           Heading = "No Tebo Found"
           description ="No robot currently assigned to your email address"
            />}
          </Grid>

          <Grid item sm={12} xs={12} md={12}>
          <Heading>Shared Robots</Heading>
          
          {shareRobotList? <CarouselTeboMode mockData={shareRobotList} />:

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
    </Stack>
  );
}

export default Home;
