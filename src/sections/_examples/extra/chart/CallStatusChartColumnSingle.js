// components
import Chart, { useChart } from '../../../../Component/MUI/chart';
// ----------------------------------------------------------------------
import { useTheme } from  '@mui/material/styles';

const series = [
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
];

export default function CallStatusChartColumnSingle() {
  const theme = useTheme();

  const chartOptions = useChart({
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    colors: [theme.palette.secondary.main], // Change these to your desired colors

    tooltip: {
      y: {
        formatter: (value) => `$ ${value} thousands`,
      },
    },
  });

  return <Chart type="bar" series={series} options={chartOptions} height={320} />;
}
