import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Checkbox,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ProblemItemSelectBox from './ProblemItemSelectBox';

const OrderProblemForm: React.FC = () => {
  const [level, setLevel] = useState('1');
  const [typeSelect, setTypeSelect] = useState('1');
  const [answerCount, setAnswerCount] = useState('1');
  const [sizeEnable, setSizeEnable] = useState(false);
  const [answerSequential, setAnswerSequential] = useState(false);
  const [colCount, setColCount] = useState(4);

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeSelect(event.target.value as string);
  };

  const handleAnswerCountChange = (event: SelectChangeEvent) => {
    setAnswerCount(event.target.value as string);
  };

  const handleSizeEnableChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSizeEnable(event.target.checked);
  };

  const handleAnswerSequentialChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAnswerSequential(event.target.checked);
  };

  useEffect(() => {
    if (String(answerCount) === '1') {
      setColCount(4);
    } else if (String(answerCount) === '2') {
      setColCount(5);
    } else if (String(answerCount) === '3') {
      setColCount(6);
    }
  }, [answerCount]);

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
            <MenuItem value={1}>기본 지시</MenuItem>
            <MenuItem value={2}>시간적 지시</MenuItem>
            <MenuItem value={3}>양적 지시</MenuItem>
            <MenuItem value={4}>공간적 지시</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-answer-select-label">보기 개수</InputLabel>
          <Select
            labelId="demo-answer-select-label"
            id="demo-answer-select"
            value={answerCount}
            label="보기 개수"
            size="small"
            onChange={handleAnswerCountChange}
          >
            <MenuItem value={1}>3 x 4</MenuItem>
            <MenuItem value={2}>3 x 5</MenuItem>
            <MenuItem value={3}>3 x 6</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox checked={sizeEnable} onChange={handleSizeEnableChange} />
          }
          label="크기 적용:"
          labelPlacement="start"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={answerSequential}
              onChange={handleAnswerSequentialChange}
            />
          }
          label="순차 답변:"
          labelPlacement="start"
        />
      </Box>
      <ProblemItemSelectBox row={3} col={colCount} />
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
