import SideBar from "../../components/sidebar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Header from "../../components/Header";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../../api/api";
import { constants } from "../../constants";
import { Box } from "@mui/material";

const ActiveUserGraph = () => {
  const navigate = useNavigate();
  const [gridData, setGridData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [refreshMagn, setRefreshMagn] = useState(0);
  const [open, setOpen] = useState(false);
  const [chartData, setChartData] = useState({
    labels:[],
    datasets: [
      {
      
        data: gridData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
         
        ],
        borderColor: [
          "rgb(255, 99, 132)",
         
        ],
        borderWidth: 1,
      },
    ],
  });
  const [paginationModel, setPaginationModel] = useState({
    pageSize,
    page,
  });

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale,
    BarElement
  );
//   let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','ser','sers'];
  // const labels = Utils.months({count: 7});
 
  let options = {
    plugins: {
        title: {
          display: false, // Hide the title
        },
        legend: {
            display: false, // Hide the legend
          },
      },
    scales: {
      y: {
        beginAtZero: true,
      
      },
      x: {
        grid: {
          display: false, // Hide vertical lines
        },
      },
    },
  };

  const handlePaginationChange = (params) => {
    if (params.pageSize == pageSize) {
      setPage(params.page);
      console.log("page", page);
    } else {
      setPage(0);
      setPageSize(params.pageSize);
    }
    setPaginationModel(params);
  };

  useEffect(() => {
    async function fetchGridData() {
      try {
        const skip = page * pageSize;
        const response = await api.get(
          `/v1/admin/useractivitygraph`
        );
        let dataValue = [];
        let labels = []
        // console.log('length',response.data.length-1,response.data[response.data.length-1].value)
        for(let i=response.data.length-1;i>=0;i--){
            // console.log('looping')
            dataValue.push(response.data[i].value);
            // console.log(response.data[i].month,constants.month[response.data[i].month])
            labels.push(constants.month[response.data[i].month])
        }
        // console.log("response", response.data,response.data.length);
        // setGridData(dataValue);
        
        // const chart = this.chartReference.current.chartInstance;
        // chart.data.datasets[0].data = dataValue;

        // // chart.data.labels=labels;
        // chart.update();
        console.log('labels',labels)
        setChartData((prevData) => ({
            ...prevData,
            labels: labels,
            datasets: [
                {
                  ...prevData.datasets[0],
                  data: dataValue,
                },
              ],
          }));

      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle the unauthorized error, for example, by logging the user out
          // window.location.replace("/login");
          return navigate("/login");
        }
      }
    }

    fetchGridData();
  }, [paginationModel, refreshMagn]);

  return (
    <>
    <Box backgroundColor="#f7d0f5" borderRadius="10px" border="1px solid pink" padding="5px" marginLeft="3px">
     <Box display="flex" justifyContent="center" > 
        <Typography variant="h6">
            Bookings
        </Typography>
         </Box>
      <Bar options={options} data={chartData} />
      </Box>
    </>
  );
};

export default ActiveUserGraph;
