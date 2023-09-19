import * as React from 'react';
import {Box,Card} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'owner',
    headerName: 'Last name',

  },
  {
    field: 'uuid',
    headerName: 'TeboName',

  },

  {
    field: 'session_start',
    headerName: 'startTime',
    type: 'number',

  },
  {
    field: 'session_end',
    headerName: 'entTime',
    type: 'number',
 

  },
  

  {
    field: 'updated_at',
    headerName: 'Date',
    
  }
];



export default function CustomDataGrid({callLogs}) {
  // rows = callLogs?.map(data=>{
  //   return [{ ...data, uuid: data.robot.uuid }];
  // })
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Card>  
      <DataGrid
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