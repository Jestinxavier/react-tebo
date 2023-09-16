import axios from "../utils/axios";

  export const  shareRobot = (id,email) => {
    
     

        return axios.post('/owner/sharing-invitation', {robot_uuid:id,sharing_email:email})
        .then(response => {
          // Handle the response data if needed
          return response.data
        })
        .catch(error => {
          // Handle the error if needed
          throw error;
        });
    };