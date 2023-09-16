import React from "react";
import ImageUploader from "react-image-upload";
import { Card, Stack, Typography, Box } from "@mui/material";
function ImageUpload({ name, setImage, image, ImageUpdate, setImageUpdate }) {
  function getImageFileObject(imageFile) {
    console.log({ imageFile });
    setImage({ imageFile, upload: true });
  
  }

  function runAfterImageDelete(imageFile) {
    console.log({ imageFile });
    setImage({ imageFile, upload: false });
 
  }
  return (
    <Box flexDirection="row" justifyContent="center">
      <Card
        sx={{
          minHeight: "200px !important",
          maxWidth: "200px !important",
          "& .uploader__placeholder": {
            minHeight: 200,
            minWidth: 200,
            " & .uploader__btn_wrapper": {
              right: 18,
            },
          },
        }}
      >
      

      <ImageUploader
        onFileAdded={(img) => getImageFileObject(img)}
        onFileRemoved={(img) => runAfterImageDelete(img)}
      />
        <Stack display="flex" flexDirection="row" justifyContent="center">
          <Typography
            textAlign="center"
            variant="caption"
            sx={{ color: "text.secondary" }}
          >
            {name}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}

export default ImageUpload;
