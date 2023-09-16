import React from "react";
import GoogleMapReact from 'google-map-react';
import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Skeleton,
} from "@mui/material";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMap({longitude,latitude}){
  const defaultProps = {
    center: {
      lat: 55.311286,
      lng: 55.311286
    },
    zoom: 11
  };
console.log('====================================');
console.log(parseFloat(latitude,10),parseFloat(longitude,10));
console.log('====================================');
  return (
    // Important! Always set the container height explicitly
    <>
  { latitude && longitude ?<div style={{ height: "100%", width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDLg_VU_6t6k3GdnSDUr8_ExrBfKQ3k-2I" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
       
      >
        <AnyReactComponent
          lat={parseFloat(latitude,10)}
          lng={parseFloat(longitude,10)}
          text="My Marker"

        />
      </GoogleMapReact>
            
    </div>:<Skeleton variant="rectangular" width="100%" height= "100%" />
}
    
    </>
  );
}