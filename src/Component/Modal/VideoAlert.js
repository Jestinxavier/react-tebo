import React, { useState, useEffect } from 'react';
import { Modal, Typography } from '@mui/material';

const VideoAlert = ({ open, onClose, message }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
console.log('=openopen===================================');
console.log(open);
console.log('====================================');
    if (open) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 10000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [open]);

  useEffect(() => {
    if (timer === 0) {
      onClose();
    }
  }, [timer, onClose]);

  return (
    <Modal open={open} onClose={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#2020205e', padding: '20px', textAlign: 'center', borderRadius: '8px' }}>
        <Typography variant="body1" style={{ color: '#fff' }}>
          {message}
        </Typography>
        <Typography variant="body2" style={{ color: '#fff' }}>
          Closing in {timer} seconds...
        </Typography>
      </div>
    </Modal>
  );
};

export default VideoAlert;
