import logo from "./logo.svg";
import "./App.css";
import React, { createContext } from "react";
import Button from "@mui/material/Button";
import { HomePage } from "./Pages";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./auth/JwtContext";
import { DrawerProvider } from './Context/DrawerContext';
import { GoogleOAuthProvider } from "@react-oauth/google";

import ThemeProvider from "./theme";

import Router from "./Routes/Routes";
// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//react-image-upload
import 'react-image-upload/dist/index.css'

import { Provider as ReduxProvider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// or for moment
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SnackbarProvider from './Component/MUI/snackbar';



function App() {
  return (
    <GoogleOAuthProvider clientId="873869484443-ac9ncvoc6vif5vc67pn619g1ba1jjogq.apps.googleusercontent.com"> 
    <AuthProvider>
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider>
            <CssBaseline />
            <DrawerProvider>
            <div className="App">
              <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <BrowserRouter>
                    <Router />
                  </BrowserRouter>
                </PersistGate>
              </ReduxProvider>
            </div>
            </DrawerProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </AuthProvider>
    </GoogleOAuthProvider> 

  );
}

export default App;
