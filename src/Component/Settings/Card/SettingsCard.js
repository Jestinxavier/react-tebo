import React, { useEffect, useState,useContext } from "react";
import Card from "@mui/material/Card";
import {CardActions} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { CardMedia, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Typography, Skeleton } from "@mui/material";
import { Icon } from "@iconify/react";
import { makeStyles } from "@mui/styles";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import NickNameDialogs from "../../Modal/NickNameDialogs";
import Swal from "sweetalert2";
import { SocketContext, } from "../../../Context/SocketContext";
import { dispatch } from "../../../redux/store";
import { getRobot } from "../../../redux/slices/robot";
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
  const location = useLocation();
  const { deleteMap } = useContext(SocketContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [robotId, setRobotId] = useState(null);
  const [settingsIconData, setSettingsIconData] = useState(null);
  const searchParams = new URLSearchParams(location.search);

  const addMap = (data, id) => {
    searchParams.set("teboId",id);
    console.log(data, "data***");
    navigate(`/robot-map?${searchParams.toString()}`);
  };
  const editRobotName = (data) => {
    console.log("editRobotName", data);
    setModalOpen(true);
    setRobotId(data);
  };

  const removeMap = (data,id) => {
    searchParams.set("teboId",id);
    navigate(`/robot-map?${searchParams.toString()}`);
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!",
    // }).then((result) => {
    //   deleteMap(id);
    //   dispatch(getRobot())
    //   if (result.isConfirmed) {
    //     Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //   }
    // });
  };

  useEffect(() => {
    const iconSet = [
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

    if (robotData.robot.map_status === "no map") {
      // Filter the iconSet array to remove the object with iconName "tabler:map-off"
      let filterIcon = iconSet.filter(
        (item) => item.iconName !== "tabler:map-off"
      );
      console.log("filterIcon================filterIcon====================");
      console.log(filterIcon);
      console.log("====================================");
      setSettingsIconData(filterIcon);
    } else if (robotData.robot.map_status === "map exists" ||"finished mapping" ||'saving map') {
      let filterIcon = iconSet.filter(
        (item) => item.iconName !== "tabler:map-plus"
      );
      // If the condition is not met, set the original iconSet
      setSettingsIconData(filterIcon);
    }
  }, [robotData]);

  return (
    <Box>
      <Card >
        <CardMedia
          key={index}
          sx={{ objectFit: "contain" }}
          component="img"
          objectFit="contain"
          alt="green iguana"
          height="140"
          image="/images/robot.gif"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {robotData?.nickname}
          </Typography>
          {robotData?.location_name ? (
            <Typography variant="body2" color="text.secondary">
              {robotData?.location_name}
            </Typography>
          ) : (
            <Box sx={{ height: 50 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          )}
        </CardContent>
        
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {settingsIconData?.map((data, index) => (
            <Card
              key={index}
              onClick={() =>
                data.iconFunction(robotData?.id, robotData?.robot?.uuid)
              }
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

      <NickNameDialogs
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        nikName={robotData?.nickname}
        robotId={robotId}
      />
    </Box>
  );
}
