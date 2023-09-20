import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Typography, Stack } from "@mui/material";

export default function NoRobotCard({ image, description, Heading }) {
  return (
    <Card>
      {/* <CardMedia
              component="img"
              alt="green iguana"
              // height="140"
              // image={data.botImage}
              image='/images/robot.png'
              sx={{ flex: 1 }}
              /> */}
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        image={image}
        title="no tebo"
      />
      <CardContent>
        <Stack alignItems="center" justifyContent="center">
          <Typography gutterBottom variant="h5" component="div">
            {Heading}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textOverflow: "ellipsis" }}
          >
            {description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
