import axios from "../utils/axios";
import moment from 'moment-timezone'
const currentTimezone = moment.tz.guess();

export const callStartInfo = (data) => {
// console.log({currentTimezone});
  return axios
    .post("/owner/log-caller-info", { robot_uuid: data,timezone:currentTimezone })
    .then((response) => {
      // Handle the response data if needed
      return response?.data?.data?.details?.id;
    })
    .catch((error) => {
      // Handle the error if needed
      throw error;
    });
};

export const callEndedInfo = (data) => {
  return axios
    .post("/log-call-end", { log_id: data,})
    .then((response) => {
      // Handle the response data if needed
      return response.data;
    })
    .catch((error) => {
      // Handle the error if needed
      throw error;
      
    });
};

