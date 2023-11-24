import React, { useState } from "react";
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
import { useTheme } from "@mui/styles";
import IconBtn from "../CommonComponent/IconBtn";
import FaqDialogs from "../Modal/FaqDialogs";
function ListTicket({ index, data }) {
  const theme = useTheme();
  return (
   
      // <Card sx={{ minHeight: 100, position: "relative", my: 5 }} key={index}>
      //   <Stack sx={{ pt: 3, pl: 3, zIndex: 999, position: "absolute" }}>
      //     <Typography variant="h6">FAQ:</Typography>
      //     <Typography variant="p">{data.ticket}</Typography>
      //   </Stack>
      //   <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
      //     <OceanWaves
      //       options={{
      //         height: 1,
      //         amplitude: 1,
      //         speed: 0.15,
      //         points: 3,
      //       }}
      //       fill="#f0f8ff6e"
      //       paused={false}
      //     />
      //   </Box>
      // </Card>
      <Card sx={{ minHeight: 100, position: "relative", my: 5 }} key={index}>
      <Stack sx={{ pt: 3, pl: 3, zIndex: 999 }}>
        {/* <Typography variant="h6">FAQ:</Typography> */}
        <Stack flexDirection="row">
          <Typography
            sx={{
              color: "red",
              fontWeight: "bold",
              borderLeftWidth: 1,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderStyle: "solid",
              pl: 2,
              pr: 1,
            }}
          >
            Q.{" "}
          </Typography>
          <Typography variant="p" sx={{ fontWeight: "bold",pl:2 }}>
            {" "}
            {data.ticket} ?
          </Typography>
        </Stack>
        <Stack flexDirection="row">
          <Typography
            sx={{
              color: "gray",
              fontWeight: "bold",
              borderLeftWidth: 1,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderRightWidth: 0,
              borderStyle: "solid",
              pl: 2,
              pr: 1,
              pt: 2,
            }}
          >
            A.{" "}
          </Typography>
          {data?.answers?.length > 0?<Typography variant="p" sx={{ color: "gray", pl: 5,pr: 5,pb: 5,pt: 2 }}>
            {" "}
            {data?.answers[0]?.answer}
          </Typography>:
          <Typography sx={{color:'red',pt: 2,pl:1}}>
            Not Answered..
          </Typography>
          }
        </Stack>

      </Stack>
      {/* 
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
      </Box> */}
      {/* <FaqDialogs modalOpen={modal} setModalOpen={setModal} data={data} /> */}
    </Card>
  
  );
}

export default ListTicket;
