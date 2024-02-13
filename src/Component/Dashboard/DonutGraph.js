import PropTypes from "prop-types";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
// utils
import { fNumber } from "../../utils/formatNumber";
// components
import Chart, { useChart } from "../MUI/chart";
import { useEffect, useState } from "react";


const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 72;

const StyledChart = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  // marginTop: theme.spacing(5),  // Use consistent spacing
  "& .apexcharts-canvas svg": {
    height: CHART_HEIGHT,
  },
  "& .apexcharts-canvas svg, .apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

DonutGraph.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
  subheader: PropTypes.string,
  ownedRobotsCount: PropTypes.object,
  graphLabel:PropTypes.array,

};

export default function DonutGraph({
  ownedRobotsCount,
  title,
  subheader,
  chart,graphLabel,
  ...other
}) {
  const [series, setSeries] = useState([])
  const [label, setLabel] = useState([])

  const theme = useTheme();
  useEffect(() => {

    if (ownedRobotsCount) {
      setSeries([
        ownedRobotsCount?.completed_calls,
        ownedRobotsCount?.incompleted_calls,
       
      ]);
    }
  }, [ownedRobotsCount]);

  useEffect(() => {
    if(graphLabel){
    setLabel(graphLabel)
    }
  }, [graphLabel])

  const chartOptions = useChart({
    labels:label,
    colors: [theme?.palette?.blueGray[700], theme?.palette?.secondary.main],

    stroke: {
      show: false,
    },
    legend: {
      horizontalAlign: "center",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "90%",
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      
      <StyledChart dir="ltr">
        {series.length > 0 && (
          <Chart
            type="donut"
            series={series}
            options={chartOptions}
            height={300}
          />
        )}
      </StyledChart>
    </Card>
  );
}
