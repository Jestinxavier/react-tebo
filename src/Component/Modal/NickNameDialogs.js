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
import { useSnackbar } from "../MUI/snackbar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {renameRobot} from "../../Api/renameRobot";
import Loader from "../Loader/Loader";
import { getRobot } from "../../redux/slices/robot";
import { useDispatch, useSelector } from "../../redux/store";

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function NickNameDialogs({ modalOpen, setModalOpen, nikName, robotId }) {
  const [open, setOpen] = useState(false);
 
  const dispatch = useDispatch();
  let Mountcomponent;
  const [status, setStatus] = useState({
    sentRequest: true,
    approval: true,
    userApproval: true,
    pending: false,
  });

  const [robotName, setRobotName] = useState(nikName);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();



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


  const handleSubmmit = (id) => {


    const addBotRepeatedly = () => {
    
      renameRobot(id,robotName)
        .then((data) => {
          console.log("Data updated:", data.data.connected);
          dispatch(getRobot())
        
           enqueueSnackbar("SignUp Successfully", { variant: "success" });
           handleClose()
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: "error" });
          console.error("Error updating data:", error);
        });

      
    };
    addBotRepeatedly()
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
        <DialogTitle id="alert-dialog-slide-title">{`Rename Your Tebo`}</DialogTitle>

    
          <>
            <Box display="flex" flexDirection="column" mr={4} ml={2} mb={2}>
              <Typography mb={1}>Rename Your {nikName}</Typography>
              <TextField
                id="outlined-basic"
                label=""
                value={robotName}
                variant="outlined"
                name="uuid"
                type="text"
                fullwidth
                onChange={(e) => {
                  setRobotName(e.target.value);
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
                Unlock the limitless potential of your robot's identity with a
                simple act of renaming, and watch it transform into the
                embodiment of your dreams and aspirations.
              </DialogContentText>
            </DialogContent>
          </>
    

        <DialogActions>
          <Box>
            <Button color="inherit" onClick={handleClose}>
              cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleSubmmit(robotId)}
            >
             Rename
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
