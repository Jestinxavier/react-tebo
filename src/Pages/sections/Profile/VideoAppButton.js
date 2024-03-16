import { Box, ButtonBase, Stack } from '@mui/material'
import React, { useState } from 'react'
import CredentialPopUpModal from './CredentialPopUpModal';

function VideoAppButton({openModal}) {


  return (
    
    <Stack
    direction="row"
    // justifyContent="center"
    // alignItems="center"
    spacing={2}
    mt={5}
  >
    {" "}
    <ButtonBase component="div" onClick={()=>{openModal()}} sx={{ borderRadius: "10px" }}>
      <Box
        component="img"
        sx={{ width: 60, borderRadius: "10px" }}
        src="/images/VideoChatIcon/zoom.png"
      />
    </ButtonBase>
  
  </Stack>
  )
}

export default VideoAppButton