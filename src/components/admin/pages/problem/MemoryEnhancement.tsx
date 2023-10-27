import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import MemoryEnhancementList from '../../problem/MemoryEnhancementList';
import LevelSelect from '../../problem/LevelSelect';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MemoryProblemForm from '../../problem/MemoryProblemForm';
import { fetcher } from '../../../../utils/fetcher';
import useSWR from 'swr';
import MemoryProblemCreateForm from '../../problem/MemoryProblemCreateForm';

const MemoryEnhancement: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState('1');
  const [currentProblemNumber, setCurrentProblemNumber] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { data, mutate, error, isLoading } = useSWR(
    'problem/memory/',
    (url) => fetcher({ url }),
    { revalidateOnReconnect: true }
  );

  const handleProblemNumberClick = (selectedNumber: number) => {
    setCurrentProblemNumber(`${selectedNumber}`);
    navigate(`/admin/problem/memory/${selectedNumber}`);
  };

  const handleAddProblemClick = () => {
    navigate('/admin/problem/memory/create');
  };

  useEffect(() => {
    mutate();
    const paths = location.pathname.split('/');
    setCurrentLocation(paths[paths.length - 1]);
    const problemNumber = paths[paths.length - 1];
    setCurrentProblemNumber(problemNumber);
  }, [location.pathname]);

  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h6">기억력 향상</Typography>

      <Routes>
        <Route path="create" element={<MemoryProblemCreateForm />} />
        <Route
          path={currentProblemNumber}
          element={
            <MemoryProblemForm
              currentLevel={Number(currentLevel)}
              currentProblemId={Number(currentProblemNumber)}
            />
          }
        />
      </Routes>
      {currentLocation === 'memory' && (
        <>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <LevelSelect
              currentLevel={currentLevel}
              setCurrentLevel={setCurrentLevel}
            />
            <Button variant="outlined" onClick={handleAddProblemClick}>
              문제 추가하기
            </Button>
          </Box>
          <MemoryEnhancementList
            data={data}
            currentLevel={Number(currentLevel)}
            problemNumber={currentProblemNumber}
            handleProblemNumberClick={handleProblemNumberClick}
          />
        </>
      )}
    </Box>
  );
};

export default MemoryEnhancement;
