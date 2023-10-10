import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface PropsType {
  currentLevel: string;
  setCurrentLevel: React.Dispatch<React.SetStateAction<string>>;
}

const LevelSelect: React.FC<PropsType> = ({
  currentLevel,
  setCurrentLevel,
}) => {
  const [level, setLevel] = useState(currentLevel);

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
    setCurrentLevel(event.target.value as string);
  };

  return (
    <Box>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">
          레벨을 선택하세요.
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          label="레벨을 선택하세요."
          onChange={handleChange}
          defaultValue={'1'}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LevelSelect;
