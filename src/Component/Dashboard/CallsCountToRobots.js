// components
import { Card, CardHeader, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import moment from "moment";

// ----------------------------------------------------------------------

export default function CallsCountToRobots({ robotsData, title, subheader }) {
  const theme = useTheme();
  const [Data, setData] = useState([]);

  useEffect(() => {
    setData(robotsData);
  }, [robotsData]);

  return (
    <Card sx={{ mt: 3, p: 2 }}>
      <CardHeader title={title} subheader={subheader} />
      <Grid container spacing={3} sx={{mt: 3}}>
        {Data?.map((item) => (
          <Grid item xs={12} md={3}>
            <Card sx={{ p: 5,maxHeight: '500px', minHeight: '500px' }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="h6">{item?.robot}</Typography>
                <Typography color="text.secondary" variant="h6" component="h6">{item?.count}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
