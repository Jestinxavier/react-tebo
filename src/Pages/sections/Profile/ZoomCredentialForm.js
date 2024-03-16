import React, { useCallback, useState, useEffect } from "react";
import { Box } from "@mui/material";
import FormProvider, {
  RHFTextField,
  RHFPasswordTextField,
  RHFSelectPhoneNumber,
  RHFDatePicker,
} from "../../../Component/MUI/hook-form";
import { ButtonBase } from "@mui/material";
import { getMyDetails, getUserDetails } from "../../../redux/slices/userdetail";
import {
  regularFormatDate,
  formatDateToYYYYMMDD,
} from "../../../utils/momentformat";
import { fData } from "../../../utils/formatNumber";

import { addProfile } from "../../../Api/addProfile";
import {
  Grid,
  Card,
  Button,
  Typography,
  Stack,
  CardContent,
  CardHeader,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "../../../Component/MUI/snackbar";
import ImageUpload from "../../../Component/FileUpload/ImageUpload";
import { useSelector, useDispatch } from "../../../redux/store";
import { UploadAvatar, Upload, UploadBox } from "../../../Component/upload";
import appendToFormData from "../../../utils/appendToFormData";
// import { useAuthContext } from "../../../auth/useAuthContext";
import moment from "moment";
import VideoAppButton from "./VideoAppButton";
import { getZoomCredentials, updateZoomCredentials } from "../../../redux/slices/robot";

const defaultValues = {
  zoomSecretKey: "",
  zoomAccountId: "",
};
function ZoomCredentialForm() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  // const { updateProfile } = useAuthContext();
  const [image, setImage] = useState("");
  const [DateOfBerth, setDateOfBerth] = useState(new Date());
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [File, setFile] = useState(false);
  // const zoomCredentials = useSelector(
  //   (state) => state?.userdetail?.userdetails?.zoomCredentials

  // );
  const zoomCredentials = useSelector((state) => state.robot.zoomCredentials);

  const theme = useTheme();

  const VerifySchema = Yup.object().shape({
    zoomSecretKey: Yup.string().required("Zoom Secret Key is required"),
    zoomAccountId: Yup.string().required("Zoom account Id is required"),
  });
  useEffect(() => {
    dispatch(getZoomCredentials());
  }, []);

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
    getValues,
    watch,
    setValue,
  } = methods;
  const values = watch();

  useEffect(() => {
    if (zoomCredentials !== undefined) {
      const responseValues = {
        zoomSecretKey: zoomCredentials.zoom_secret_key,
        zoomAccountId: zoomCredentials.zoom_account_id,
      };
      if (responseValues) {
        reset(responseValues);
      }
    }
  }, [zoomCredentials, reset]);

  const onSubmit = useCallback(async (data) => {
    try {
      let updatedData = null;
      updatedData = {
        ...data,
        zoom_account_id: data.zoomAccountId,
        zoom_secret_key: data.zoomSecretKey,
      };

      if (updatedData) {
        dispatch(updateZoomCredentials(updatedData));
        // await updateProfile(updatedData);
        enqueueSnackbar("Zoom credential successfully", { variant: "success" });
        //   navigate("/");
        reset();
        
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }, []);

  return (
    <FormProvider
      methods={methods}
      sx={{ padding: 20 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={2} sx={{ padding: 3 }}>
            <Grid item md={6} sm={12}>
              <RHFTextField
                fullWidth
                sx={{
                  margin: "10px",

                  borderRadius: "15px",
                  marginTop: "20px",
                  "& fieldset": {
                    borderRadius: "15px",
                  },
                  "& input": {
                    borderRadius: "15px !important",
                    height: "12px",
                    paddingBottom: "25px",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                name="zoomSecretKey"
                label="ZOOM VIDEOSDK SECRET"
              />
            </Grid>
            <Grid item md={6} sm={12}>
              <RHFTextField
                fullWidth
                sx={{
                  margin: "10px",

                  borderRadius: "15px",
                  marginTop: "20px",
                  "& fieldset": {
                    borderRadius: "15px",
                  },
                  "& input": {
                    borderRadius: "15px !important",
                    height: "12px",
                    paddingBottom: "25px",
                  },
                }}
                InputLabelProps={{ shrink: true }}
                name="zoomAccountId"
                label="ZOOM VIDEOSDK KEY"
              />
            </Grid>
          </Grid>

          <Stack display="flex" alignItems="flex-end" mt={5}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                width: "100px",

                borderRadius: "15px",
                color: theme.palette.secondary.contrastText,

                padding: "9px",
                borderColor: "#d5d5d5",
                display: "flex",

                fontWeight: 100,
              }}
            >
              submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default ZoomCredentialForm;
