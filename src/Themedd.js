import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#e7e7e7",
      light: "#888888",
      dark: "#434343",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff5615",
      // darker: "#ff5615",
      light: "#f66b0e",
      contrastText: "#000",
    },
    blueGray: {
      900: "#021521",
    },
    ButtonColor:{
      900:"#f7f7f7",
      800:"#fcfcfc",
      700:"#f6f6f6",
      600:"#f3f3f3",
    },
    green:{100:'#3ce156'}
  },
  typography: {
    fontFamily: ["'Roboto'", "sans-serif"].join(","),
  },

  // components: {
  //   MuiCard: {
  //     styleOverrides: {
  //       root: {
  //         borderRadius: "20px",
  //         boxShadow:
  //           "0px 2px 16px 11px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",

  //       },
  //     },
  //   },
  // },
});
