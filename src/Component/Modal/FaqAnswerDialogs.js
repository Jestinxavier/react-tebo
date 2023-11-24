import { forwardRef, useState, useEffect, useCallback, useRef } from "react";
// @mui
import {
  Slide,
  Box,
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  Stack,
  Typography,
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
import { getRobot } from "../../redux/slices/robot";
import { useDispatch, useSelector } from "../../redux/store";

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
  const [answerFaq, setAnswerFaq] = useState("");
  const [question, setQuestion] = useState("");
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
  };

  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen) {
      handleClickOpen();
    }
  }, [modalOpen]);
  useEffect(() => {
    if (data) {
      console.log(data, "data****");
      setQuestion(data.question);
      setAnswerFaq(data?.answer[0]?.answer || null);
    }
  }, [data]);

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const handleSubmit = (param) => {
    const addBotRepeatedly = () => {
      let apiData = {};
      apiData.answer = answerFaq;
      apiData.question_id = param.id;
      apiData.answer_id =
        param.answers.length > 0 ? param?.answers[0]?.id : null;
      addFaq(apiData)
        .then((data) => {
          console.log("Data updated:", data.data.connected);
          dispatch(getRobot());

          enqueueSnackbar("Rename Successfully", { variant: "success" });
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
        <DialogTitle id="alert-dialog-slide-title">Q: {question}?</DialogTitle>
        <>
          <Box display="flex" flexDirection="column" mr={4} ml={2} mb={2}>
            {answerFaq ? (
              <Typography mb={1}>A:{answerFaq}</Typography>
            ) : (
              <Stack alignItems="center" justifyContent="center">
                <Typography mb={1} sx={{ color: "red", ml: 1 }}>
                  Not Answered
                </Typography>
                <Box
                  component="img"
                  src="/images/noAndswer.gif"
                  sx={{ width: 150 }}
                />
              </Stack>
            )}
          </Box>
        </>

        <DialogActions>
          <Box>
            <Button color="inherit" onClick={handleClose}>
              close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
