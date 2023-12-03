import { Box, IconButton, Paper } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useOverlay } from '../../../hooks/useOverlay';

const ItemButton: React.FC = () => {
  const { overlayHandler } = useOverlay();

  return (
    <Paper
      elevation={4}
      sx={{
        backgroundColor: 'white',
        height: 240,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton
        aria-label="add"
        onClick={() => {
          overlayHandler();
        }}
      >
        <AddCircleOutlineIcon sx={{ fontSize: 80 }} />
      </IconButton>
    </Paper>
  );
};

export default ItemButton;
