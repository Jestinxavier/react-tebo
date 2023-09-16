import React from 'react'
import {Typography,Link, Box} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

/**
 * 
 * @param {HigliteName} String 
 * @param {Subject} String 
 * 
 * 
 * @returns 
 */
function LinkToNavigate({HigliteName,Subject,navigateTo}) {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
     <Typography variant="caption">
    {HigliteName} {"  "}
    <Box
    
    // component={RouterLink} // Use React Router's Link component
    onClick={()=>{
      navigate(navigateTo)
  }}
    // to={navigateTo} // Specify the route to navigate to
   
      variant="caption"
      sx={{
        display:'inline',
        cursor: 'pointer',
        textDecoration: "none",
        color: `${theme.palette.secondary.main} !important`,
      }}
    >
      {Subject}
    </Box>
  </Typography>
  )
}

export default LinkToNavigate