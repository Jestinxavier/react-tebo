import React from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import Iconify from "iconify";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  icon: {
    fontSize: 60,
    marginBottom: theme.spacing(2),
    animation: "$spin 2s linear infinite", // Add a spin animation
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      {/* <GiAlarmClock className={classes.icon} /> */}
      {/* <Iconify icon="eva:minus-fill" width={90} height ={90} /> */}
      <Typography variant="h4" gutterBottom>
        Oops! Page not found
      </Typography>
      <Typography variant="body1">
        The page you are looking for doesn't exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
