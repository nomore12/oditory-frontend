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
  const [currentProblemNumber, setCurrentProblemNumber] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleProblemNumberClick = (selectedNumber: number) => {
    console.log(`path is : /admin/problem/memory/${selectedNumber}`);
    setCurrentProblemNumber(selectedNumber);
    navigate(`/admin/problem/memory/${selectedNumber}`);
  };

  useEffect(() => {
    const paths = location.pathname.split('/');
    setCurrentLocation(paths[paths.length - 1]);
  }, [location.pathname]);

  return (
    <Box>
      <Typography variant="h6">기억력 향상</Typography>

      <Routes>
        <Route
          path={`${currentProblemNumber}`}
          element={<MemoryProblemForm level={Number(currentLevel)} />}
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
