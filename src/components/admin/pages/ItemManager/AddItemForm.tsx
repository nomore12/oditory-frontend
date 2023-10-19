import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import usePostData from '../../../../hooks/usePostHook';
import { fetcher } from '../../../../utils/fetcher';
import usePatchHook from '../../../../hooks/usePatchHook';
import useSWR from 'swr';

interface PropsType {
  title: string;
  isModify: boolean;
  openHandler: () => void;
  id?: number;
}

const BlockStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 84,
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  '& > :nth-child(2)': {
    position: 'absolute',
    left: '80px',
  },
}));

const AddItemForm: React.FC<PropsType> = ({
  title,
  isModify,
  openHandler,
  id,
}) => {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [syllableCount, setSyllableCount] = useState(0);
  const [file, setFile] = useState<File | null>(null); // [1]
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>(''); // [2
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const postData = {
    image: file,
    item_name: itemName,
    syllable_count: syllableCount,
    category: category,
  };

  const { executePost } = usePostData('item/images/', postData);
  const {
    data: puData,
    error: putError,
    executePut,
  } = usePatchHook(`item/images/${id}/`, postData);

  const fetchUrl = title === '수정하기' ? `item/images/${id}/` : null;
  const {
    data: getData,
    error: getError,
    isLoading,
  } = useSWR(fetchUrl, (url) => fetcher({ url }));

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setFilePreviewUrl(url);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const onSubmit = async () => {
    if (
      category.trim() === '' ||
      itemName.trim() === '' ||
      syllableCount === 0 ||
      file === null
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const isSuccess = await executePost();
    if (isSuccess) {
      alert('아이템 추가가 완료되었습니다.');
      openHandler();
    } else {
      alert('아이템 추가 중 오류가 발생했습니다.');
      openHandler();
    }
  };

  const onModify = async () => {
    if (
      category.trim() === '' ||
      itemName.trim() === '' ||
      syllableCount === 0
    ) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const isSuccess = await executePut(postData);
    if (isSuccess) {
      alert('아이템 변경이 완료되었습니다.');
      openHandler();
    } else {
      alert('아이템 변경 중 오류가 발생했습니다.');
      openHandler();
    }
  };

  useEffect(() => {
    setCategory('전체');
  }, []);

  useEffect(() => {
    setItemName(getData?.item_name);
    setSyllableCount(getData?.syllable_count);
    setFilePreviewUrl(getData?.image);
    setCategory(getData?.category);
    setFilePreviewUrl(getData?.image);
  }, [getData, isLoading]);

  return (
    <Box
      onClick={openHandler}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: 480,
          height: 420,
          backgroundColor: 'white',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          borderRadius: 2,
        }}
      >
        <BlockStyle>
          <Typography variant="h4">{title}</Typography>
        </BlockStyle>
        <BlockStyle>
          <Typography>카테고리</Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{category}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="category"
                onChange={handleChange}
              >
                <MenuItem value="전체">전체</MenuItem>
                <MenuItem value="과일">과일</MenuItem>
                <MenuItem value="채소">채소</MenuItem>
                <MenuItem value="사물">사물</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </BlockStyle>
        <BlockStyle>
          <Typography>아이템명</Typography>
          <TextField
            sx={{ width: 320 }}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </BlockStyle>
        <BlockStyle>
          <Typography>음절수</Typography>
          <TextField
            type="number"
            value={syllableCount}
            sx={{ width: 320 }}
            onChange={(e) => setSyllableCount(Number(e.target.value))}
          />
        </BlockStyle>
        <BlockStyle>
          <Typography>파일</Typography>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button variant="outlined" onClick={handleButtonClick}>
              {filePreviewUrl ? (
                <Box sx={{ width: 80, height: 80 }}>
                  <img
                    style={{
                      objectFit: 'contain',
                      width: '100%',
                      height: '100%',
                    }}
                    src={filePreviewUrl}
                    alt={filePreviewUrl}
                  />
                </Box>
              ) : (
                'Upload File'
              )}
            </Button>
          </div>
        </BlockStyle>
        <BlockStyle>
          <Button
            variant="outlined"
            sx={{ marginLeft: 'auto' }}
            onClick={title === '추가하기' ? onSubmit : onModify}
          >
            {title === '추가하기' ? '업로드' : '수정'}
          </Button>
        </BlockStyle>
      </Box>
    </Box>
  );
};

export default AddItemForm;
