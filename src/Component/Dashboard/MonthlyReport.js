import { Box, Card, CardHeader, CardMedia, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

function MonthlyReport({ ownedRobotsCount,title,subheader,callInAnInterval }) {

  
  return (
    <Card sx={{p:1}}>
        <CardHeader title={title} subheader={subheader} sx={{mb:3}} />
      <Stack
        direction={{md:"row",sm:"column"}}
        alignItems="center"
        alignContent="space-around"
       justifyContent="space-between"
      >
        <Card sx={{p:4,m:1}}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="space-around"
            spacing={2}
          >
            <Typography variant="h6" component="h6">
            Completed Calls
            </Typography>
            <Typography color="text.secondary" variant="h6" component="h6">
              {callInAnInterval?.completed_calls || "0"}
            </Typography>
          </Stack>
        </Card>
      
        <Card sx={{p:4,m:1}}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="space-around"
            spacing={2}
          >
            <Typography variant="h6" component="h6">
            Incomplete Calls
            </Typography>
            <Typography color="text.secondary" variant="h6" component="h6">
              {callInAnInterval?.incompleted_calls || "0"}
            </Typography>
          </Stack>
        </Card>
        <Card sx={{p:4,m:1}}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="space-around"
            spacing={2}
          >
            <Typography variant="h6" component="h6">
              Total Calls
            </Typography>
            <Typography color="text.secondary" variant="h6" component="h6">
              {callInAnInterval?.total_calls || "0"}
            </Typography>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
}

export default MonthlyReport;
