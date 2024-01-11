import React, { lazy, Suspense } from "react";
import { Navigate, createBrowserRouter, useRoutes } from "react-router-dom";
// import {
//   Login,
//   Home,
//   VideoConference,
//   Signup,
//   Profile,
//   NotFound,
//   RobotVideoConferenceInterface,
//   Support,
//   Settings,
//   ZigoCloude,
//   MapPage,
//   Analytics,
//   CallLogs,
//   ShareRobotList,
//   AdminSupport,
//   ResetPasswordPage,
//   NewPasswordPage,
//   LoginGoogle
// } from "../Pages";
import LoadingScreen from '../Component/MUI/loading-screen';
import AuthGuard from "../auth/AuthGuard";

const Login = lazy(() => import("../Pages/Login"));
const Home = lazy(() => import("../Pages/Home"));
const VideoConference = lazy(() => import("../Pages/VideoPage/VideoConference"));
const Signup = lazy(() => import("../Pages/SignUp"));
const Profile = lazy(() => import("../Pages/Profile"));
const NotFound = lazy(() => import("../Pages/NotFound"));
const RobotVideoConferenceInterface = lazy(() => import("../Pages/RobotVideoConferenceInterface"));
const Support = lazy(() => import("../Pages/Support"));
const Settings = lazy(() => import("../Pages/SettingsPage/Settings"));
// const ZigoCloude = lazy(() => import("../Pages/ZigoCloude"));
const MapPage = lazy(() => import("../Pages/SettingsPage/MapPage"));
const Analytics = lazy(() => import("../Pages/Analytics/Analytics"));
const CallLogs = lazy(() => import("../Pages/CallLogs/CallLogs"));
const ShareRobotList = lazy(() => import("../Pages/ShareRobot/ShareRobotList"));
const AdminSupport = lazy(() => import("../Pages/AdminSupport"));
const ResetPasswordPage = lazy(() => import("../Pages/ResetPassword/ResetPasswordPage"));
const NewPasswordPage = lazy(() => import("../Pages/ResetPassword/NewPasswordPage"));
const LoginGoogle = lazy(() => import("../Pages/Authatication/LoginGoogle"));

const Router = () =>
  useRoutes([
    {
      path: "login",
      element: (<Suspense fallback={<LoadingScreen />}>

        <Login />
        </Suspense>),
    },
    {
      path: "register",
      element:( <Suspense fallback={<LoadingScreen />}>
         <Signup /> </Suspense>),
    },
    {
      path: "reset-password",
      element:( <Suspense fallback={<LoadingScreen />}><ResetPasswordPage /></Suspense>),
      
    },
    {
      path: "forgot-password",
      element:(<Suspense fallback={<LoadingScreen />}>
       <NewPasswordPage />
       </Suspense>),
    },
    {
      path:"/auth/google",
      element:(<Suspense fallback={<LoadingScreen />}>
<LoginGoogle />
      </Suspense>),
    },


    {
      path: "home",
      element: (
        <Suspense fallback={<LoadingScreen />}>
        <AuthGuard>
          <Home />
        </AuthGuard>
        </Suspense>
      ),
    },

    {
      path: "settings",
      element: (
        <Suspense fallback={<LoadingScreen />}>
        <AuthGuard>
          <Settings />
        </AuthGuard>
        </Suspense>
      ),
    },
    {
      path: "conference-room/",

      element: (
        <Suspense fallback={<LoadingScreen />}>
        <AuthGuard>
          <VideoConference />
        </AuthGuard>
        </Suspense>
      ),
    },
    {
      path: "robot-map/",

      element: (
        <Suspense fallback={<LoadingScreen />}>
        <AuthGuard>
          <MapPage />
        </AuthGuard>
        </Suspense>
      ),
    },

    {
      path: "RobotVideoConferenceInterface/",
      element:( 
      <Suspense fallback={<LoadingScreen />}>
      <RobotVideoConferenceInterface />
      </Suspense>
      ),
    },

    // {
    //   path: "ZigoCloude/",

    //   element: (
    //   <Suspense fallback={<LoadingScreen />}>
    //   <ZigoCloude />
    //   </Suspense>
    //   ),
    // },

    {
      path: "profile/",

      element: (
      <Suspense fallback={<LoadingScreen />}>

        <AuthGuard>
          <Profile />
        </AuthGuard>
      </Suspense>

      ),
    },
    {
      path: "call-logs/",

      element: (
      <Suspense fallback={<LoadingScreen />}>

        <AuthGuard>
          <CallLogs />
        </AuthGuard>
      </Suspense>

      ),
    },
    {
      path: "shared-robot-list/",

      element: (
      <Suspense fallback={<LoadingScreen />}>

        <AuthGuard>
          <ShareRobotList />
        </AuthGuard>
      </Suspense>

      ),
    },

    {
      path: "analytics/",

      element: (
      <Suspense fallback={<LoadingScreen />}>

        <AuthGuard>
          <Analytics />
        </AuthGuard>
      </Suspense>

      ),
    },
    {
      path: "admin-support/",

      element: (
      <Suspense fallback={<LoadingScreen />}>

        <AuthGuard>
          <AdminSupport />
        </AuthGuard>
      </Suspense>

      ),
    },

    {
      path: "support/",

      element: (
      <Suspense fallback={<LoadingScreen />}>

        <AuthGuard>
          <Support />
        </AuthGuard>
      </Suspense>

      ),
    },

    {
      element: <Navigate to="/home" />,
      path: "/",
    },
    {
      element: <NotFound />,
      path: "*",
    },

    // {
    //   path: "/home",
    //   element: <HomePage />,
    // },
  ]);
export default Router;
