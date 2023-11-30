import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import MemoryEnhancementProblemPage from './MemoryEnhancementProblemPage';
import OrderProblemPage from './OrderProblemPage';
import SyntaxProblemPage from './SyntaxProblemPage';
import PageContainer from '../../PageContainer';
import BigButton from '../../BigButton';

const ProblemManagePage: React.FC = () => {
  const location = useLocation();
  const [menuScreen, setMenuScreen] = useState<boolean>(true);

  useEffect(() => {
    const paths = location.pathname.split('/');
    paths[paths.length - 1] === 'problem'
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
          <BigButton to="/admin/problem/memory" text="기억력 향상"></BigButton>
          <BigButton to="/admin/problem/order" text="지시 따르기"></BigButton>
          <BigButton
            to="/admin/problem/understand"
            text="구문 이해"
          ></BigButton>
        </Box>
      )}
      <PageContainer>
        <Routes>
          <Route path="memory/*" element={<MemoryEnhancementProblemPage />} />
          <Route path="order/*" element={<OrderProblemPage />} />
          <Route path="understand/*" element={<SyntaxProblemPage />} />
        </Routes>
      </PageContainer>
    </Box>
  );
};

export default ProblemManagePage;
