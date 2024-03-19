import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Typography,
  Grid,
  Box,
  Container,
  Stack,
} from "@mui/material/";
import { useTheme, styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import Dialog from "@mui/material/Dialog";
import Image from "mui-image";
import BatteryLevel from "../Battery/BatteryLevel";
import { GoogleMap } from "../Google";
// import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../auth/useAuthContext";
import { getRobot } from "../../redux/slices/robot";
import { useDispatch } from "../../redux/store";
import { useSelector } from "../../redux/store";
import { SocketContext } from "../../Context/SocketContext";
import { useSnackbar } from '../MUI/snackbar';



const ContentBox = styled(Box)(({ theme }) => ({
  marginTop: 10,
  marginBottom: 10,
  display: "flex",
}));

const ColorButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px !important",
  padding: "8px 20px !important",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.blueGray[900],
  "&:hover": {
    backgroundColor: theme.palette.blueGray[900],
  },
}));

const SupportButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px !important",
  padding: "8px 20px !important",
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function ScrollDialog({ model, setModel, data, sharedRobot }) {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const theme = useTheme();
const {enqueueSnackbar} = useSnackbar()
  const { user } = useAuthContext();
  const { processCall, addUserId, callUser } = useContext(SocketContext);
  const searchParams = new URLSearchParams();
  const dispatch = useDispatch();
  const searchGetParms = new URLSearchParams(location.search);
  const zoomCredentials = localStorage.getItem('zoomCredentials');
  
  useEffect(() => {
    const userUUID = searchGetParms.get("robot-Id");

    if (userUUID) {
      dispatch(getRobot(data.id));
    }
  }, []);

  const navigate = useNavigate();
  // const handleClickOpen = (scrollType) => () => {
  //   setOpen(true);
  //   setScroll(scrollType);
  // };
  useEffect(() => {
    if (model) {
      setOpen(true);
    }
    if (!open) {
      setModel(false);
    }
  }, [model, open, setModel]);

  const handleClose = () => {
    setOpen(false);
  };
  const connectRobot = async (myid, toId) => {
   if(!zoomCredentials){
    enqueueSnackbar('Video credentials is not added to your tebo.',{variant:'error'});

    return 
   }
 

    searchParams.set("sharedRobot", false);
    
    if (sharedRobot) {
      searchParams.set("sharedRobot", true);
    }
    searchParams.set("myid", myid);
    searchParams.set("toId", toId);
    // addUserId(myid)

    try {
      const data = await addUserId(myid,toId);
  
  
      if (data?.error) {
      enqueueSnackbar('You cannot connect to Tebo right now, another person is currently using Tebo.',{variant:'error'});
      } else {
        // Uncomment the following lines if you want to perform additional actions on success
        callUser(toId);
        navigate(`/conference-room?${searchParams.toString()}`);
        processCall();
      }
    } catch (error) {
      console.error({ error: "Error:", error });
    }
  };


  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        sx={{ overflow: "hidden" }}
      >
        <Box sx={{ p: "30px" }}>
          <ContentBox>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
              spacing={2}
            >
              <Icon
                height={30}
                icon="majesticons:close"
                sx={{ cursor: "pointer" }}
                onClick={handleClose}
              />
            </Stack>
          </ContentBox>

          {/* <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle> */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              

              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Image
                  // src={data?.botImage}
                  src="/images/robot.gif"
                  width={200}
                  height={300}
                  fit={"cover"}
                  alignItems="flex-end"
                  sx={{ pb: "5px" }}
                  duration={0}
                />

                <ColorButton
                  onClick={() => {
                    connectRobot(user?.random_id, data?.robot?.uuid);
                    // processCall()
                  }}
                  startIcon={<Icon icon="grommet-icons:connect" />}
                >
                  CONNECT
                </ColorButton>
              </Stack>
            </Grid>
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "space-around" }}
              item
              xs={12}
              md={6}
            >
              <Stack direction="column" justifyContent="center" spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="space-between"
                  spacing={2}
                >
                  <Typography>Name:</Typography>
                  <Typography sx={{ fontWeight: "bolder", mr: 1 }}>
                    {data?.nickname}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.secondary.light,
                      fontWeight: "bolder",
                      marginLeft: "1px !important",
                    }}
                  >
                    (ID {data?.id})
                  </Typography>
                </Stack>

              

                <ContentBox>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  ></Stack>

                  <Stack
                    direction="row"
                    // justifyContent="space-between"
                    // alignItems="center"
                    spacing={2}
                  >
                    <Typography>Registered User:</Typography>
                    <Typography sx={{ fontWeight: "bolder" }}>
                      {user?.name}
                    </Typography>
                  </Stack>
                </ContentBox>

                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={2}
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Shared With:
                  </Typography>
                </Stack>

                <Stack
                  direction="column"
                  // justifyContent="space-between"
                  // alignItems="center"
                  spacing={2}
                >
                  {data?.robot?.sharing_with?.length > 0 && (
                    <Grid
                      container
                      sx={{
                        border: "1px dashed #d5d5d5",
                        borderRadius: "10px",
                        padding: "4px",
                      }}
                    >
                      {data?.robot?.sharing_with.map((shareData, index) => (
                        <Grid xs={4} md={4}>
                          <Typography
                            variant="caption"
                            key={index}
                            sx={{ fontWeight: "bolder" }}
                          >
                            {shareData?.sharing_owner?.name}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ height: 250 }}>
                <GoogleMap
                  longitude={data?.longitude}
                  latitude={data?.latitude}
                />
              </Box>
              <ContentBox>
                <Typography variant="caption">
                  Tebo bridge the gap between distances, enabling us to explore,
                  connect, and interact with the world in ways we never thought
                  possible, truly bringing people and places closer together.
                </Typography>
              </ContentBox>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Box>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        display: "flex",
                        paddingTop: "5px",
                        alignItems: "center",
                      }}
                    >
                      Battery Level
                    </Typography>
                 
                    <BatteryLevel
                      color={theme.palette.green[100]}
                      // battery_charge
                      BatteryPercentageLevel={data?.robot?.battery_charge || 73}
                    />
                    <Typography variant="caption">
                      {data?.robot?.battery_charge || 73}%
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <SupportButton
                    startIcon={<Icon icon="radix-icons:question-mark" />}
                    onClick={() => {
                      navigate("/support");
                    }}
                  >
                    Support
                  </SupportButton>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
