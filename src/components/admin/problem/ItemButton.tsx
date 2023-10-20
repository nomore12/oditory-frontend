import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';

interface PropsType {
  fontSize: number;
  name: string;
  syllableCount: number;
  category: string;
  image: string;
}

const ItemButton: React.FC<PropsType> = ({
  fontSize,
  name,
  category,
  syllableCount,
  image,
}) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  return (
    <Box
      sx={{
        border: '1px solid black',
        height: 200,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/*<IconButton aria-label="add">*/}
      {/*  <AddCircleOutlineIcon sx={{ fontSize }} />*/}
      {/*</IconButton>*/}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '64px' }} src={image} alt="상품 이미지" />
      </Box>
      <Box>
        <Typography>이름: {name}</Typography>
      </Box>
      <Box>
        <Typography>카테고리: {category}</Typography>
      </Box>
      <Box>
        <Typography>음절수: {syllableCount}</Typography>
      </Box>
      <Box>
        <Button variant="outlined">삭제하기</Button>
      </Box>
    </Box>
  );
};

export default ItemButton;
