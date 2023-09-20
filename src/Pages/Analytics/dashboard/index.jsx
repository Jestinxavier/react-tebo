import { Grid,Card,Container,CardHeader,CardContent } from "@mui/material";
import Header from "../../components/Header";
import BookingsGraph from "./bookingsGraph";
import FourCards from "./fourCards";
import ActiveUserGraph from "./activeUsers";
import {
  ChartPie,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartMixed,
  ChartDonut,
  ChartsRadarBar,
  ChartRadialBar,
  ChartColumnSingle,
  ChartColumnStacked,
  ChartColumnNegative,
  ChartColumnMultiple,
} from '../../sections/_examples/extra/chart';

const Dashboard = () => {
  

  return (
    <>
      <Header title="dashboard" />
      <FourCards />
     <Grid container style={{height:"50vh",marginTop:"20px"}}>
        <Grid item xs="6">
        <BookingsGraph />

        </Grid>
        <Grid item xs="6">
  <ActiveUserGraph /> 
            
        </Grid>
     </Grid>

     <Container sx={{ my: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Area" />
              <CardContent>
                <ChartArea />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Line" />
              <CardContent>
                <ChartLine />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Column Single" />
              <CardContent>
                <ChartColumnSingle />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Column Multiple" />
              <CardContent>
                <ChartColumnMultiple />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Column Stacked" />
              <CardContent>
                <ChartColumnStacked />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Column Negative" />
              <CardContent>
                <ChartColumnNegative />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Bar" />
              <CardContent>
                <ChartBar />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Mixed" />
              <CardContent>
                <ChartMixed />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Pie" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartPie />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Donut" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartDonut />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Radial Bar" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartRadialBar />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Radar" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartsRadarBar />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
