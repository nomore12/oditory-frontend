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
import usePostHook from '../../../hooks/usePostHook';
import { useNavigate } from 'react-router-dom';

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

function getAnswerType(value: string) {
  if (value === '1') {
    return 'sequential';
  } else if (value === '2') {
    return 'and';
  } else if (value === '3') {
    return 'or';
  } else {
    return 'sequential';
  }
}

function objectToFormData(obj: any) {
  const formData = new FormData();
  formData.append('category', getOrderType(Number(obj.category)));
  formData.append('visual_hint', 'false');
  formData.append('problem_type', 'order');
  formData.append('problem_level', obj.problem_level);
  formData.append('problem_question_number', '1');
  formData.append('choices', JSON.stringify(obj.choices));
  formData.append('answers', JSON.stringify(obj.answers));
  formData.append('order_type', obj.answer_type);

  if (obj.sound_file) {
    formData.append('sound_file', obj.sound_file);
  }

  console.log(formData.getAll('answers'), formData.getAll('problem_level'));

  return formData;
}

const OrderProblemForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('1');
  const [typeSelect, setTypeSelect] = useState('1');
  const [answerCount, setAnswerCount] = useState('1');
  const [answers, setAnswers] = useState<number[]>([]);
  const [itemList, setItemList] = useState<number[]>([]);
  const [answerType, setAnswerType] = useState('1');
  const [colCount, setColCount] = useState(4);
  const [searchParams, setSearchParams] = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const navigate = useNavigate();

  const {
    data: responseData,
    error,
    isValidating,
    executePost,
  } = usePostHook(
    'problem/order/',
    objectToFormData({
      category: getOrderType(Number(typeSelect)),
      visual_hint: false,
      sound_file: file,
      problem_type: 'order',
      problem_level: level,
      problem_question_number: 1,
      choices: itemList,
      answers: answers,
      answer_type: getAnswerType(answerType),
    }),
    { 'Content-Type': 'multipart/form-data' }
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

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

  const handleAnswerTypeChange = (event: SelectChangeEvent) => {
    setAnswerType(event.target.value as string);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
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

  const handlePlaySound = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleSubmit = async () => {
    console.log(itemList, answers);
    if (!file) {
      alert('음성 파일을 업로드해주세요.');
      return;
    }
    if (itemList.find((item) => item === -10)) {
      alert('보기를 모두 선택해주세요.');
      return;
    }
    if (answers.length === 0) {
      alert('정답을 선택해주세요.');
      return;
    }
    if (title.trim() === '') {
      alert('문제를 입력해주세요.');
      return;
    }
    if (Number(level) === 0) {
      alert('레벨을 선택해주세요.');
      return;
    }
    await executePost();
    if (!error) navigate('/admin/problem/order');
  };

  const handleCancel = () => {
    navigate('/admin/problem/order');
  };

  useEffect(() => {
    if (String(answerCount) === '1') {
      setColCount(4);
      const arr = Array.from({ length: 3 * 4 }, (_) => -1);
      setItemList([...arr]);
      setAnswers([]);
    } else if (String(answerCount) === '2') {
      setColCount(5);
      const arr = Array.from({ length: 3 * 5 }, (_) => -1);
      setItemList([...arr]);
      setAnswers([]);
    } else if (String(answerCount) === '3') {
      setColCount(6);
      const arr = Array.from({ length: 3 * 6 }, (_) => -1);
      setItemList([...arr]);
      setAnswers([]);
    }
  }, [answerCount]);

  useEffect(() => {
    setItemList(Array.from({ length: 3 * colCount }, (_) => -1));
    setAnswers([]);
  }, [answerType]);

  useEffect(() => {
    if (searchParams.get('level')) {
      setLevel(searchParams.get('level') as string);
    }

    if (searchParams.get('type')) {
      setTypeSelect(
        String(getOrderQueryParams(searchParams.get('type') as string) + 1)
      );
    }
  }, [searchParams]);

  useEffect(() => {
    console.log('isPlaying', isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        // audioRef.current.play();
        console.log('audio', audioRef.current?.onplaying);

        setTimeout(
          () => setIsPlaying(false),
          audioRef.current?.duration * 1000 + 500
        );
        console.log('audio', audioRef.current?.onplaying);
        setTimeout(
          () =>
            console.log(
              audioRef.current?.currentTime,
              audioRef.current?.currentSrc,
              audioRef.current?.duration
            ),
          5000
        );
      } else {
        audioRef.current.pause();
        // setPlaySound && setPlaySound(false);
      }
    }
  }, [isPlaying]);

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
      <TextField
        size="small"
        label="문제"
        fullWidth
        sx={{ marginTop: 2 }}
        value={title}
        onChange={handleTitleChange}
      />
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
        <FormControl>
          <InputLabel id="demo-condition-select-label">답변 방식</InputLabel>
          <Select
            labelId="demo-condition-select-label"
            id="demo-condition-select"
            value={answerType}
            label="답변 방식"
            size="small"
            onChange={handleAnswerTypeChange}
          >
            <MenuItem value={1}>순차 답변</MenuItem>
            <MenuItem value={2}>AND 조건</MenuItem>
            <MenuItem value={3}>OR 조건</MenuItem>
          </Select>
        </FormControl>
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
          <audio ref={audioRef} src={filePreviewUrl} />
          <Box>
            <Button
              variant="outlined"
              disabled={file ? false : true}
              onClick={handlePlaySound}
            >
              {!file ? '재생' : isPlaying ? '정지' : '재생'}
            </Button>
          </Box>
        </Box>
      </Box>
      <ProblemItemSelectBox
        row={3}
        col={colCount}
        answers={answers}
        itemList={itemList}
        setItemList={setItemList}
        setAnswers={setAnswers}
        sequential={answerType}
      />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          marginTop: 'auto',
        }}
      >
        <Button variant="outlined" onClick={handleCancel}>
          취소
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          저장
        </Button>
      </Box>
    </Box>
  );
};

export default OrderProblemForm;
