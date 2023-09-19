import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Conference({
  handleClickOpen,
  handleClose,
  open,
  setOpen,
  processCall,
}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Not connected"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The video call is not connected, and I'm unable to see or hear the
            other person.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
                 sx={{
                  bgcolor: "error.main",
                  "&:hover": {
                    bgcolor: "error.main",
                  },
                }}
          onClick={() => processCall()}>Retry</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
