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

const MemoryEnhancement: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState('1');

  useEffect(() => {
    console.log(currentLevel);
  }, [currentLevel]);

  return (
    <Box>
      <Typography variant="h6">기억력 향상</Typography>
      <LevelSelect
        currentLevel={currentLevel}
        setCurrentLevel={setCurrentLevel}
      />
      <MemoryEnhancementList level={Number(currentLevel)} />
    </Box>
  );
};

export default MemoryEnhancement;
