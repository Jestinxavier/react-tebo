import React from "react";
import {
  Box,
  Fade,
  Typography,
  CardMedia,
  Card,
  Grid,
  Stack,
} from "@mui/material";
import OceanWaves from "../Animation/OceanWaves";
function ListTicket({ index, data }) {
  return (
   
      <Card sx={{ minHeight: 100, position: "relative", my: 5 }} key={index}>
        <Stack sx={{ pt: 3, pl: 3, zIndex: 999, position: "absolute" }}>
          <Typography variant="h6">FAQ:</Typography>
          <Typography variant="p">{data.ticket}</Typography>
        </Stack>
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <OceanWaves
            options={{
              height: 1,
              amplitude: 1,
              speed: 0.15,
              points: 3,
            }}
            fill="#f0f8ff6e"
            paused={false}
          />
        </Box>
      </Card>
  
  );
}

export default ListTicket;
