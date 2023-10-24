import React from 'react';
import { Box } from '@mui/material';
import { useOverlay } from '../../hooks/useOverlay';

interface PropsType {
  children: React.ReactNode;
}

const Overlay: React.FC<PropsType> = ({ children }) => {
  const { isAdd, overlayHandler } = useOverlay();
  return isAdd ? (
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
      onClick={overlayHandler}
    >
      {children}
    </Box>
  ) : null;
};

export default Overlay;
