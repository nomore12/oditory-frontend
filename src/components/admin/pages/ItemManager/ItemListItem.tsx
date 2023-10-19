import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';

interface PropsType {
  id: number;
  category: string;
  created_at: string;
  image: string;
  item_name: string;
  syllable_count: number;
  modifyHandler: (pk: number) => void;
}

const ItemStyle = styled(Box)(({ theme }) => ({
  height: 200,
  border: '1px solid black',
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}));

const ItemListItem: React.FC<PropsType> = ({
  id,
  category,
  created_at,
  image,
  item_name,
  syllable_count,
  modifyHandler,
}) => {
  const onModify = () => {
    // 수정 페이지로 이동
  };

  const onDelete = () => {
    // 삭제 및 취소 확인 창
    // 확인을 누르면 삭제
    // 취소를 누르면 취소
  };

  return (
    <ItemStyle>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img style={{ width: '64px' }} src={image} alt="상품 이미지" />
      </Box>
      <Box>
        <Typography>이름: {item_name}</Typography>
      </Box>
      <Box>
        <Typography>카테고리: {category}</Typography>
      </Box>
      <Box>
        <Typography>음절수: {syllable_count}</Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={() => modifyHandler(id)}>
          수정
        </Button>
        <Button variant="outlined">삭제</Button>
      </Box>
    </ItemStyle>
  );
};

export default ItemListItem;
