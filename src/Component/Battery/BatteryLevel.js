import React from 'react'
import Box from '@mui/material/Box'

function BatteryLevel({color,BatteryPercentageLevel}) {
  const percentage = parseInt(BatteryPercentageLevel) 
  
  function mapNumberToColor(number) {
    // Ensure the number is within the range [0, 100]
    number = Math.min(Math.max(number, 0), 100);
    
    // Calculate the R, G, and B values based on the number
    var r = Math.floor((100 - number) * 255 / 100); // Red component
    var g = Math.floor((number) * 255 / 100);       // Green component
    var b = 0;                                       // Blue component (0 for this range)
    
    // Create an RGB color string
    var color = "rgb(" + r + "," + g + "," + b + ")";
    
    return color;
}
  return (
    <Box
    sx={{
      height: 20,
      width: 100,
      border: "1px solid #0000002e",
      borderRadius: "10px",
    }}
  >
    <Box
      sx={{
        width: percentage,
        height: "100%",
        backgroundColor: BatteryPercentageLevel<20?'red':color,
        borderRadius: "10px",
      }}
    ></Box>
  </Box>
  )
}

export default BatteryLevel