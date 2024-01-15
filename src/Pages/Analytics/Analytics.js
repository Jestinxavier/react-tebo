import React, { useEffect } from "react";
import PersistentDrawerRight from "../../Component/AppBar/PersistentDrawerRight";
import {
  Box,
  Fade,
  Typography,
  Container,
  Card,
  Grid,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useDrawerContext } from "../../Context/DrawerContext";
import { Heading, CustomContainer } from "../../Component/CustomComponent";

import {
  // ChartPie,
  // ChartBar,
  // ChartLine,
  // ChartArea,
  // ChartMixed,
  // ChartDonut,
  // ChartsRadarBar,
  // ChartRadialBar,
  // ChartColumnSingle,
  // ChartColumnStacked,
  // ChartColumnNegative,
  // ChartColumnMultiple,
  BactoryLevelChartArea,
  CallStatusChartColumnSingle,
} from "../../sections/_examples/extra/chart";
// import { DemoChartsPage } from "../../Component/components/extra/DemoChartsPage";
import { dispatch, useSelector } from "../../redux/store";

import { SettingsForm } from "../../Component/Settings";
import { getCallAnalytics } from "../../redux/slices/robot";
import TotalRobot from "../../Component/Dashboard/TotalRobot";
import DonutGraph from "../../Component/Dashboard/DonutGraph";
import PieGraph from "../../Component/Dashboard/PieGraph";
import AreaGraph from "../../Component/Dashboard/AreaGraph";
import CallsCountToRobots from "../../Component/Dashboard/CallsCountToRobots";

function Analytics() {
  const {
    handleDrawerOpen,
    handleDrawerClose,
    setModalOpen,
    open,
    setOpen,
    modalOpen,
  } = useDrawerContext();
  const robotState = useSelector((state) => state?.robot?.totalAnalytics);

  useEffect(() => {
    dispatch(getCallAnalytics());
  }, []);

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
        <Heading>Analytics</Heading>
        <Container sx={{ my: 10 }}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Battery Charger Analytics" />
                <CardContent>
                  <BactoryLevelChartArea />
                </CardContent>
              </Card>
            </Grid> */}
            {console.log({ robotState })}
            <Grid item xs={12} md={4} spacing={3}>
              <TotalRobot ownedRobotsCount={robotState?.owned_robots_count} />
              <Box sx={{ mt: 3 }}>
                <DonutGraph
                  ownedRobotsCount={robotState?.total_calls_from_beginning}
                  title={"Total Calls From Beginning"}
                  subheader={
                    "Number of calls maded by the user from the beginning to now."
                  }
                  graphLabel={["Completed Calls", "Incomplete Calls"]}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <PieGraph
                ownedRobotsCount={robotState?.calls_within_an_interval}
                title={"Monthly Call Activity Overview"}
                subheader={
                  "The number of calls made this month or within a specific interval."
                }
                graphLabel={["Completed Calls", "Incomplete Calls"]}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <AreaGraph
                title={"Monthly Call Count Overview"}
                subheader={
                  "The number of calls made this month or within a specific interval."
                }
                graphData={robotState?.line_graph?.graph_data}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <CallsCountToRobots robotsData={robotState?.calls_count_to_robots} title={"Monthly Call Count Overview"}
                subheader={
                  "The number of calls made this month or within a specific interval."
                }/>
            </Grid>

            {/* <Grid item xs={12} md={12}>
              <Card dir="ltr">
                <CardHeader title="Call Analytics" />
                {!(robotState?.xaxisData?.length > 0) ? (
                  <Typography p={4} textAlign="center" color="error.main">
                    No analytics data for your account, Please add a tebo to
                    generate the analytics.
                  </Typography>
                ) : (
                  <CardContent>
                    {robotState && (
                      <CallStatusChartColumnSingle
                        filterAnalyticData={robotState?.filterAnalyticData}
                        xaxisData={robotState?.xaxisData}
                      />
                    )}
                  </CardContent>
                )}
              </Card>
            </Grid> */}
          </Grid>
        </Container>
      </CustomContainer>
    </Box>
  );
}

export default Analytics;
