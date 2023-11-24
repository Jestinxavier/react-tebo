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
import { addFaq } from "../../Api/addFaq";
import Loader from "../Loader/Loader";
import { getRobot,getTicket } from "../../redux/slices/robot";
import { useDispatch, useSelector } from "../../redux/store";
import { dispatch } from "../../redux/store";
// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function FaqDialogs({
  modalOpen,
  setModalOpen,
  nikName,
  robotId,
  data,
}) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  let Mountcomponent;
  const [status, setStatus] = useState({
    sentRequest: true,
    approval: true,
    userApproval: true,
    pending: false,
  });

  const [answerFaq, setAnswerFaq] = useState(nikName);
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
  useEffect(() => {
    console.log(data,"data****");
    setAnswerFaq(data?.answers[0]?.answer)

  }, [data])
  

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });


  const handleSubmit = (param) => {
    const addBotRepeatedly = () => {
     let apiData = {}
     apiData.answer = answerFaq;
     apiData.question_id = param.id;
     apiData.answer_id = param.answers.length>0? param?.answers[0]?.id :null
      addFaq( apiData)
        .then((data) => {
          console.log("Data updated:", data.data.connected);
          dispatch(getRobot());
          dispatch(getTicket())
          enqueueSnackbar("Submitted Successfully", { variant: "success" });
          handleClose();
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: "error" });
          console.error("Error updating data:", error);
        });
    };
    addBotRepeatedly();
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
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-slide-title">{data.ticket}?</DialogTitle>
        <>
          <Box display="flex" flexDirection="column" mr={4} ml={2} mb={2}>
            {/* <Typography mb={1}>Rename Your {nikName}</Typography> */}
            <TextField
              id="outlined-basic"
              placeholder="Answer here..."
              value={answerFaq}
              variant="outlined"
              name="uuid"
              type="textarea"
              fullwidth
              rows={10}
              multiline
              rowsMax={10}
              onChange={(e) => {
                setAnswerFaq(e.target.value);
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
         
        </>

        <DialogActions>
          <Box>
            <Button color="inherit" onClick={handleClose}>
              cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => handleSubmit(data)}
            >
              submit
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
