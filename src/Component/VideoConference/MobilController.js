import { Box } from '@mui/material'
import React from 'react'
import { useTheme } from "@mui/material/styles";

function MobilController() {
    const theme = useTheme()
  return (
    <Box
    sx={{width:10,height:10,bgColor:theme.palette.blueGray[900]}}
    >MobilController</Box>
  )
}

export default MobilController