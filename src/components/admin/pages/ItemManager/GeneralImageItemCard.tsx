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
import useDeleteHook from '../../../../hooks/useDeleteHook';
import type { KeyedMutator } from 'swr';

interface PropsType {
  url: string;
  id: number;
  openHandler: () => void;
  setModify: (modify: boolean) => void;
  setCurrentId: (id: number) => void;
  mutate: KeyedMutator<any>;
}

const GeneralImageItemCard: React.FC<PropsType> = ({
  url,
  id,
  openHandler,
  setModify,
  setCurrentId,
  mutate,
}) => {
  const [preview, setPreview] = useState<boolean>(false);

  const onPreviewHandler = () => {
    setPreview(!preview);
  };

  const { executeDelete } = useDeleteHook(`item/general-image-items/${id}/`);

  const onDelete = async () => {
    const isSuccess = await executeDelete();
    if (isSuccess) {
      alert('삭제되었습니다.');
      mutate();
    } else {
      alert('삭제에 실패하였습니다.');
    }
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
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            padding: 2,
          }}
        >
          <Box onClick={onPreviewHandler}>
            <img
              style={{
                width: '170px',
                maxHeight: '108px',
                objectFit: 'contain',
              }}
              src={url}
              alt="item image"
              loading="lazy"
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setModify(true);
                setCurrentId(id);
                console.log('curr', id);
                openHandler();
              }}
            >
              수정하기
            </Button>
            <Button variant="outlined" onClick={onDelete}>
              삭제하기
            </Button>
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

export default GeneralImageItemCard;
