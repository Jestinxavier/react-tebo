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
import ListTicket from "../Component/Support/ListTicket"



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
  const ListData = useSelector((state) => state.robot.listTicket.tickets);

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
        <CustomContainer>
          <Heading>Support</Heading>
          <Card sx={{ padding: 5 }}>
            <SupportForm />
          </Card>
         {ListData&&<AnimatedList animation={"grow"}>

          {ListData?.map((data, index) => (
            <ListTicket data={data} index={index} key={index} /> // Added key prop
          ))}
           </AnimatedList>}
        </CustomContainer>
      </Box>
    );
  }
  
  


export default Support;
