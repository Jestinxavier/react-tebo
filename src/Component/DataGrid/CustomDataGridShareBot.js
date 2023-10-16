import * as React from "react";
import { Box, Card, Button, Popper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import axios from "../../utils/axios";
import { formatDateToYYYYMMDD } from "../../utils/momentformat";
import {dispatch} from '../../redux/store'
import { useSpring, animated } from "@react-spring/web";
import Swal from "sweetalert2";
import { getSharedToRobot } from "../../redux/slices/robot";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});
const stopSharingTemporarily = (parms) => {
  axios
    .post("/owner/stop-sharing", { sharing_with_id: parms.id })
    .then((data) => {
      dispatch(getSharedToRobot())
    });
};

const stopSharingPermanently = (parms) => {
  axios
    .post("/owner/stop-permanently", { sharing_with_id: parms.id })
    .then((data) => {
      dispatch(getSharedToRobot())
    });
};

const stopSharing = (parms) => {
  Swal.fire({
    title: "Do you want to stop sharing the robot?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Stop Temporarily",
    denyButtonText: `Stop Permanently`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      stopSharingTemporarily(parms)
      Swal.fire("The Tebo is temporarily stopped", "", "success");
    } else if (result.isDenied) {
      stopSharingPermanently(parms)
      Swal.fire("The Tebo is permanently stopped", "", "success");
    }
  });
};

export default function CustomDataGridShareBot({ ShareRobotList }) {
  // rows = callLogs?.map(data=>{
  //   return [{ ...data, uuid: data.robot.uuid }];
  // })
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "spring-popper" : undefined;

  // const handleClick = () => {};

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "location_name",
      headerName: "Location",
      flex: 1,
    },

    {
      field: "robotName",
      headerName: "Tebo Name",
      flex: 1,
    },
    // {
    //   field: "robotId",
    //   headerName: "Robot Id",
    //   type: "number",
    //   flex: 1,
    // },
    {
      field: "Status",
      headerName: "Status",
      type: "number",
      flex: 1,
      renderCell: (parms) => {
        return (
          <IconButton
            onClick={() => {
              stopSharing(parms);
            }}
            size="large"
            aria-label="search"
            color="inherit"
          >
            <Icon icon="carbon:stop-outline" />
          </IconButton>
        );
      },
    },
  ];

  <Popper id={id} open={open} anchorEl={anchorEl} transition>
    {({ TransitionProps }) => (
      <Fade {...TransitionProps}>
        <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
          The content of the Popper.
        </Box>
      </Fade>
    )}
  </Popper>;
  return (
    <Box sx={{ height: 1600, width: "100%" }}>
      <Card>
        <DataGrid
          autoHeight
          rows={ShareRobotList}
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
