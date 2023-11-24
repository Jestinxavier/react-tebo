import { Navigate, createBrowserRouter, useRoutes } from "react-router-dom";
import {
  Login,
  Home,
  VideoConference,
  Signup,
  Profile,
  NotFound,
  RobotVideoConferenceInterface,
  Support,
  Settings,
  ZigoCloude,
  MapPage,
  Analytics,
  CallLogs,
  ShareRobotList,
  AdminSupport,
  ResetPasswordPage,
  NewPasswordPage,
} from "../Pages";
import AuthGuard from "../auth/AuthGuard";

const Router = () =>
  useRoutes([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Signup />,
    },
    {
      path: "reset-password",
      element: <ResetPasswordPage />,
    },
    {
      path: "forgot-password",
      element: <NewPasswordPage />,
    },

    {
      path: "home",
      element: (
        <AuthGuard>
          <Home />
        </AuthGuard>
      ),
    },

    {
      path: "settings",
      element: (
        <AuthGuard>
          <Settings />
        </AuthGuard>
      ),
    },
    {
      path: "conference-room/",

      element: (
        <AuthGuard>
          <VideoConference />
        </AuthGuard>
      ),
    },
    {
      path: "robot-map/",

      element: (
        <AuthGuard>
          <MapPage />
        </AuthGuard>
      ),
    },

    {
      path: "RobotVideoConferenceInterface/",
      element: <RobotVideoConferenceInterface />,
    },

    {
      path: "ZigoCloude/",

      element: <ZigoCloude />,
    },

    {
      path: "profile/",

      element: (
        <AuthGuard>
          <Profile />
        </AuthGuard>
      ),
    },
    {
      path: "call-logs/",

      element: (
        <AuthGuard>
          <CallLogs />
        </AuthGuard>
      ),
    },
    {
      path: "shared-robot-list/",

      element: (
        <AuthGuard>
          <ShareRobotList />
        </AuthGuard>
      ),
    },

    {
      path: "analytics/",

      element: (
        <AuthGuard>
          <Analytics />
        </AuthGuard>
      ),
    },
    {
      path: "admin-support/",

      element: (
        <AuthGuard>
          <AdminSupport />
        </AuthGuard>
      ),
    },

    {
      path: "support/",

      element: (
        <AuthGuard>
          <Support />
        </AuthGuard>
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
