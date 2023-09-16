import axios from "../utils/axios";

  export const  addRobot = (data) => {
      return axios.post('/owner/connect-robot', {robot_uuid:data})
        .then(response => {
          // Handle the response data if needed
          return response.data
        })
        .catch(error => {
          // Handle the error if needed
          throw error;
        });
    };