import { Box, IconButton } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useOverlay } from '../../../hooks/useOverlay';

const ItemButton: React.FC = () => {
  const { overlayHandler } = useOverlay();

  return (
    <Box
      sx={{
        border: '1px solid black',
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
    </Box>
  );
};

export default ItemButton;
