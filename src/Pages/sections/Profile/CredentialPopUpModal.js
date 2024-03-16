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
import ZoomCredentialForm from "./ZoomCredentialForm";


// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function CredentialPopUpModal({ open, setOpen }) {
  
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        maxWidth="100%"
        sx={{ minWidth: 900 }} 
        
      >
        <DialogTitle id="alert-dialog-slide-title">{`Add Tebo`}</DialogTitle>
          <>
            <Box display="flex" flexDirection="column" mr={4} ml={2} mb={2}>
              <Typography mb={1}>Enter your unique Tebo Id</Typography>
              <ZoomCredentialForm />
            </Box>
          
          </>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}
