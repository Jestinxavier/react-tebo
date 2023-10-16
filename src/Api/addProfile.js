import axios from "../utils/axios";



export const addProfile = async (data) => {
 

  // config.url = "/owner/profile-pic-change";

  return axios({
    method: 'post', // Use 'post' for sending data
    url: '/owner/profile-pic-change', // Replace with your API endpoint
    data, // Pass the FormData object as the 'data' parameter
    headers: {
      'Content-Type': 'multipart/form-data', // Set the content type to indicate a multi-part form
    },
  })
    .then(function (response) {
      console.log('Success:', response.data);
      // No need to clear formData in the 'then' block, it's a new object for each call
    })
    .catch(function (error) {
      console.error('Error:', error);
      // No need to clear formData in the 'catch' block, it's a new object for each call
    });
};
