import React from 'react';
import IconButton from '@mui/material/IconButton';
import { Icon } from "@iconify/react";
function IconBtn(props) {
  return (
    <IconButton aria-label={props.label} sx={{...props.buttonStyle}} onClick={props.onClick}>
      <Icon className='kop6' icon={props.icon} color='black' sx={{ color:props.IconColor}} />
    </IconButton>
  );

}

export default IconBtn;
