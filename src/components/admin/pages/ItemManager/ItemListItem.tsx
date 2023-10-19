import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import useDeleteHook from '../../../../hooks/useDeleteHook';

interface PropsType {
  id: number;
  category: string;
  created_at: string;
  image: string;
  item_name: string;
  syllable_count: number;
  modifyHandler: (pk: number) => void;
  mutateData: (url: string) => void;
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
  mutateData,
}) => {
  const { executeDelete } = useDeleteHook(`item/images/${id}/`);

  const onDelete = async () => {
    const isSuccess = await executeDelete();
    if (isSuccess) {
      alert('삭제되었습니다.');
      mutateData('item/images/');
    } else {
      alert('삭제에 실패하였습니다.');
    }
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
        <Button variant="outlined" onClick={onDelete}>
          삭제
        </Button>
      </Box>
    </ItemStyle>
  );
};

export default ItemListItem;
