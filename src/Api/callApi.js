import axios from "../utils/axios";

export const callStartInfo = (data) => {
  return axios
    .post("/owner/log-caller-info", { robot_uuid: data })
    .then((response) => {
      // Handle the response data if needed
      return response?.data?.data?.details?.log_id;
    })
    .catch((error) => {
      // Handle the error if needed
      throw error;
    });
};

export const callEndedInfo = (data) => {
  return axios
    .post("/log-call-end", { log_id: data })
    .then((response) => {
      // Handle the response data if needed
      return response.data;
    })
    .catch((error) => {
      // Handle the error if needed
      throw error;
    });
};

