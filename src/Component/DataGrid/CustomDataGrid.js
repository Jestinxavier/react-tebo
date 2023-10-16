import * as React from "react";
import { Box, Card, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";

import { formatDateToYYYYMMDD } from "../../utils/momentformat";

export default function CustomDataGrid({ callLogs }) {
  // rows = callLogs?.map(data=>{
  //   return [{ ...data, uuid: data.robot.uuid }];
  // })

  const handleClick = () => {};

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "owner",
      headerName: "Last name",
      flex: 1,
    },
    {
      field: "uuid",
      headerName: "Tebo Name",
      flex: 1,
    },

    {
      field: "startDate",
      headerName: "Date",
      type: "number",
      flex: 1,
    },
    {
      field: "startTime",
      headerName: "Start Time",
      type: "number",
      flex: 1,
    },
    {
      field: "endTime",
      headerName: "End Time",
      type: "number",
      flex: 1,
    },
    {
      field: "Status",
      headerName: "Status",
      type: "number",
      flex: 1,
      renderCell: (parms) => {
        return (
          <IconButton size="large" aria-label="search" color="inherit">
            <Icon icon="mingcute:delete-line" />
          </IconButton>
        );
      },
    },

  ];
  return (
    <Box sx={{ height: 1600, width: "100%" }}>
      <Card>
        <DataGrid
          autoHeight
          rows={callLogs}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Card>
    </Box>
  );
}
