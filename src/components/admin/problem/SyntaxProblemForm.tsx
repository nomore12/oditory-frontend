import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SyntaxProblemItemBox from '../problem/SyntaxProblemItemBox';

const OrderProblemForm: React.FC = () => {
  const [level, setLevel] = useState('1');
  const [typeSelect, setTypeSelect] = useState('1');

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeSelect(event.target.value as string);
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Typography variant="h6">문제 만들기</Typography>
      <TextField size="small" label="문제" fullWidth sx={{ marginTop: 2 }} />
      <Box sx={{ marginTop: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">레벨</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            label="레벨"
            size="small"
            onChange={handleLevelChange}
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
        <FormControl>
          <InputLabel id="demo-type-select-label">타입</InputLabel>
          <Select
            labelId="demo-type-select-label"
            id="demo-type-select"
            value={typeSelect}
            label="타입"
            size="small"
            onChange={handleTypeChange}
          >
            <MenuItem value={1}>의자에 앉기</MenuItem>
            <MenuItem value={2}>술래잡기</MenuItem>
            <MenuItem value={3}>자전거 타기</MenuItem>
            <MenuItem value={4}>비교</MenuItem>
            <MenuItem value={5}>물건주기</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <SyntaxProblemItemBox />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          marginTop: 'auto',
        }}
      >
        <Button variant="outlined">취소</Button>
        <Button variant="contained">저장</Button>
      </Box>
    </Box>
  );
};

export default OrderProblemForm;
