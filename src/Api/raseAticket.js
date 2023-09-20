import axios from "../utils/axios";

  export const  raseAticket = (data) => {
      return axios.post('/owner/raise-ticket', {ticket_content:data.ticket_content})
        .then(response => {
          // Handle the response data if needed
          return response.data
        })
        .catch(error => {
          // Handle the error if needed
          throw error;
        });
    };