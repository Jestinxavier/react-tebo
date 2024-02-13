// components
import { Card, CardHeader, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import moment from "moment";

// ----------------------------------------------------------------------

export default function CallsCountToRobotsClone({ robotsData, title, subheader }) {
  const theme = useTheme();
  const [Data, setData] = useState([]);

  useEffect(() => {
    setData(robotsData);
  }, [robotsData]);

  return (
    <Card sx={{ mt: 3,maxHeight: '500px', minHeight: '500px' }}>
      <CardHeader title={title} subheader={subheader} />
      <Grid container spacing={3} sx={{mt: 3,  maxHeight: '300px', minHeight: '300px',
              overflow: 'auto'}} >

        {Data?.map((item) => (
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 1,m:1     }}>
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
              >
                <Typography variant="p">{item?.robot}</Typography>
                <Typography color="text.secondary" variant="h6" component="h6">{item?.count}</Typography>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
