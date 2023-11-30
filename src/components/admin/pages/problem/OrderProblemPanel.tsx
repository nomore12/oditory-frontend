import React from 'react';
import { Box, Typography } from '@mui/material';

interface PropsType {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const OrderProblemPanel: React.FC<PropsType> = ({ children, index, value }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default OrderProblemPanel;
