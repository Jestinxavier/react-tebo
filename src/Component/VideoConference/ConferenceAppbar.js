import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "styled-components";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerRight from "../Drawer/DrawerRight";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, dispatch } from "../../redux/store";

import Image from "mui-image";
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#e7e7e700 !important",
  boxShadow:
    "0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(0 0 0 / 0%) !important",
}));
export default function ConferenceAppBar({ AppBarHeight }) {
  const [OpenMenu, setOpenMenu] = React.useState(false);
  const [robot, setRobot] = React.useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teboId = searchParams.get("toId");
  const robotList = useSelector((state) => state.robot.robots.robots);
  const theme = useTheme();
  const filterData = () => {
    setRobot(robotList.filter((item) => item.robot.uuid == teboId));
  };
  const imageData = [
    {
      percentage: "100",
      image: "/images/hundredPercentage.png",
    },
    {
      percentage: "90",
      image: "/images/ninetypercentage.png",
    },
    {
      percentage: "80",
      image: "/images/Eightypercentage.png",
    },
    {
      percentage: "30",
      image: "/images/Thirtypercentage.png",
    },
    {
      percentage: "20",
      image: "/images/Twintypercentage.png",
    },
    {
      percentage: "10",
      image: "/images/tenpercentage.png",
    },
    {
      percentage: "5",
      image: "/images/tenpercentage.png",
    },
    {
      percentage: "0",
      image: "/images/tenpercentage.png",
    },
  ];
  const imageFilter = (data) => {
    let filterData = imageData.filter(
      (item) => Number(item.percentage) <= data
    );
    console.log("====================================");
    console.log(filterData, "filterData");
    console.log("====================================");
    return filterData[0].image;
  };
  React.useEffect(() => {
    filterData();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "absolute",
        width: "100%",
        zIndex: 99,
        minHeight: AppBarHeight,
      }}
    >
      <CustomAppBar position="static">
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            width="100%"
            className="cobra333"
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Image src="/images/PureLogo.png" width={50} />
              {console.log(robot, "robot**")}
              {robot?.map((item) => (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Image
                    sx={{ transform: "rotateZ(89deg)" }}
                    src={imageFilter(item?.robot.battery_charge)}
                    width={18}
                    fit={"contain"}
                  />
                  <Typography variant="caption" color="success.main" >
                    {item?.robot.battery_charge}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, color: theme.palette.secondary.contrastText }}
              onClick={() => setOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Toolbar>
        <DrawerRight OpenMenu={OpenMenu} setOpenMenu={setOpenMenu} />
      </CustomAppBar>
    </Box>
  );
}
