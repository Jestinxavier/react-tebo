import { forwardRef, useState, useEffect, useCallback, useRef } from "react";
// @mui
import {
  Slide,
  Box,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  TextField,
  Container,
} from "@mui/material";
import { HorizontalTimeline } from "../TimeLine";
import FormProvider, { RHFTextField } from "../MUI/hook-form";
import { useSnackbar } from "../../Component/MUI/snackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addRobot } from "../../Api/addBot";
import Loader from "../Loader/Loader";
import { getSingleRobot } from "../../redux/slices/robot";
import { useDispatch,useSelector } from "../../redux/store";


// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function TransitionsDialogs({ modalOpen, setModalOpen }) {
  const [open, setOpen] = useState(false);
  const [timelineStatus, setTimelineStatus] = useState(false);
  const dispatch = useDispatch();
  let Mountcomponent;
  const [status, setStatus] = useState({
    sentRequest: true,
    approval: true,
    userApproval: true,
    pending: false,
  });

  const [robotId, setrobotId] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleRobot())
  }, [])


  
  const defaultValues = {
    robot_uuid: "",
  };

  const VerifySchema = Yup.object().shape({
    robot_uuid: Yup.string()
      .required("uuid is required")
      .email("uuid must be a valid email address"),
  });
  const handleClickOpen = () => {
    setOpen(true);
    Mountcomponent = true;
  };

  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
    Mountcomponent = false;
  };

  useEffect(() => {
    if (modalOpen) {
      handleClickOpen();
    }
  }, [modalOpen]);

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  // const onSubmit = useCallback(async (data) => {
  //   try {
  //     try {
  //       enqueueSnackbar("Login successfully", { variant: "success" });
  //       navigate("/");
  //       reset();
  //     } catch (error) {
  //       enqueueSnackbar(error.message, { variant: "error" });
  //     }

  //     // ... (other code)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // const handleSubmmit = (data) => {
  //   let intervalId = null;
  //   let elapsedTime = 0;

  //   const addBotRepeatedly = () => {
  //     console.log(Mountcomponent, "elapsedTime");

  //     if (elapsedTime >= 180 || data?.data?.response || Mountcomponent) {
  //       // Stop after 3 minutes (180 seconds)
  //       clearInterval(intervalId);
  //       console.log("Stopped calling addRobot");
  //       return;
  //     }

  //     addRobot(data)
  //       .then((data) => {
  //         console.log("Data updated:", data.data.connected);

  //         setStatus((pre) => {
  //           let approvalStatus = false;
  //           let pendingStatus = false;

  //           if (data.data.connected && data.data.response) {
  //             approvalStatus = true;
  //           }
  //           if (!data.data.connected && data.data.response) {
  //             approvalStatus = false;
  //           }
  //           if (data.data.response) {
  //             pendingStatus = true;
  //           }

  //           return {
  //             ...pre,
  //             approval: true,
  //             userApproval: approvalStatus,
  //             pending: pendingStatus,
  //           };
  //         });

  //         // enqueueSnackbar("SignUp Successfully", { variant: "success" });
  //         if (data) {
  //           setTimelineStatus(true);
  //         }
  //       })
  //       .catch((error) => {
  //         enqueueSnackbar(error.message, { variant: "error" });
  //         console.error("Error updating data:", error);
  //       });

  //     elapsedTime += 5; 
  //   };

  //   intervalId = setInterval(addBotRepeatedly, 5000);

  //   // Call the function initially
  //   addBotRepeatedly();
  // };


  // const handleSubmmit = (data) => {
  //   let intervalId = null;
  //   let elapsedTime = 0;
  
  //   const addBotRepeatedly = () => {
  //     console.log(elapsedTime >= 180 || data?.data?.response || Mountcomponent, "elapsedTime");
  
  //     if (elapsedTime >= 180 || data?.data?.response || Mountcomponent) {
  //       // Stop after 3 minutes (180 seconds)
  //       clearInterval(intervalId);
  //       console.log("Stopped calling addRobot");
  //       return;
  //     }
  
  //     addRobot(data)
  //       .then((data) => {
  //         console.log("Data updated:", data.data.connected);

  
  //         setStatus((pre) => {
  //           let approvalStatus = false;
  //           let pendingStatus = false;
  
  //           if (data.data.connected && data.data.response) {
  //             approvalStatus = true;
  //           }
  //           if (!data.data.connected && data.data.response) {
  //             approvalStatus = false;
  //           }
  //           if (data.data.response) {
  //             pendingStatus = true;
  //           }
  
  //           return {
  //             ...pre,
  //             approval: true,
  //             userApproval: approvalStatus,
  //             pending: pendingStatus,
  //           };
  //         });
  
  //         // enqueueSnackbar("SignUp Successfully", { variant: "success" });
  //         if (data) {
  //           setTimelineStatus(true);
  //         }
  //       })
  //       .catch((error) => {
  //         enqueueSnackbar(error.message, { variant: "error" });
  //         console.error("Error updating data:", error);
          
  //       });
  
  //     elapsedTime += 5;
  //   };
  
  //   // Call the function initially
  //   addBotRepeatedly();
  
  //   // Start the interval with a 5-second delay
  //   intervalId = setInterval(addBotRepeatedly, 5000);
  
  //   // Clear the interval after 3 minutes
  //   setTimeout(() => {
  //     clearInterval(intervalId);
  //     console.log("Stopped calling addRobot after 3 minutes");
  //   }, 180000);
  // };


  const handleSubmmit = (data) => {
    let intervalId = null;
    let elapsedTime = 0;
    let errorOccurred = false; // Flag to track API errors
  
    const addBotRepeatedly = () => {
      if (elapsedTime >= 180 || errorOccurred || Mountcomponent) {
        // Stop after 3 minutes (180 seconds), when an error occurs, or when Mountcomponent is true
        clearInterval(intervalId);
        console.log("Stopped calling addRobot");
        return;
      }
  
      addRobot(data)
        .then((data) => {
          console.log("Data updated:", data.data.connected);
  
          setStatus((pre) => {
            let approvalStatus = false;
            let pendingStatus = false;
  
            if (data.data.connected && data.data.response) {
              approvalStatus = true;
            }
            if (!data.data.connected && data.data.response) {
              approvalStatus = false;
            }
            if (data.data.response) {
              pendingStatus = true;
            }
  
            return {
              ...pre,
              approval: true,
              userApproval: approvalStatus,
              pending: pendingStatus,
            };
          });
  
          // enqueueSnackbar("SignUp Successfully", { variant: "success" });
          if (data) {
            setTimelineStatus(true);
          }
        })
        .catch((error) => {
          errorOccurred = true; // Set the error flag
          enqueueSnackbar(error.message, { variant: "error" });
          console.error("Error updating data:", error);
        });
  
      elapsedTime += 5;
    };
  
    // Call the function initially
    addBotRepeatedly();
  
    // Start the interval with a 5-second delay
    intervalId = setInterval(addBotRepeatedly, 5000);
  
    // Clear the interval after 3 minutes
    setTimeout(() => {
      clearInterval(intervalId);
      console.log("Stopped calling addRobot after 3 minutes");
    }, 180000);
  };
  
  
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        maxWidth="100%"
      >
        <DialogTitle id="alert-dialog-slide-title">{`Add Tebo`}</DialogTitle>

        {timelineStatus ? (
          <Box className="9996" sx={{ width: "100%" }}>
            <HorizontalTimeline status={status} />
          </Box>
        ) : (
          <>
            <Box display="flex" flexDirection="column" mr={4} ml={2} mb={2}>
              <Typography mb={1}>Enter the Uniq Tebo Id</Typography>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                name="uuid"
                type="text"
                fullwidth
                onChange={(e) => {
                  setrobotId(e.target.value);
                }}
                sx={{
                  borderRadius: "15px",
                  marginTop: 0,
                  "& fieldset": {
                    borderRadius: "15px",
                  },
                  "& input": {
                    borderRadius: "15px !important",
                    height: "12px",
                  },
                }}
              />
            </Box>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                variant="caption"
              >
                Robots with unique identities – more than machinery, they're
                distinctive digital personalities, adding innovation to the
                digital landscape.
              </DialogContentText>
            </DialogContent>
          </>
        )}

        <DialogActions>
          <Box>
            {timelineStatus?<Button color="inherit" onClick={()=>{
              handleClose()
              setTimelineStatus(false)
              
              }}>
              Close
            </Button>:<Button color="inherit" onClick={handleClose}>
              cancel
            </Button>}

            {!timelineStatus&&<Button
              variant="contained"
              color="error"
              onClick={() => handleSubmmit(robotId)}
            >
              Add Tebo
            </Button>}
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
