// components
import { Card, CardHeader } from "@mui/material";
import Chart, { useChart } from "../MUI/chart";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import moment from "moment";

// ----------------------------------------------------------------------

const series = [
  { name: "series1", data: [31, 40, 28, 51, 42, 109, 100] },
  { name: "series2", data: [11, 32, 45, 32, 34, 52, 41] },
];

export default function AreaGraph({ title, subheader, graphData }) {
  const theme = useTheme();
  const [graphDate, setGraphDate] = useState([]);
  const [processedGraphData, setProcessedGraphData] = useState([]);

  useEffect(() => {
    console.log({ graphData });
    const formattedData = graphData?.map((item) => {
      const formattedDate = moment(item.date, "YYYY-MM-DD").toISOString();
      return formattedDate;
    });
    const filterData = graphData?.map((item) =>item.total_calls);

    console.log({ filterData });
    setProcessedGraphData([{ name: "Tebo",data:filterData}])
    setGraphDate(formattedData);
  }, [graphData]);

  const chartOptions = useChart({
    colors: [theme?.palette?.success?.main, theme?.palette?.warning?.main],

    xaxis: {
      type: "datetime",
      categories: graphDate,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      {graphDate?.length > 0 && (
        <Chart
          type="area"
          series={processedGraphData}
          options={chartOptions}
          height={320}
        />
      )}
    </Card>
  );
}
