import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

interface PropsType {
  children: React.ReactNode;
}

const Overlay: React.FC<PropsType> = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default Overlay;
