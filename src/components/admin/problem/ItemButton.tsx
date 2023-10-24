import {
  Box,
  Button,
  Grid,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import React, { useState } from 'react';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';
import { useOverlay } from '../../../hooks/useOverlay';
import { useAddItemStore } from '../../../store/MemoryStore';

interface PropsType {
  id: number;
  name: string;
  syllableCount: number;
  category: string;
  image: string;
}

const ItemButton: React.FC<PropsType> = ({
  id,
  name,
  category,
  syllableCount,
  image,
}) => {
  const { isAdd, overlayHandler } = useOverlay();
  const { setClickedItemId, setAnswerId } = useAddItemStore(
    (state: any) => state
  );

  return (
    <Box
      sx={{
        border: '1px solid black',
        height: 240,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
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
        {isAdd ? null : (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    e.target.checked ? setAnswerId(id) : setAnswerId(id * -1);
                  }}
                />
              }
              label="정답"
            />
          </FormGroup>
        )}
        <Button
          onClick={() => {
            isAdd ? setClickedItemId(id) : setClickedItemId(id * -1);
            isAdd && overlayHandler();
          }}
          variant="outlined"
        >
          {isAdd ? '추가' : '삭제'}
        </Button>
      </Box>
    </Box>
  );
};

export default ItemButton;
