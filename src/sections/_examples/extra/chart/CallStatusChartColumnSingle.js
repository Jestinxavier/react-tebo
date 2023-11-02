// components
import Chart, { useChart } from '../../../../Component/MUI/chart';
// ----------------------------------------------------------------------
import { useTheme } from  '@mui/material/styles';


const series = [
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
];

export default function CallStatusChartColumnSingle({
  filterAnalyticData,
xaxisData
}) {
  const theme = useTheme();

  // const chartOptions = useChart({
  //    legend: {
  //     itemMargin: {
  //       horizontal: 8,
  //     },
  //     // position: 'right',
  //     // offsetY: 20,
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: '50%',
        
  //     },
  //   },
  //   stroke: {
  //     show: false,
  //   },
  //   xaxis: {
  //     categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
  //   },
  //   colors: [theme.palette.secondary.main], // Change these to your desired colors

  //   tooltip: {
  //     y: {
  //       formatter: (value) => `$ ${value} thousands`,
  //     },
  //   },
  // });

  const chartOptions = useChart({
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      // categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      categories:xaxisData,
    },
    colors: [theme.palette.secondary.main], // Change these to your desired colors

    tooltip: {
      y: {
        formatter: (value) => `$ ${value} thousands`,
      },
    },
    plotOptions: { bar: { columnWidth: '50%' } },
  });

  return <Chart type="bar" series={[{data:filterAnalyticData}]} options={chartOptions} height={320} />;
}
