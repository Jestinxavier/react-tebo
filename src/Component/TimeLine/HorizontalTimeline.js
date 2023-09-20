import  React,{useState} from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import {Typography,Box} from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import {useTheme} from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import Loader from '../Loader/Loader'

export default function HorizontalTimeline({status}) {
  const theme = useTheme();
  // const [status, setStatus] = useState({
  //   sentRequest:true,
  //   approval:true,
  //   userApproval:true,
  // })
  return (
    <Box width="500px">
    <Timeline position="alternate">
      <TimelineItem>
        {/* <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          9:30 am
        </TimelineOppositeContent> */}
        <TimelineSeparator >
          <TimelineConnector sx={{bgcolor: 'success.main'}} />
          <TimelineDot color='success' >
            <MarkEmailReadIcon />
          </TimelineDot>
          <TimelineConnector sx={{bgcolor: 'success.main'}}/>
        </TimelineSeparator>

        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
          Request
          </Typography>
          <Typography>Check the Tebo for establishing the connection</Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
       <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
          width={90}
          
        >
        
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector  sx={{bgcolor: status.approval?'success.main':"primary.main"}} />
          <TimelineDot color={status.approval?"success":"primary"}>
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector sx={{bgcolor: status.approval?'success.main':"primary.main"}}  />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="h6" component="span">
            Approval
          </Typography>
          <Typography>Check the Tebo for conformation</Typography>
        </TimelineContent>
      </TimelineItem>

     { status.pending?<TimelineItem>
       <TimelineOppositeContent
          sx={{ m: 'auto 0' }}
          align="right"
          variant="body2"
          color="text.secondary"
          width={90}
          
        >
        
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector  sx={{bgcolor: status.userApproval?'success.main':"error.main"}} />
          <TimelineDot color={status.userApproval?"success":"error"}>
            {status.userApproval?<CheckCircleOutlineIcon />:<ErrorIcon />}
          </TimelineDot>
          <TimelineConnector sx={{bgcolor: status.userApproval?'success.main':"error.main"}}  />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
          <Typography variant="p" component="span">
            Connection
          </Typography>
          <Typography>{status.userApproval?'Approve':'Rejucted'}</Typography>
        </TimelineContent>
      </TimelineItem>:
      <TimelineItem>
      <TimelineOppositeContent
         sx={{ m: 'auto 0' }}
         align="right"
         variant="body2"
         color="text.secondary"
         width={90}
         
       >
       
       </TimelineOppositeContent>
       <TimelineSeparator>
         <TimelineConnector  sx={{bgcolor:"primary.main"}} />
         <TimelineDot color={"primary"}>
         {  status.userApproval?<ErrorIcon />:<Loader type='balls' color={theme.palette.error.light} height={22} width={22} />}
         </TimelineDot>
         <TimelineConnector sx={{bgcolor:"primary.main"}}  />
       </TimelineSeparator>
       <TimelineContent sx={{ py: '12px', px: 2 }}>
         <Typography variant="p" component="span">
           Connection
         </Typography>
         <Typography >Wating...</Typography>
       </TimelineContent>
     </TimelineItem>
      
      }
    </Timeline>
    </Box>
  );
}