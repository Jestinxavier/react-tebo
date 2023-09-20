import React from 'react'
import FacebookAuth from 'react-facebook-auth';
const MyFacebookButton = ({ onClick })=>{
  
  return (
   
        <button onClick={onClick}>
          Login with facebook
        </button>
      );
  
}

export default MyFacebookButton