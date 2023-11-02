import PropTypes from "prop-types";
import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
// utils
import axios from "../utils/axios";
import localStorageAvailable from "../utils/localStorageAvailable";
//
import { isValidToken, setSession } from "./utils";
import {ADMIN} from "../config-global"
// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "INITIAL") {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGIN") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "REGISTER") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "UPDATE") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable
        ? localStorage.getItem("accessToken")
        : "";
      console.log(accessToken, "accessToken");

      // if (accessToken && isValidToken(accessToken)) {
      if (accessToken) {
        setSession(accessToken);

        const response = await axios.post("/owner/my-profile");

        const { owner } = response.data.data;

        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: true,
            user: owner,
          },
        });
      } else {
        dispatch({
          type: "INITIAL",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: "INITIAL",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const response = await axios.post(ADMIN? '/admin/login':"/login-owner", ADMIN?{
      admin_email: email,
      admin_password: password,
    }:{
      owner_email: email,
      owner_password: password,
    });
    console.log('====================================');
    console.log(response.data?.data);
    console.log('====================================');
    const { owner } = response.data?.data;
    setSession(owner?.api_token);

    dispatch({
      type: "LOGIN",
      payload: {
        user: owner,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (data) => {
    const response = await axios.post("/signup-owner", data);
    const { owner } = response.data?.data;

    // const { accessToken, user } = response.data;

    localStorage.setItem("accessToken", owner?.api_token);

    dispatch({
      type: "REGISTER",
      payload: {
        user: owner,
      },
    });
  }, []);

  const updateProfile = async (data) => {
    // config.url = "/owner/profile-pic-change";

    return axios({
      method: "post", // Use 'post' for sending data
      url: "/owner/profile-pic-change", // Replace with your API endpoint
      data, // Pass the FormData object as the 'data' parameter
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to indicate a multi-part form
      },
    })
      .then(function (response) {
        console.log("Success:", response.data);
        dispatch({
          type: "UPDATE",
          payload: {
            user: response?.data?.data?.owner,
          },
        });
        // No need to clear formData in the 'then' block, it's a new object for each call
      })
      .catch(function (error) {
        console.error("Error:", error);
        // No need to clear formData in the 'catch' block, it's a new object for each call
      });
  };

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: "jwt",
      login,
      register,
      logout,
      updateProfile,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
    ]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
