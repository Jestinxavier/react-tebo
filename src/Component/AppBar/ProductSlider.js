import { Box, Typography,Stack } from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ReactSimplyCarousel from "react-simply-carousel";
import RobotListingCard from "./RobotListingCard";
import Image from "mui-image";

// const mockData = [
//   {
//     botImage: "/images/robot.png",
//     chargingStatus: "",
//     PowerStatus: "/images/Eightypercentage.png",
//     percentage:'',
//     name: "Emily Garcia",
//     place: "New York, USA",
//   },
//   {
//     botImage: "/images/robot.png",
//     chargingStatus: "",
//     PowerStatus: "/images/Eightypercentage.png",
//     name: "Jacob Patel",
//     place: "London, UK",
//     percentage:""
//   },
//   {
//     botImage: "/images/robot.png",
//     chargingStatus: "/images/spark-green.png",
//     PowerStatus: "/images/tenpercentage.png",
//     name: "Samantha Lee",
//     place: "Sydney, Australia",
//     percentage:"10"
//   },
//   {
//     botImage: "/images/robot.png",
//     chargingStatus: "/images/spark-green.png",
//     PowerStatus: "/images/tenpercentage.png",
//     name: "Joshua Kim",
//     place: "Tokyo, Japan ",
//     percentage:"10"
//   },
//   {
//     botImage: "/images/robot.png",
//     chargingStatus: "/images/spark-green.png",
//     PowerStatus: "/images/charging.png",
//     name: "Olivia Singh",
//     place: "Paris, France",
//     percentage:"100"
//   },
// ];
function ProductSlider({ mockData, name }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const buttonHandler = (sliderId) => {
    if (sliderId === "forward" && activeSlideIndex < mockData.length) {
      return setActiveSlideIndex(activeSlideIndex + 1);
    } else {
      if (activeSlideIndex > 0) {
        return setActiveSlideIndex(activeSlideIndex - 1);
      }
    }
  };
  return (
    <Box>
      {mockData.length > 0 ? (
        <Box sx={{ my: 4 }}>
          <Box display="flex" sx={{ mb: 2 }}>
            <Typography>{name}</Typography>
            {/* <Box
              style={{
                border: "solid 1px",
                borderRadius: "20px",
                display: "flex",
                margin: "0px 20px",
                height: "20px",
                width: "20px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                buttonHandler("backward");
              }}
            >
              <Icon icon="fluent:ios-arrow-left-24-regular" height="15" />
            </Box>
            <Box
              style={{
                border: "solid 1px",
                borderRadius: "20px",
                display: "flex",
                margin: "0px 5px",
                height: "20px",
                mx: "3px",
                width: "20px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                buttonHandler("forward");
              }}
            >
              <Icon icon="fluent:ios-arrow-right-24-regular" height="15" />
            </Box> */}
          </Box>

          <div>
            <ReactSimplyCarousel
              activeSlideIndex={activeSlideIndex}
              // forwardBtnProps={{
              //   style:{
              //     display:'none'
              //   }
              // }}
              // backwardBtnProps={{
              //   style:{
              //     display:'none'
              //   }
              // }}

              forwardBtnProps={{
                //here you can also pass className, or any other button element attributes
                style: {
                  alignSelf: "center",
                  background: "black",
                  border: "none",
                  borderRadius: "50%",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  height: 30,
                  lineHeight: 1,
                  textAlign: "center",
                  width: 30,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                },
                children: <Icon icon="ic:sharp-keyboard-arrow-right" />,
              }}
              backwardBtnProps={{
                //here you can also pass className, or any other button element attributes
                style: {
                  alignSelf: "center",
                  background: "black",
                  border: "none",
                  borderRadius: "50%",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  height: 30,
                  lineHeight: 1,
                  textAlign: "center",
                  width: 30,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center',
                },
                children: <Icon icon="ic:sharp-keyboard-arrow-left" />,
              }}
              onRequestChange={(e) => {
                buttonHandler(e);
              }}
              containerProps={{
                style: {
                  width: "100%",
                  justifyContent: "flex-start",
                  userSelect: "none",
                },
              }}
              itemsToShow={1}
              itemsToScroll={1}
              responsiveProps={[
                {
                  itemsToShow: 2,
                  itemsToScroll: 1,
                  // minWidth: 768,
                  minWidth: 468,
                },
              ]}
              speed={400}
              easing="linear"
            >
              {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}

              {mockData.map((data) => (
                <RobotListingCard data={data} />
              ))}
            </ReactSimplyCarousel>
          </div>
        </Box>
      ) : (
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: "flex" }}>
            <Typography>{name}</Typography>
            <Box
              style={{
                border: "solid 1px",
                borderRadius: "20px",
                display: "flex",
                margin: "0px 20px",
                height: "20px",
                width: "20px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                buttonHandler("backward");
              }}
            >
              <Icon icon="fluent:ios-arrow-left-24-regular" height="15" />
            </Box>
            <Box
              style={{
                border: "solid 1px",
                borderRadius: "20px",
                display: "flex",
                margin: "0px 5px",
                height: "20px",
                mx: "3px",
                width: "20px",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                buttonHandler("forward");
              }}
            >
              <Icon icon="fluent:ios-arrow-right-24-regular" height="15" />
            </Box>
          </Box>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{    height: '300px'}}
          >
            <Typography>There is no robot to share.</Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default ProductSlider;
