import React, { useState,useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {dispatch,useSelector} from '../../redux/store';
import {getRobot} from '../../redux/slices/robot'

const DeleteDilogbox = ({ open, onClose,handleDelete }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const data  = useSelector((state) => state.robot?.robots?.robots);

  const handleConfirm = () => {
    handleDelete(null,selectedValue,true)
    onClose();
  };
  useEffect(() => {
    dispatch(getRobot())
  }, [])

  const handleChange = (event) => {
    console.log('====================================');
    console.log(event.target.value, "🤔");
console.log('====================================');
    setSelectedValue(event.target.value)
   
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        {/* <img src="your-image-url.jpg" alt="Image" /> */}
        <p>This action cannot be undone.</p>
        <Select
          value={selectedValue}
          onChange={handleChange}
          label="Select Option"
          sx={{ minWidth: '200px' }}
        >
          {data?.map((item,index)=><MenuItem key={index} value={item.robot.uuid}>{item.nickname}</MenuItem>)
          
        }
        </Select>


        {/* <Select
          multiple
          displayEmpty
          value={selectedValue}
          onChange={handleChange}
          // input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }

            return selected.join(', ');
          }}
          // MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {data.map((name) => (
            <MenuItem
              key={name.uuid}
              value={name.uuid}
              // style={getStyles(name, personName, theme)}
            >
              {name.nickname}
            </MenuItem>
          ))}
        </Select> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error">
          Confirm Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDilogbox;
