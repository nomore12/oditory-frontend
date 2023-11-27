import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BigButton from '../../BigButton';
import OrderItemManagement from './OrderItemManagement';
import MemoryItemManagement from './MemoryItemManagement';
import SyntaxItemManagement from './SyntaxItemManagement';
import PageContainer from '../../PageContainer';

const ItemManagePage: React.FC = () => {
  const location = useLocation();
  const [menuScreen, setMenuScreen] = useState<boolean>(true);

  useEffect(() => {
    const paths = location.pathname.split('/');
    paths[paths.length - 1] === 'item'
      ? setMenuScreen(true)
      : setMenuScreen(false);
  }, [location.pathname]);

  return (
    <Box sx={{ height: '100%' }}>
      {menuScreen && (
        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh - 80px)',
            display: 'flex',
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BigButton to="/admin/item/memory" text="단어 기억하기"></BigButton>
          <BigButton to="/admin/item/order" text="지시 따르기"></BigButton>
          <BigButton to="/admin/item/syntax" text="구문 이해"></BigButton>
        </Box>
      )}
      <PageContainer>
        <Routes>
          <Route path="memory/*" element={<MemoryItemManagement />} />
          <Route path="order/*" element={<OrderItemManagement />} />
          <Route path="syntax/*" element={<SyntaxItemManagement />} />
        </Routes>
      </PageContainer>
    </Box>
  );
};

export default ItemManagePage;
