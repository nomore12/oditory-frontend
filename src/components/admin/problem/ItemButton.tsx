import { Box, Grid } from '@mui/material';
import React from 'react';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

const ItemButton: React.FC = () => {
  return (
    <Grid item xs={2} sx={{ border: '1px solid black', height: 160 }}>
      <Box>
        <ControlPointOutlinedIcon color="secondary" />
      </Box>
    </Grid>
  );
};

export default ItemButton;
