import React, { useState, useCallback, useContext,useEffect } from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Skeleton,
  Tooltip,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { makeStyles, useTheme } from "@mui/styles";
import Image from "mui-image";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import IconBtn from "../CommonComponent/IconBtn";
import ViewRobotModal from "../ViewRobotModel/ViewRobotModel";
import ShareBotDialogs from "../../Component/Modal/ShareBotDialogs";
import { useAuthContext } from "../../auth/useAuthContext";
import { SocketContext } from "../../Context/SocketContext";
import { useSnackbar } from "../MUI/snackbar";
import { dispatch } from "../../redux/store";
import { getProducts, getSharedRobotList } from "../../redux/slices/robot";
const CustomCard = styled(Card)(({ theme }) => ({
  borderRadius: "20px",
  // boxShadow:
  //   "0px 2px 16px 11px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  margin: "10px",
  "& .css-1ri6ub7-MuiPaper-root-MuiCard-root": {
    borderRadius: "20px",
    // boxShadow:
    //   "0px 2px 16px 11px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    margin: "10px",
  },
}));

export default function RobotListingCard({ data, sharedRobot }) {
  const [model, setModel] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [robotId, setRobotId] = useState(null);
  const [online, setOnline] = useState(false)
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { processCall, addUserId, callUser } = useContext(SocketContext);
  const searchParams = new URLSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  // const connectRobot = (myid, toId) => {
  //   searchParams.set("myid", myid);
  //   searchParams.set("toId", toId);
  //   searchParams.set("sharedRobot", false);

  //   if(sharedRobot){
  //     searchParams.set("sharedRobot", true);
  //   }

  //   addUserId(myid);
  //   callUser(toId)

  //   navigate(`/conference-room?${searchParams.toString()}`);
  // };

  const connectRobot = async (myid, toId) => {
    searchParams.set("sharedRobot", false);

    if (sharedRobot) {
      searchParams.set("sharedRobot", true);
    }
    searchParams.set("myid", myid);
    searchParams.set("toId", toId);
    // addUserId(myid)

    try {
      const data = await addUserId(myid);

      console.log({ data: "mandan", success: data });

      if (data?.error) {
        enqueueSnackbar(
          "You cannot connect to Tebo right now, another person is currently using Tebo.",
          { variant: "error" }
        );
        console.log({ data: "mandan", success: data.error });
      } else {
        // Uncomment the following lines if you want to perform additional actions on success
        callUser(toId);
        console.log(searchParams);
        navigate(`/conference-room?${searchParams.toString()}`);
        processCall();
      }
    } catch (error) {
      console.error({ error: "Error:", error });
    }
  };
  const handleConnect = () => {
    
    if (data?.robot_online_status && data.screen_online_status) {
      connectRobot(user?.random_id, data?.robot?.uuid);
    // processCall()
    }else{
      enqueueSnackbar("The Tebo is not Online.", { variant: "error" });
    }
  };
  const shareRobot = (id) => {
    setRobotId(id);
    setModalOpen(true);
  };
  const theme = useTheme();
  const ICON_COLOR = theme.palette.text.secondary;

  const handleButton = useCallback(
    (data) => {
      console.log(data?.robot_online_status, data.screen_online_status);
      if (data?.robot_online_status && data.screen_online_status) {
        setModel(true);
      } else {
        enqueueSnackbar("The Tebo is not Online.", { variant: "error" });
        dispatch(getProducts());
        dispatch(getSharedRobotList());
      }
    },
    [setModel]
  );

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
useEffect(() => {
  if((data.robot_online_status && data.screen_online_status)===1 ){
    setOnline(true)
  }
}, [data])

  const imageFilter = (data) => {
    let filterData = imageData.filter(
      (item) => Number(item.percentage) <= data
    );

    return filterData[0].image;
  };
  return (
    <Box sx={{ maxWidth: "290px" }}>
      <CustomCard
        sx={{
          maxWidth: 290,
          minWidth: 250,
          display: "flex",
          borderRadius: "20px",
          // boxShadow:
          //   "0px 2px 15px 2px #e5e4e4, 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
          flexDirection: "column",
          // height: "405px",
          height: "355px",

          justifyContent: "space-between",
        }}
      >
        <CardActionArea onClick={() => handleButton(data)}>
          <Box sx={{ position: "relative" }}>
            {console.log({ onlineData: data })}
            {online?<Tooltip title="Online" arrow>
            <Box
              sx={{
                background: "#38e053",
                width: "10px",
                height: "10px",
                position: "absolute",
                left: "13px",
                top: "11px",
                borderRadius: "10px",
              }}
            ></Box>
            </Tooltip>:<Tooltip title="Offline" arrow>
            <Box
              sx={{
                background: "#adadad",
                width: "10px",
                height: "10px",
                position: "absolute",
                left: "13px",
                top: "11px",
                borderRadius: "10px",
              }}
            ></Box>
            </Tooltip>}
            <CardMedia
              component="img"
              alt="green iguana"
              // height="140"
              // image={data.botImage}
              image="/images/robot.gif"
              sx={{ flex: 1 }}
            />

            {/* <Skeleton variant="rectangular" width={"100%"} height={261} /> */}

            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              flexDirection="column"
              sx={{
                mx: 1,
                my: 1,
                flex: 1,
                position: "absolute",
                top: "0px",
                right: "0px",
              }}
            >
              {/* data?.robot?.battery_charge? */}
              {/* <Box className="mavi" sx={{ width: "100%" }}> */}
              {data?.robot?.battery_charge ? (
                <Image
                  src={"/images/spark-green.png"}
                  width={18}
                  fit={"contain"}
                  alignItems="flex-end"
                  sx={{ pb: "5px" }}
                />
              ) : (
                <Box sx={{ height: "100%" }}></Box>
              )}
              <Box>
                <Box sx={{ height: "30px", pb: "5px" }}>
                  {data?.robot?.battery_charge ? (
                    <Image
                      src={imageFilter(data?.robot.battery_charge)}
                      width={18}
                      fit={"contain"}
                    />
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
              <Box sx={{ height: "10px" }}>
                {data?.percentage ? (
                  <Typography sx={{ fontSize: "10px" }}>
                    {data.percentage}%
                  </Typography>
                ) : null}
              </Box>
              {/* </Box> */}
            </Box>
          </Box>
        </CardActionArea>

        <Box
          sx={{
            // background: theme.palette.ButtonColor[900],
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            flex: 1,
            padding: "16px",
          }}
        >
          <IconBtn
            label="my button"
            onClick={handleConnect}
            icon="grommet-icons:connect"
            buttonStyle={{
              border: "solid 1px ",
              borderColor: theme.palette.ButtonColor[800],
              borderRadius: "6px",
              boxShadow: "20px 20px 43px #fcfcfc, -20px -20px 54px #ffffff",
              background: theme.palette.ButtonColor[600],
              mr: 1,
              color: ICON_COLOR,
              height: "45px",
              width: "45px",
            }}
          />
          <IconBtn
            label="my button"
            onClick={() => shareRobot(data.robot.uuid)}
            icon="ic:sharp-share"
            buttonStyle={{
              border: "solid 1px ",
              borderColor: theme.palette.ButtonColor[800],
              borderRadius: "6px",
              boxShadow: "20px 20px 43px #fcfcfc, -20px -20px 54px #ffffff",
              background: theme.palette.ButtonColor[600],
              ml: 1,
              height: "45px",
              width: "45px",
            }}
            IconColor={ICON_COLOR}
          />
        </Box>
      </CustomCard>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            sx={{ fontWeight: "bolder", color: theme.palette.text.secondary }}
          >
            Robot: {data?.nickname}
          </Typography>
          {/* <Typography sx={{ fontWeight: "bolder" }}></Typography> */}
        </Box>
        <Box sx={{ display: "flex", textAlign: "center" }}>
          {!sharedRobot && (
            <Typography>
              <Box
                component="span"
                sx={{
                  fontWeight: "bolder",
                  color: theme.palette.text.secondary,
                }}
              >
                Location:{" "}
              </Box>{" "}
              {data?.robot?.ownedrobot[0]?.location_name
                ?.match(/, (.*$)|- (.*)$/)
                ?.slice(1, 5)}
            </Typography>
          )}
        </Box>
      </Box>
      <ViewRobotModal
        data={data}
        model={model}
        setModel={setModel}
        sharedRobot={sharedRobot}
      />

      <ShareBotDialogs
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        nikName={data?.nickname}
        robotId={robotId}
      />
    </Box>
  );
}
