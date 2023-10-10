import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import MemoryEnhancement from './MemoryEnhancement';
import FollowInstructions from './FollowInstructions';
import UnderstandSentences from './UnderstandSentences';
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
            height: '100%',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BigButton to="/admin/problem/memory" text="기억력 향상"></BigButton>
          <BigButton to="/admin/problem/follow" text="지시 따르기"></BigButton>
          <BigButton
            to="/admin/problem/understand"
            text="구문 이해"
          ></BigButton>
        </Box>
      )}
      <PageContainer>
        <Routes>
          <Route path="memory" element={<MemoryEnhancement />} />
          <Route path="follow" element={<FollowInstructions />} />
          <Route path="understand" element={<UnderstandSentences />} />
        </Routes>
      </PageContainer>
    </Box>
  );
};

export default ProblemManagePage;
