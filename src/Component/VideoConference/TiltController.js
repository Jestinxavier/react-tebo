import React,{useContext} from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { SocketContext } from "../../Context/SocketContext";
import { useLocation } from 'react-router-dom';


const controllerHeight = 100;
const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: controllerHeight,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
      height: 27,
      width: 27,
      backgroundColor: theme.palette.blueGray[900],
      border: '1px solid currentColor',
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      },
      '& .airbnb-bar': {
        height: controllerHeight,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    '& .MuiSlider-track': {
      height: controllerHeight,
    },
    '& .MuiSlider-rail': {
      color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
      opacity: theme.palette.mode === 'dark' ? undefined : 1,
      height: controllerHeight,
    },
  }));

export default function TiltController({TiltController}) {

  const location = useLocation();

  const searchParms = new URLSearchParams(location.search);

  const { setMqttRequestForTilting } = useContext(SocketContext);
  const toIdUUID = searchParms.get('toId');

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  const handleChange = (data)=>{
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    setMqttRequestForTilting(data,toIdUUID)
  }

  return (
    <Box sx={{ height: {TiltController} }}>
      <AirbnbSlider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: 'slider-vertical',
          },
        }}
        step={10}
        orientation="vertical"
        defaultValue={[30]}
        onChange={(e)=>{
          handleChange(e.target.value)
        }}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
    </Box>
  );
}