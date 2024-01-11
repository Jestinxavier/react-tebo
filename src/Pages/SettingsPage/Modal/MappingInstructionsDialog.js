import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { instruction } from '../../../Constant/constantText';
import Iconify from "../../../Component/MUI/iconify/Iconify";


const InstrucationComponent = ()=>{
  return(
  <div>
         {instruction.map((data,index)=>{
      const heading  = Object.keys(data)[0]?.replace(/_/g," ")
      const key = Object.keys(data)[0]
      const content = data[key]
          return(
         <div style={{marginTop:10,marginBottom:10}}>
            <strong>{heading}:</strong> {
              
              content.map(contentData =><p style={{paddingLeft:3}}>{contentData}</p>
         )}
          </div>)})}

          {/* ... Additional instructions go here ... */}
        </div>)
}
const MappingInstructionsDialog = ({ open, onClose,AddMap }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md" // Adjust the width as needed
      fullScreen
    >
      <DialogTitle>Robot Mapping Instruction </DialogTitle>
      <DialogContent>
        <InstrucationComponent />
      </DialogContent>
      <DialogActions>
      <Button
            variant="outlined"
            color="error"
            
            startIcon={<Iconify icon="gala:add" />}
            onClick={() => {
              AddMap()
              onClose()
            }}
          >
            Start Mapping
          </Button>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MappingInstructionsDialog;
