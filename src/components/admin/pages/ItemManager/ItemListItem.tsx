import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const ItemStyle = styled(Box)(({ theme }) => ({
  height: 200,
  border: '1px solid black',
  padding: 16,
}));

const ItemListItem: React.FC = () => {
  return (
    <ItemStyle>
      <Box>아이템</Box>
    </ItemStyle>
  );
};

export default ItemListItem;
