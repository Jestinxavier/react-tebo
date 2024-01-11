import React, { useEffect } from "react";
import PersistentDrawerRight from "../Component/AppBar/PersistentDrawerRight";
import {
  Box,
  Fade,
  Typography,
  CardMedia,
  Card,
  Grid,
  Stack,
} from "@mui/material";
import { AnimatedList } from "react-animated-list";

import { useDrawerContext } from "../Context/DrawerContext";
import { Heading, CustomContainer } from "../Component/CustomComponent";
import { useTheme } from "@mui/material/styles";
import { getTicket } from "../redux/slices/robot";
import { useSelector, dispatch } from "../redux/store";
import { SupportForm } from "../Component/Support";
import OceanWaves from "../Component/Animation/OceanWaves";
import ListTicket from "../Component/Support/ListTicket";

function Support() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
  } = useDrawerContext();
  const theme = useTheme();
  const ListData = useSelector((state) => state.robot.listTicket);

  useEffect(() => {
    dispatch(getTicket());
  }, []);

  console.log(ListData, "ListData****");

  return (
    <Box>
      <PersistentDrawerRight
        open={open}
        setOpen={setOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        setModalOpen={setModalOpen}
      />
      <CustomContainer  sx={{mx:8}}>
        <Heading>Support</Heading>
        {/* <Card sx={{ padding: 5 }}> */}
        <SupportForm />
        {/* </Card> */}
        {/* {ListData && ( */}
        {/* <AnimatedList animation={"grow"}> */}
        {ListData?.default_tickets?.length>0&&<Typography variant="h6">All FAQ</Typography>}
        
            {ListData?.default_tickets?.map((data, index) => (
              <ListTicket data={data} index={index} key={index} /> // Added key prop
            ))}
            {ListData?.answered?.length>0&&<Typography variant="h6">Answered</Typography>}
            {ListData?.answered?.map((data, index) => (
              <ListTicket data={data} index={index} key={index} /> // Added key prop
            ))}
            
            {ListData?.not_answered?.length>0&&<Typography variant="h6">Not Answered</Typography>}
            {ListData?.not_answered?.map((data, index) => (
              <ListTicket data={data} index={index} key={index} /> // Added key prop
            ))}
           {/* </AnimatedList> */}
        {/* )} */}
        
      </CustomContainer>
    </Box>
  );
}

export default Support;
