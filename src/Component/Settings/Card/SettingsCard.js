import React, { useEffect,useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Box } from "@mui/material";
import Button from "@mui/material/Button";
import {Typography,Skeleton} from "@mui/material";
import { Icon } from "@iconify/react";
import { makeStyles } from "@mui/styles";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import NickNameDialogs from '../../Modal/NickNameDialogs';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => {
  console.log(theme, "theme,****123");
  return {
    iconifycolor: {
      "&:hover": {
        color: "red",
      },
      iconcolor: {
        "&:hover": {
          color: theme.palette.secondary.light,
        },
      },
    },
  };
});

export default function SettingsCard({ robotData, index }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false)
  const [robotId, setRobotId] = useState(null)
  const addMap = (data) => {
    navigate("/robot-map");
  };
  const editRobotName = (data) => {
    console.log("editRobotName", data);
    setModalOpen(true)
    setRobotId(data)
  };

  
  
  const removeMap = (data) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  };
  const settingsIconData = [
    {
      iconName: "tabler:map-plus",
      iconFunction: addMap,
    },
    {
      iconName: "iconamoon:edit-thin",
      iconFunction: editRobotName,
    },
    {
      iconName: "tabler:map-off",
      iconFunction: removeMap,
    },
  ];
  return (
    <Box>
    
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          key={index}
          sx={{ objectFit: "contain" }}
          component="img"
          objectFit="contain"
          alt="green iguana"
          height="140"
          image="/images/robot.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {robotData?.nickname}
          </Typography>
          {robotData?.location_name ?  (
            <Typography variant="body2" color="text.secondary">
              {robotData?.location_name}
            </Typography>
          ): (
            <Box sx={{ height: 50 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) }
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {settingsIconData.map((data, index) => (
            <Card
              key={index}
              onClick={() => data.iconFunction(robotData?.id)}
              sx={{
                border: "1px solid #f7f6f6",
                display: "flex",
                justifyContent: "center",
                height: "45px",
                width: "45px",
                cursor: "pointer",
                mx: "3px",
                padding: "3px",
                alignItems: "center",
                borderRadius: "200px",
              }}
            >
              <Icon
                width="50%"
                height="50%"
                icon={data.iconName}
                className={classes.iconcolor}
                color={theme.palette.blueGray[900]}
              />
            </Card>
          ))}
        </CardActions>
      </Card>

      <NickNameDialogs modalOpen={modalOpen} setModalOpen={setModalOpen} nikName={robotData?.nickname} robotId={robotId} />


    </Box>
  );
}
