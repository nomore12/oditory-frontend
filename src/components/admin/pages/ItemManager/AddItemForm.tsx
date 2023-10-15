import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface PropsType {
  openHandler: () => void;
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

const AddItemForm: React.FC<PropsType> = ({ openHandler }) => {
  const [category, setCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [syllableCount, setSyllableCount] = useState(0);
  const [file, setFile] = useState<File | null>(null); // [1]
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const onSubmit = () => {
    console.log('category is ', category);
    console.log('item name is ', itemName);
    console.log('syllable count is ', syllableCount);
    console.log('file is ', file);
  };

  useEffect(() => {
    setCategory('전체');
  }, []);

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
            onChange={(e) => setItemName(e.target.value)}
          />
        </BlockStyle>
        <BlockStyle>
          <Typography>음절수</Typography>
          <TextField
            type="number"
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
              Upload File
            </Button>
          </div>
        </BlockStyle>
        <BlockStyle>
          <Button
            variant="outlined"
            sx={{ marginLeft: 'auto' }}
            onClick={onSubmit}
          >
            업로드
          </Button>
        </BlockStyle>
      </Box>
    </Box>
  );
};

export default AddItemForm;
