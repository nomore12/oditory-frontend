import React, { useState } from 'react';
import {
  Box,
  Paper,
  ImageList,
  ImageListItem,
  Typography,
  Button,
} from '@mui/material';
import { useOverlay } from '../../../../hooks/useOverlay';
import Overlay from '../../../commons/Overlay';

interface PropsType {
  url: string;
  id: number;
}

const SyntaxItemCard: React.FC<PropsType> = ({ url, id }) => {
  const [preview, setPreview] = useState<boolean>(false);

  const onPreviewHandler = () => {
    setPreview(!preview);
  };

  return (
    <ImageListItem sx={{ width: 265, height: 190 }}>
      <Paper elevation={3}>
        <Box
          sx={{
            width: '100%',
            height: '190px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: 2,
          }}
        >
          <img
            style={{ width: '170px', maxHeight: '108px', objectFit: 'contain' }}
            src={url}
            alt="item image"
            loading="lazy"
            onClick={onPreviewHandler}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined">수정하기</Button>
            <Button variant="outlined">삭제하기</Button>
          </Box>
        </Box>
      </Paper>
      {preview && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10,
          }}
          onClick={onPreviewHandler}
        >
          <Box
            sx={{
              position: 'fixed',
              top: '200px',
              left: 'calc(50% - 360px)',
              width: 720,
              height: 720,
              zIndex: 15,
            }}
          >
            <img
              src={url}
              alt="preview"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        </Box>
      )}
    </ImageListItem>
  );
};

export default SyntaxItemCard;
