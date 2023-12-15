import React, { useEffect, useRef, useState } from 'react';
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
import SelectBox from '../../commons/SelectBox';
import usePostHook from '../../../hooks/usePostHook';
import useSWR, { mutate as mutateSWR } from 'swr';
import { fetcher } from '../../../utils/fetcher';
import { useNavigate, useParams } from 'react-router-dom';
import usePatchHook from '../../../hooks/usePatchHook';

const levelSelectOptions: { value: number; label: string }[] = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
];

const typtSelectOptions: { value: number; label: string }[] = [
  {
    value: 1,
    label: '의자에 앉기',
  },
  {
    value: 2,
    label: '술래잡기',
  },
  {
    value: 3,
    label: '자전거 타기',
  },
  {
    value: 4,
    label: '비교',
  },
  {
    value: 5,
    label: '물건주기',
  },
];

function stringToTypeSelect(value: string) {
  if (value === '1') {
    return '의자에앉기';
  } else if (value === '2') {
    return '술래잡기';
  } else if (value === '3') {
    return '자전거타기';
  } else if (value === '4') {
    return '비교';
  } else if (value === '5') {
    return '물건주기';
  }
}

function textToTypeSelectKey(value: string | undefined): string {
  if (value === '의자에앉기') {
    return '1';
  } else if (value === '술래잡기') {
    return '2';
  } else if (value === '자전거타기') {
    return '3';
  } else if (value === '비교') {
    return '4';
  } else if (value === '물건주기') {
    return '5';
  } else {
    return '1';
  }
}

function objectToFormData(obj: any) {
  const formData = new FormData();
  formData.append('title', obj.title);
  formData.append('category', obj.category);
  formData.append('choices', JSON.stringify(obj.choices));
  formData.append('answer', String(obj.answer));
  formData.append('visual_hint', 'false');
  formData.append('problem_level', obj.problem_level);
  formData.append('problem_type', 'syntax');
  formData.append('problem_question_number', '0');

  if (obj.sound_file) {
    formData.append('sound_file', obj.sound_file);
  }

  return formData;
}

const OrderProblemForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState('1');
  const [typeSelect, setTypeSelect] = useState('1');
  const [itemList, setItemList] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>(-1);
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [buttonLabel, setButtonLabel] = useState<string>('재생');
  const [fileName, setFileName] = useState<string>('UPLOAD FILE');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: getData,
    error: getError,
    isLoading: getIsLoading,
    mutate,
  } = useSWR(`problem/syntax/${id}/`, (url) => fetcher({ url }));
  // mutateSWR(`problem/syntax/${id}/`);

  const {
    data: responseData,
    error,
    isValidating,
    executePost,
  } = usePostHook(
    'problem/syntax/',
    objectToFormData({
      title: title,
      category: stringToTypeSelect(String(typeSelect)),
      choices: itemList,
      answer: Number(answer),
      visual_hint: false,
      problem_level: level,
      sound_file: file,
    }),
    { 'Content-Type': 'multipart/form-data' }
  );

  const {
    data: patchData,
    error: patchError,
    executePatch,
  } = usePatchHook(
    `problem/syntax/${id}/`,
    objectToFormData({
      title: title,
      category: stringToTypeSelect(String(typeSelect)),
      choices: itemList,
      answer: Number(answer),
      visual_hint: false,
      problem_level: level,
      sound_file: file,
    }),
    { 'Content-Type': 'multipart/form-data' }
  );

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeSelect(event.target.value as string);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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

  const handleSubmit = () => {
    if (!filePreviewUrl) {
      alert('음성 파일을 업로드해주세요.');
      return;
    }
    if (itemList.find((item) => item === -10)) {
      alert('보기를 모두 선택해주세요.');
      return;
    }
    if (answer === -1) {
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
    if (!id) {
      executePost().then(() => {
        mutate();
      });
    } else {
      executePatch(
        objectToFormData({
          title: title,
          category: stringToTypeSelect(String(typeSelect)),
          choices: itemList,
          answer: Number(answer),
          visual_hint: false,
          problem_level: level,
          sound_file: file,
        })
      ).then(() => {
        mutate();
      });
    }

    // mutateSWR(`problem/syntax/&category=${typeSelect}&level=${level}`);
    if (!error) navigate('/admin/problem/syntax');
  };

  useEffect(() => {
    const label = !filePreviewUrl ? '재생' : !isPlaying ? '재생' : '정지';
    setButtonLabel(label);
    const name = file ? file.name : 'UPLOAD FILE';
    console.log('file', file);
    if (getData && !file) {
      console.log('get data', getData);
      const urlParts = getData.sound_file.split('/');

      // Get the last part of the URL, which is the file name
      const fileName = urlParts[urlParts.length - 1];

      // Decode the file name
      const decodedFileName = decodeURIComponent(fileName);
      console.log(decodedFileName);
      setFileName(decodedFileName);
      setFilePreviewUrl(getData.sound_file);
    } else {
      setFileName(name);
    }
  }, [filePreviewUrl, file, isPlaying, getIsLoading]);

  useEffect(() => {
    if (!getIsLoading) {
      console.log(getData, getData.category);
      setTitle(getData.title);
      setLevel(String(getData.problem.level));
      setTypeSelect(
        textToTypeSelectKey(getData.category as string | undefined)
      );
      setItemList(getData.choices.map((choice: any) => choice.id));
      setAnswer(getData.answer.id);
    }
  }, [getIsLoading]);

  useEffect(() => {
    mutate(`problem/syntax/${id}/`);
  }, [id, mutate]);

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
        <SelectBox
          id="level-select"
          label="레벨"
          value={level}
          handleChange={handleLevelChange}
          selectOptions={levelSelectOptions}
        />
        <SelectBox
          id="type-select"
          label="타입"
          value={typeSelect}
          handleChange={handleTypeChange}
          selectOptions={typtSelectOptions}
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
                {fileName}
              </Button>
            </div>
          </Box>
          <audio ref={audioRef} src={filePreviewUrl} />
          <Box>
            <Button
              variant="outlined"
              disabled={!fileName}
              onClick={handlePlaySound}
            >
              {buttonLabel}
            </Button>
          </Box>
        </Box>
      </Box>
      <SyntaxProblemItemBox
        itemList={itemList}
        setItemList={setItemList}
        answer={answer}
        setAnswer={setAnswer}
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
        <Button
          variant="outlined"
          onClick={() => navigate('/admin/problem/syntax')}
        >
          취소
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {id ? '수정' : '저장'}
        </Button>
      </Box>
    </Box>
  );
};

export default OrderProblemForm;
