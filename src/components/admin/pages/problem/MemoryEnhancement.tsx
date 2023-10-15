import React, { useEffect, useState } from 'react';
import {
  Box,
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

const MemoryEnhancement: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState('1');
  const [currentProblemNumber, setCurrentProblemNumber] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleProblemNumberClick = (selectedNumber: number) => {
    console.log(
      `path is : /admin/problem/memory/${currentLevel}-${selectedNumber}`
    );
    setCurrentProblemNumber(`${currentLevel}-${selectedNumber}`);
    navigate(`/admin/problem/memory/${currentLevel}-${selectedNumber}`);
  };

  useEffect(() => {
    console.log('memory enhancement page', location.pathname);
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
          element={<MemoryProblemForm currentLevel={Number(currentLevel)} />}
        />
      </Routes>
      {currentLocation === 'memory' && (
        <>
          <LevelSelect
            currentLevel={currentLevel}
            setCurrentLevel={setCurrentLevel}
          />
          <MemoryEnhancementList
            problemNumber={currentProblemNumber}
            handleProblemNumberClick={handleProblemNumberClick}
          />
        </>
      )}
    </Box>
  );
};

export default MemoryEnhancement;
