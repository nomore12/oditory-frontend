import React from 'react';
import { Box } from '@mui/material';

interface PropsType {
  children: React.ReactNode;
}

const AdminPageContainer: React.FC<PropsType> = ({ children }) => {
  return <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>;
};

export default AdminPageContainer;
