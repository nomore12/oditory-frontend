import React, { useEffect, useRef, useState } from 'react';
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
  TextField,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ProblemItemSelectBox from './ProblemItemSelectBox';
import { useSearchParams } from 'react-router-dom';

function getOrderQueryParams(type: string) {
  if (type === 'basic') {
    return 0;
  } else if (type === 'time') {
    return 1;
  } else if (type === 'quantity') {
    return 2;
  } else if (type === 'location') {
    return 3;
  } else {
    return 0;
  }
}

function getOrderType(value: number) {
  if (value === 0) {
    return 'basic';
  } else if (value === 1) {
    return 'time';
  } else if (value === 2) {
    return 'quantity';
  } else if (value === 3) {
    return 'location';
  } else {
    return 'basic';
  }
}

const OrderProblemForm: React.FC = () => {
  const [level, setLevel] = useState('1');
  const [typeSelect, setTypeSelect] = useState('1');
  const [answerCount, setAnswerCount] = useState('1');
  const [sizeEnable, setSizeEnable] = useState(false);
  const [itemList, setItemList] = useState<number[]>([]);
  const [answerSequential, setAnswerSequential] = useState(false);
  const [colCount, setColCount] = useState(4);
  const [searchParams, setSearchParams] = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setSearchParams({ ...params, level: event.target.value as string });
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeSelect(event.target.value as string);
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    setSearchParams({
      ...params,
      type: getOrderType(Number(event.target.value as string) - 1),
    });
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    console.log(file, file?.name);
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (String(answerCount) === '1') {
      setColCount(4);
      const arr = Array.from({ length: 3 * 4 }, (_) => -1);
      setItemList([...arr]);
    } else if (String(answerCount) === '2') {
      setColCount(5);
      const arr = Array.from({ length: 3 * 5 }, (_) => -1);
      setItemList([...arr]);
    } else if (String(answerCount) === '3') {
      setColCount(6);
      const arr = Array.from({ length: 3 * 6 }, (_) => -1);
      setItemList([...arr]);
    }
  }, [answerCount]);

  useEffect(() => {
    if (searchParams.get('level')) {
      setLevel(searchParams.get('level') as string);
    }

    if (searchParams.get('type')) {
      console.log(searchParams.get('type'));
      setTypeSelect(
        String(getOrderQueryParams(searchParams.get('type') as string) + 1)
      );
    }
  }, [searchParams]);

  useEffect(() => {
    setItemList(Array.from({ length: 3 * colCount }, (_) => -1));
  }, []);

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
          label="또는:"
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
        <Box sx={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
          <Box>
            <div>
              <input
                type="file"
                accept="audio/mp3"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button variant="outlined" onClick={handleButtonClick}>
                {file ? file?.name : 'Upload File'}
              </Button>
            </div>
          </Box>
          <Box>
            <Button variant="outlined" disabled={file ? false : true}>
              {!file ? '재생' : isPlaying ? '정지' : '재생'}
            </Button>
          </Box>
        </Box>
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
