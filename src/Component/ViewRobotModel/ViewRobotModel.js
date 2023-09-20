import React, { useEffect,useState,useContext } from "react";
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
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "mui-image";
import BatteryLevel from "../Battery/BatteryLevel";
import { GoogleMap } from "../Google";
// import { useNavigate } from "react-router-dom";
import { useNavigate,useLocation} from "react-router-dom";
import { useAuthContext } from "../../auth/useAuthContext";
import {getRobot} from '../../redux/slices/robot';
import {useDispatch} from '../../redux/store';
import { useSelector } from "../../redux/store";
import { SocketContext } from "../../Context/SocketContext";


const ContentBox = styled(Box)(({ theme }) => ({
  marginTop: 10,
  marginBottom: 10,
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

export default function ScrollDialog({ model, setModel, data }) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [Id, setId] = useState("");
  const location = useLocation();
  const theme = useTheme();

  const { user } = useAuthContext();
  const {processCall, addUserId, callUser } = useContext(SocketContext);
  const searchParams = new URLSearchParams();
const dispatch = useDispatch()
  const searchGetParms = new URLSearchParams(location.search);
  const Robots = useSelector((state) =>state.robot?.robots?.singleRobot)

  

  useEffect(() => {
    const userUUID = searchGetParms.get("robot-Id");
    
    if(userUUID){
      dispatch(getRobot(data.id))
    }
  }, []);


  

  const navigate = useNavigate();
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  useEffect(() => {
    if (model) {
      setOpen(true);
      setScroll("paper");
    }
    if (!open) {
      setModel(false);
    }
  }, [model, open, setModel]);

  const handleClose = () => {
    setOpen(false);
  };

  const connectRobot = (myid, toId) => {
    searchParams.set("myid", myid);
    searchParams.set("toId", toId);

    addUserId(myid);
    callUser(toId)
    console.log(searchParams);
    navigate(`/conference-room?${searchParams.toString()}`);
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
        fullWidth={true}
        sx={{ overflow: "hidden" }}
        // scroll={scroll}
        // aria-labelledby="scroll-dialog-title"
        // aria-describedby="scroll-dialog-description"
      >
        {/* <DialogContent style={{ overflow: "hidden" }}> */}
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
              {/* <Box
                component="img"
                src={data.botImage}
                sx={{
                  height: 333,
                  width: 400,
                  maxHeight: { xs: 233, md: 443 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              /> */}

              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Image
                  // src={data?.botImage}
                  src="/images/robot.png"
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
                    processCall()
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
                <ContentBox>
                  <Typography>Name</Typography>
                  
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="space-between"
                    spacing={2}
                  >
                    <Stack
                      direction="row"
                      // justifyContent="space-between"
                      // alignItems="center"
                      spacing={2}
                    >
                      <Typography sx={{ fontWeight: "bolder", mr: 1 }}>
                        {data?.nickname}
                      </Typography>
                      ({" "}
                      <Typography
                        sx={{
                          color: theme.palette.secondary.light,
                          fontWeight: "bolder",
                          marginLeft: "0px !important",
                        }}
                      >
                        ID {data?.id}
                      </Typography>
                      )
                    </Stack>
                  </Stack>
                </ContentBox>

                <ContentBox>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography>Support</Typography>
                    <Typography sx={{ ml: "10px !important" }}>
                      1 Year Support
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    // justifyContent="space-between"
                    // alignItems="center"
                    spacing={2}
                  >
                    <Typography variant="caption">
                      Ends on: 12 December 2023
                    </Typography>
                  </Stack>
                </ContentBox>

                <ContentBox>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography>Registered User</Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    // justifyContent="space-between"
                    // alignItems="center"
                    spacing={2}
                  >
                    <Typography sx={{ fontWeight: "bolder" }}>
                      {user?.name}
                    </Typography>
                  </Stack>
                </ContentBox>

                <ContentBox>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    <Typography>Shared With</Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    // justifyContent="space-between"
                    // alignItems="center"
                    spacing={2}
                  >
                 { data?.robot?.sharing_with.map((shareData,index)=><Typography key={index} sx={{ fontWeight: "bolder" }}>
                 {shareData?.sharing_owner?.name}
                  </Typography>)}
                  </Stack>
                </ContentBox>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ height: 150 }}>
                <GoogleMap longitude={data?.longitude} latitude={data?.longitude}/>
              </Box>
              <ContentBox>
                <Typography variant="caption">
                Tebo bridge the gap between distances, enabling us to explore, connect, and interact with the world in ways we never thought possible, truly bringing people and places closer together.
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
                      BatteryPercentageLevel={data?.percentage || 73}
                    />
                    <Typography variant="caption">
                      {data?.percentage || 73}%
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <SupportButton
                    startIcon={<Icon icon="radix-icons:question-mark" />}
                  >
                    Support
                  </SupportButton>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        {/* </DialogContent> */}
      </Dialog>
    </div>
  );
}
