import axios from "../utils/axios";
import {formatDateToYYYYMMDD} from '../utils/momentformat'

export const  updateSignupData = (data) => {
  if (data.phone_number) {
    data.phone_number = data.phone_number.replace(/\s+/g, ''); // Remove all spaces
    
  }
  if(data.date_of_birth){
     data.date_of_birth = formatDateToYYYYMMDD(data.date_of_birth);
  }
    return axios.post('/signup-owner', data)
      .then(response => {
        // Handle the response data if needed
        return response.data;
      })
      .catch(error => {
        // Handle the error if needed
        throw error;
      });
  };


  export const  updateLoginData = (data) => {
      return axios.post('/login-owner', data)
        .then(response => {
          // Handle the response data if needed
          return response.data;
        })
        .catch(error => {
          // Handle the error if needed
          throw error;
        });
    };