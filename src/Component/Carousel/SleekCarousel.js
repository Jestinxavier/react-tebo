import React from "react";
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import { makeStyles } from "@mui/styles"; // Import makeStyles from the correct package

const useStyles = makeStyles((theme) => ({
  slide: {
    /* Define your slide styles here */
  },
  slideTitle: {
    /* Define your slide title styles here */
  },
}));

const Slide = ({ title }) => {
  const classes = useStyles(); // Use the useStyles hook to get the classes
  return (
    <Box className={classes.slide}>
      <Typography className={classes.slideTitle}>{title}</Typography>
    </Box>
  );
};

export default function SleekCarousel() {
  const classes = useStyles(); // Get the styles for the component
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="App">
      <Box m={20}>
        <Box
          className={classes.slickStyles} // Apply your custom styles using className
        >
          <Slider {...settings}>
            <Slide title={"スライド１"} />
            <Slide title={"スライド２"} />
            <Slide title={"スライド３"} />
            <Slide title={"スライド４"} />
            <Slide title={"スライド５"} />
          </Slider>
        </Box>
      </Box>
    </div>
  );
}
