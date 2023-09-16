import React from 'react'
import { Box,Fade,Typography } from "@mui/material";


function Heading({children}) {
  return (
    <Fade >
    <Typography variant="h4" gutterBottom>
    {children}
  </Typography>
    </Fade>
  )
}

export default Heading