import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import FormProvider, {
  RHFTextField,
  RHFPasswordTextField,
  RHFSelectPhoneNumber,
  RHFDatePicker,
} from "../MUI/hook-form";
import { getUserDetails } from "../../redux/slices/userdetail";
import {
  regularFormatDate,
  formatDateToYYYYMMDD,
} from "../../utils/momentformat";
import { raseAticket } from "../../Api/raseAticket";
import { getTicket } from "../../redux/slices/robot";
import { dispatch } from "../../redux/store";

import {
  Grid,
  Card,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "../MUI/snackbar";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import axios from "../../utils/axios";
import FaqAnswerDialogs from "../Modal/FaqAnswerDialogs";

const defaultValues = {
  ticket_content: "",
};
function SupportForm() {
  const { enqueueSnackbar } = useSnackbar();

  // const [value, setValue] = useState(defaultValues)
  const [image, setImage] = useState("");
  const [DateOfBerth, setDateOfBerth] = useState(new Date());
  const [searchResult, setSearchResult] = useState("");
  const [suggestedQuestion, setSuggestedQuestion] = useState([]);
  const [modal, setModal] = useState(false);
  const [suggestedAnswer, setSuggestedAnswer] = useState(null);
  const theme = useTheme();

  const VerifySchema = Yup.object().shape({
    ticket_content: Yup.string().required("This field is required"),
  });

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = useCallback(async () => {

    if (suggestedQuestion.length == 0) {
      
      try {
        const responseData = await raseAticket(searchResult); // Add "await" here
        if (responseData) {
          enqueueSnackbar(
            "Thank you for your complaint! We'll address it shortly.",
            { variant: "success" }
          );
          reset();
          dispatch(getTicket());
          setSearchResult("")
          
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  }, [searchResult]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        // Call your function when "Enter" key is pressed
        onSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onSubmit]);

  useEffect(() => {
    axios
      .post("/matching-suggestion", {
        question: searchResult,
      })
      .then((res) => {
        setSuggestedQuestion(res?.data?.data);
      });
  }, [searchResult]);
  const handleSuggestClick = (data) => {
    console.log(data, "clicked");
    axios
      .post("/owner/submit-suggestion", {
        suggestion_id: data.id,
      })
      .then((res) => {
        setSuggestedAnswer(res.data.data);
        setModal(true);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ padding: 3 }}>
        <Grid item md={12} sm={12}>
          <Card>
            <Stack flexDirection="row">
              {/* <RHFTextField
            fullWidth
            type="textarea"
            sx={{
              margin: "10px",

              borderRadius: "15px",
              marginTop: "20px",
              "& fieldset": {
                borderRadius: "15px",
              },
              "& input": {
                borderRadius: "0px !important",

                height: "12px",
                paddingBottom: "25px",
              },
              " & input textarea:focus, input:focus":{
                outline: 'none',
            }

            }}
            name="ticket_content"
            label=""
            variant="outlined"
            placeholder="Enter your complaints here"
            // multiline
            // rows={5}
            rowsMax={10}
          /> */}

              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                fullWidth
                sx={{ ml: 1, flex: 1 }}
                onChange={(e) => {
                  console.log(e.target.value,"e.target.value");
                  setSearchResult(e.target.value);
                }}
                placeholder="Search "
                inputProps={{ "aria-label": "search google maps" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <DirectionsIcon />
              </IconButton>
            </Stack>
            <Stack sx={{ overflow: "auto", maxHeight: 300 }}>
              {suggestedQuestion.map((data, index) => (
                <Box
                  sx={{ p: 3 }}
                  key={index}
                  onClick={() => {
                    handleSuggestClick(data);
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      p: 5,
                      borderRadius:1,
                      "&:hover": { background: "#f7f7f7" },
                    }}
                  >
                    {data.ticket}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Stack display="flex" alignItems="flex-end" mt={5}>
        {suggestedQuestion.length == 0 && (
          <Button
            onClick={() => {
              onSubmit();
            }}
            
            fullWidth
            variant="outlined"
            sx={{
              width: "150px",

              borderRadius: "15px",
              color: theme.palette.secondary.contrastText,

              padding: "9px",
              borderColor: "#d5d5d5",
              display: "flex",

              fontWeight: 100,
            }}
          >
            Raise A Ticket
          </Button>
        )}
      </Stack>
      <FaqAnswerDialogs
        modalOpen={modal}
        setModalOpen={setModal}
        data={suggestedAnswer}
      />
    </>
  );
}

export default SupportForm;
