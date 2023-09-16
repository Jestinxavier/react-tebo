import axios from "../utils/axios";

// Create a new FormData object
const formData = new FormData();

const config = {
  method: 'post',
  url: 'your_api_endpoint_here',
  data: formData, // Pass the FormData object as the 'data' parameter
  headers: {
    'Content-Type': 'multipart/form-data', // Set the content type to indicate a multi-part form
  },
};


export const addProfile = (data) => {
for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      console.log(formData, key, data[key]);
      formData.append(key,element);
    }
  }
  
  console.log(formData,"data",data);
  config.url = "/owner/profile-pic-change"
  return axios(config)
  .then(function (response) {
    console.log('Success:', response.data);
    
    formData.forEach((value, key) => {
      formData.delete(key);
    });
  })
  .catch(function (error) {
    console.error('Error:', error);
    formData.forEach((value, key) => {
      formData.delete(key);
    });
  });
};
