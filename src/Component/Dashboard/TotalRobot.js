import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import React from "react";

function TotalRobot({ownedRobotsCount}) {
  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="space-around"
        spacing={2}
      >
        <Box>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            // image={data.botImage}
            image="/images/robot.gif"
            sx={{ flex: 1, objectFit: "contain" }}
          />
        </Box>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          alignContent= "space-around"
          spacing={2}
        >
          <Typography variant="h6" component="h6">
            Total Robots
          </Typography>
          <Typography color="text.secondary" variant="h6" component="h6">
            {ownedRobotsCount?.robots_count || "No Tebo"}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default TotalRobot;
