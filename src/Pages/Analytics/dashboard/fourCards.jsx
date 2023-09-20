import * as React from "react";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Card, Grid, Typography, Stack } from "@mui/material";

import { useNavigate } from "react-router";
import { useState } from "react";
import api from "../../api/api";
import { alpha, useTheme } from "@mui/material/styles";
import { bgGradient } from "../../utils/cssStyles";

const FourCards = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    bookingsCount: 0,
    consumerCount: 0,
    handlerCount: 0,
    serviceCount: 0,
  });
  const [page, setPage] = React.useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [refreshMagn, setRefreshMagn] = useState(0);
  const [open, setOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    pageSize,
    page,
  });

  const theme = useTheme();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const skip = page * pageSize;
        const response = await api.get(
          `/v1/admin/fourcards?skip=${skip}&limit=${pageSize}`
        );
        // console.log("response", response);
        setData(response.data);
        setRowCount(response.data.total);
        // console.log(response.data.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle the unauthorized error, for example, by logging the user out
          // window.location.replace("/login");
          return navigate("/login");
        }
      }
    }

    fetchData();
  }, [paginationModel, refreshMagn]);

  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Card
          sx={{
            display: "flex",
         
            backgroundColor: "white",
            borderRadius: "10px",
            marginRight: "8px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            p={5}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                  borderRadius: "50px",
                  color: theme.palette.info.main,
                  // backgroundColor:"#439DEE",

                  width: 80,
                  height: 80,

                  ...bgGradient({
                    direction: "to top",
                    startColor: `${theme.palette.info.main} 0%`,
                    endColor: `${alpha(theme.palette.info.main, 0)} 100%`,
                  }),
                }}
              >
                <PersonAddIcon
                  sx={{
                    fontSize: 50,
                  }}
                />
              </Stack>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            >
              <Typography variant="h5">Bookings</Typography>
              <Typography variant="h6" color="muted">
                {data.bookingsCount}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card
          sx={{
            display: "flex",
         
            backgroundColor: "white",
            borderRadius: "10px",
            marginRight: "8px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            p={5}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                  borderRadius: "50px",
                  color: theme.palette.success.light,
                  // backgroundColor:"#439DEE",

                  width: 80,
                  height: 80,

                  ...bgGradient({
                    direction: "to top",
                    startColor: `${theme.palette.success.light} 0%`,
                    endColor: `${alpha(theme.palette.success.light, 0)} 100%`,
                  }),
                }}
              >
                <PersonAddIcon
                  sx={{
                    fontSize: 50,
                  }}
                />
              </Stack>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            >
              <Typography variant="h5">Services</Typography>
              <Typography variant="h6" color="muted">
                {data.serviceCount}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} md={3}>
        <Card
          sx={{
            display: "flex",
         
            backgroundColor: "white",
            borderRadius: "10px",
            marginRight: "8px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            p={5}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                  borderRadius: "50px",
                  color: theme.palette.info.main,
                  // backgroundColor:"#439DEE",

                  width: 80,
                  height: 80,

                  ...bgGradient({
                    direction: "to top",
                    startColor: `${theme.palette.info.main} 0%`,
                    endColor: `${alpha(theme.palette.info.main, 0)} 100%`,
                  }),
                }}
              >
                <PersonAddIcon
                  sx={{
                    fontSize: 50,
                  }}
                />
              </Stack>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            >
              <Typography variant="h5">Consumers</Typography>
              <Typography variant="h6" color="muted">
                {data.consumerCount}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card
          sx={{
            display: "flex",
         
            backgroundColor: "white",
            borderRadius: "10px",
            marginRight: "8px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            p={5}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                  borderRadius: "50px",
                  color: theme.palette.info.main,
                  // backgroundColor:"#439DEE",

                  width: 80,
                  height: 80,

                  ...bgGradient({
                    direction: "to top",
                    startColor: `${theme.palette.info.main} 0%`,
                    endColor: `${alpha(theme.palette.info.main, 0)} 100%`,
                  }),
                }}
              >
                <PersonAddIcon
                  sx={{
                    fontSize: 50,
                  }}
                />
              </Stack>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
            >
              <Typography variant="h5">Handlers</Typography>
              <Typography variant="h6" color="muted">
               {data.handlerCount}
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    
    </Grid>
  );
};

export default FourCards;
