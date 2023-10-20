import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';

const ItemButton: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  return (
    <Box
      sx={{
        border: '1px solid black',
        height: 200,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton aria-label="add">
        <AddCircleOutlineIcon sx={{ fontSize: 80 }} />
      </IconButton>
    </Box>
  );
};

export default ItemButton;
