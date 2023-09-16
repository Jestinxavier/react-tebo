import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  userdetails: [],
};

const slice = createSlice({
  name: 'userdetail',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    getMyDetails(state,action){
      state.isLoading = false;
      state.userdetails = action.payload;
    },


  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getMyDetails,
} = slice.actions;

// ----------------------------------------------------------------------


export function getSingleRobot(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/owner/show-robot',{owned_robot_id:2});
      dispatch(slice.actions.geSingletRobot(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function getUserDetails() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/owner/my-profile');
      if(response){
       dispatch(slice.actions.getMyDetails(response?.data?.data));

      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


