import axios from "../utils/axios";

  export const  raseAticket = (data) => {
    // console.log(data,"data*****");
      return axios.post('/owner/raise-ticket', {ticket_content:data})
        .then(response => {
          // Handle the response data if needed
          return response.data
        })
        .catch(error => {
          // Handle the error if needed
          throw error;
        });
    };