import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import MemoryEnhancementList from '../../problem/MemoryEnhancementList';
import LevelSelect from '../../problem/LevelSelect';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MemoryProblemForm from '../../problem/MemoryProblemForm';
import { fetcher } from '../../../../utils/fetcher';
import useSWR from 'swr';

const MemoryEnhancement: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState('1');
  const [currentProblemNumber, setCurrentProblemNumber] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR('problem/memory/', (url) =>
    fetcher({ url })
  );

  const handleProblemNumberClick = (selectedNumber: number) => {
    setCurrentProblemNumber(`${selectedNumber}`);
    navigate(`/admin/problem/memory/${selectedNumber}`);
  };

  useEffect(() => {
    const paths = location.pathname.split('/');
    setCurrentLocation(paths[paths.length - 1]);

    // currentProblemNumber 복원
    const problemNumber = paths[paths.length - 1]; // 혹은 적절한 인덱스
    setCurrentProblemNumber(problemNumber);
  }, [location.pathname]);

  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h6">기억력 향상</Typography>

      <Routes>
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
          <LevelSelect
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
          />
          <MemoryEnhancementList
            data={data}
            currentLevel={Number(currentLevel)}
            problemNumber={currentProblemNumber}
            handleProblemNumberClick={handleProblemNumberClick}
          />
        </>
      )}
      <Button>문제 추가하기</Button>
    </Box>
  );
};

export default MemoryEnhancement;
