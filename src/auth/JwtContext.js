import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';

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
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
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
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
      console.log(accessToken,"accessToken");

      // if (accessToken && isValidToken(accessToken)) {
      if (accessToken) {

        setSession(accessToken);

        const response = await axios.post('/owner/my-profile');

        const { owner } = response.data.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user:owner,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
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
    const response = await axios.post('/login-owner', {
      owner_email: email,
      owner_password:password,
      
    });
    const { owner } = response.data?.data;    
    setSession(owner?.api_token);

    dispatch({
      type: 'LOGIN',
      payload: {
        user:owner,
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (data) => {
    const response = await axios.post('/signup-owner', 
      data
    );
    const { owner } = response.data?.data;    

    // const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', owner?.api_token);

    dispatch({
      type: 'REGISTER',
      payload: {
        user:owner,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
