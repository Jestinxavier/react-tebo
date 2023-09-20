import axios from "../utils/axios";

  export const  renameRobot = (id,name) => {
   
    return axios.post('/owner/rename-robot', {owned_robot_id:id,new_name:name})

    .then(response => {
      // Handle the response data if needed
      return response.data
    })
    .catch(error => {
      // Handle the error if needed
      throw error;
    });
    };