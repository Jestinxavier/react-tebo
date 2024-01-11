import React,{useState,useEffect} from "react";
import GoogleMapReact from 'google-map-react';
import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Skeleton,
} from "@mui/material";
import Image from "mui-image";

const AnyReactComponent = ({ text }) => <div> <Image
// src={data?.botImage}
src="/images/robotMarker.gif"
width={80}
height={120}
fit={"cover"}
alignItems="flex-end"
sx={{ pb: "5px" }}
duration={0}
/></div>;

export default function GoogleMap({longitude,latitude}){
  const [defaultProps, setDefaultProps] = useState(null);
  
  useEffect(() => {
    setDefaultProps((pre) => ({
      center: {
        lat: parseFloat(latitude,10),
        lng: parseFloat(longitude,10)
      },
      zoom: 15
    }));
  }, [longitude, latitude]);
  

console.log('====================================');
console.log(parseFloat(latitude,10),parseFloat(longitude,10));
console.log('====================================');
  return (
    // Important! Always set the container height explicitly
    <>
  { latitude && longitude ?<div style={{ height: "100%", width: '100%' }}>
     { defaultProps?<GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDLg_VU_6t6k3GdnSDUr8_ExrBfKQ3k-2I" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
       
      >
        <AnyReactComponent
          lat={parseFloat(latitude,10)}
          lng={parseFloat(longitude,10)}
          text="My Marker"

        />
      </GoogleMapReact>:null}
            
    </div>:<Skeleton variant="rectangular" width="100%" height= "100%" />
}
    
    </>
  );
}