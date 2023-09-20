import * as React from "react";
import {
  Stack,
  Button,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  Container
} from "@mui/material";
import { LongPressEventType, useLongPress } from "use-long-press";

export default function ButtonComponent() {
  const [enabled, setEnabled] = React.useState(true);
  const [longPressed, setLongPressed] = React.useState(false);

  const callback = React.useCallback(() => {
    setLongPressed(true);
  }, []);
  const bind = useLongPress(enabled ? callback : null, {
    onStart: (event, meta) => {
      console.log("Press started", meta);
    },
    onFinish: (event, meta) => {
      setLongPressed(false);
      console.log("Long press finished", meta);
    },
    onCancel: (event, meta) => {
      console.log("Press cancelled", meta);
    },
    //onMove: () => console.log("Detected mouse or touch movement"),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: 1000,
    captureEvent: true,
    cancelOnMovement: false,
    cancelOutsideElement: true,
    detect: LongPressEventType.Pointer
  });
  
  const handlers = bind("test context");

  return (
    <Container>
      <Snackbar
        open={longPressed}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" elevation={6} variant="filled">
          Long pressed!
        </Alert>
      </Snackbar>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={3}
        height="100vh"
        width="100vw"
      >
        <Button
          {...handlers}
          sx={(theme) => ({
            border: `6px solid ${theme.palette.secondary.main}`,
            width: "50vw",
            height: "20vh",
            fontSize: "4vh"
          })}
          variant="contained"
        >
          Press and hold
        </Button>
        <FormControlLabel
          sx={{ mt: 3 }}
          control={
            <Switch
              checked={enabled}
              onChange={(event, checked) => setEnabled(checked)}
            />
          }
          label="Hook enabled?"
        />
      </Stack>
    </Container>
  );
}
