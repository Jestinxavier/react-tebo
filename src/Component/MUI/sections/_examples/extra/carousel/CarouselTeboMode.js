import PropTypes from 'prop-types';
import { useRef } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Paper, Link, CardContent } from '@mui/material';
// utils
// import { bgGradient } from '../../../../utils/cssStyles';
import { bgGradient } from '../../../../../../utils/cssStyles';


// components
import Image from '../../../../image';
import Iconify from '../../../../iconify';
import TextMaxLine from '../../../../text-max-line';
import Carousel, { CarouselArrows } from '../../../../carousel';
import RobotListingCard from "../../../../../AppBar/RobotListingCard";


// ----------------------------------------------------------------------

CarouselTeboMode.propTypes = {
  data: PropTypes.array,
};

export default function CarouselTeboMode({mockData,sharedRobot }) {
  const carouselRef = useRef(null);

  // mockData

 
 
  const theme = useTheme();

  const carouselSettings = {
    slidesToShow: mockData.length>3?3:mockData.length,
    centerMode: true,
    Infinity: mockData.length>3,
    centerPadding: '60px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows
    
        filled
        icon="iconamoon:arrow-right-2-bold"
        onNext={handleNext}
        onPrevious={handlePrev}
      >
        <Carousel ref={carouselRef} {...carouselSettings} >
          {mockData?.map((item,id) => (
           
            <Box key={id} sx={{ px: 1 }}>
               
              <CarouselItem  item={item} sharedRobot={sharedRobot}/>
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
};

function CarouselItem({ item,sharedRobot }) {
  const theme = useTheme();

  // const { image, title } = item;

  return (
    <RobotListingCard data={item} sharedRobot={sharedRobot}/>
  );
}


