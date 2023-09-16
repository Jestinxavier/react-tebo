import * as React from 'react';
import {Box,Card} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'TeboName',
    headerName: 'TeboName',
    width: 150,
    editable: true,
  },

  {
    field: 'startTime',
    headerName: 'startTime',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'entTime',
    headerName: 'entTime',
    type: 'number',
    width: 110,
    editable: true,
  },
  

  {
    field: 'Date',
    headerName: 'Date',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    
  }
];

const rows = [
  { id: 1, name: 'Snow', TeboName: 'Jon', entTime:"1:30:00" ,Date:"12-12-2020" ,startTime:"8:30:00"  },
  { id: 2, name: 'Lannister', TeboName: 'Cersei', entTime:"1:30:00" ,Date:"12-12-2020" ,startTime:"8:30:00"  },
  { id: 3, name: 'Lannister', TeboName: 'Jaime', entTime:"1:30:00" ,Date:"12-12-2020" ,startTime:"8:30:00"  },
  { id: 4, name: 'Stark', TeboName: 'Arya', entTime:"1:30:00" ,Date:"12-12-2020" ,startTime:"8:30:00"  },
  { id: 5, name: 'Targaryen', TeboName: 'Daenerys', entTime:"1:30:00" ,Date:"12-12-2020" ,startTime:"8:30:00"  },
  { id: 6, name: 'Melisandre', TeboName: null, entTime:"1:30:00" ,Date:"12-12-2020" ,startTime:"8:30:00"  },
  { id: 7, name: 'Clifford', TeboName: 'Ferrara', entTime:"1:30:00" ,Date:"12-12-2020" ,startTime:"8:30:00"  },
  { id: 8, name: 'Frances', TeboName: 'Rossini', entTime:"1:30:00" ,Date:"12-12-2020" ,startTime:"8:30:00"  },
  { id: 9, name: 'Roxie', TeboName: 'Harvey', entTime:"1:30:00" ,Date:"12-12-2020" ,startTime: 65 },
];

export default function CustomDataGrid() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Card>
      <DataGrid
        rows={rows}
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