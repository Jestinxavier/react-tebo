import React from 'react';
import Chart, { useChart } from '../../../../Component/MUI/chart';
import { useTheme } from  '@mui/material/styles';

// ----------------------------------------------------------------------

const series = [
  { name: 'series1', data: [31, 40, 28, 51, 42, 109, 100] },
  // { name: 'series2', data: [11, 32, 45, 32, 34, 52, 41] },
];

export default function BactoryLevelChartArea() { 
  const theme = useTheme();

  const chartOptions = useChart({
    xaxis: {
      
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],

    },
    colors: [theme.palette.secondary.light], // Change these to your desired colors

  });

  return <Chart type="area" series={series} options={chartOptions} height={320} />;
}
