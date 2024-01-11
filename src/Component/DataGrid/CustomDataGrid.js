import  React,{useState} from "react";
import { Box, Card, Button,Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import {dispatch  } from "../../redux/store"
import {getCallLogs} from "../../redux/slices/robot"
import { useSnackbar } from '../../Component/MUI/snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDilogbox from './DeleteDilogbox'

import { formatDateToYYYYMMDD, } from "../../utils/momentformat";
import axios from "../../utils/axios";

export default function CustomDataGrid({ callLogs }) {
  // rows = callLogs?.map(data=>{
  //   return [{ ...data, uuid: data.robot.uuid }];
  // })

  const {enqueueSnackbar} = useSnackbar()
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // Function to open the dialog
  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  // Function to close the dialog
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const handleDelete = (logId,robotUuid,clearAll) => {
    // console.log(logId,robotUuid,clearAll);

    axios.post("/owner/clear-call-logs",{
      
        "log_id":logId,
        "robot_uuid":robotUuid,
        "clear_all":clearAll
      
    }).then(()=>{
     dispatch(getCallLogs())
     enqueueSnackbar("Deleted successfully!")
    }).catch((err)=>{
      enqueueSnackbar("Delete is not possible",{variant:'error'})
    })
    

  };
  
  
  
  const deleteLogs = (parms) => {
    console.log(parms.robot.owned_robot[0].nickname,"parms");

    Swal.fire({
      title: `Do you want to Delete the Call Log of ${parms.robot.owned_robot[0].nickname} ?`,
      icon: 'info',
     
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Delete!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        'cancel',

      cancelButtonAriaLabel: 'Thumbs down'
    }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    // Swal.fire('Saved!', '', 'success')
    handleDelete(parms.id,parms.uuid,false)
  }
});
   
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "usedUserName",
      headerName: "Name",
      // flex: 1,
      width: 150
    },
    {
      field: "nickname",
      headerName: "Tebo Name",
      // flex: 1,
      width: 150

    },

    {   
      field: "startDate",
      headerName: "Date",
      type: "number",
      // flex: 1,
      width: 150

    },
    {
      field: "startTime",
      headerName: "Start Time",
      type: "number",
      // flex: 1,
      width: 150,
    },
    {
      field: "endTime",
      headerName: "End Time",
      type: "number",
      // flex: 1,
      width: 150,
    },
    {
      field: "Status",
      headerName: "Delete Logs",
      type: "number",
      // flex: 1,
      width: 150,
      renderCell: (parms) => {
        return (
          <IconButton size="large" onClick={()=>deleteLogs(parms.row)} aria-label="search" color="inherit">
            <Icon icon="mingcute:delete-line" />
          </IconButton>
        );
      },
    },

  ];
  return (
    <Box sx={{ height: 1600, width: "100%" }}>
    <Grid container justifyContent="flex-end" mb={5} mt={{xs:3}}>
      <Grid item>
        <Button
        onClick={openDeleteDialog}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Delete All
        </Button>
      </Grid>
    </Grid>
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
      <DeleteDilogbox handleDelete={handleDelete} open={isDeleteDialogOpen} onClose={closeDeleteDialog} />
    </Box>
  );
}
