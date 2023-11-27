import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import usePostData from '../../../../hooks/usePostHook';
import { fetcher } from '../../../../utils/fetcher';
import usePatchHook from '../../../../hooks/usePatchHook';
import useSWR, { mutate } from 'swr';
import type { KeyedMutator } from 'swr';

interface PropsType {
  openHandler: () => void;
  id?: number;
  mutate: KeyedMutator<any>;
}

const BlockStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  '& > :nth-child(2)': {
    position: 'absolute',
    right: '0px',
  },
}));

const AddSyntaxItemForm: React.FC<PropsType> = ({
  openHandler,
  id,
  mutate,
}) => {
  const [file, setFile] = useState<File | null>(null); // [1]
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>(''); // [2
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const postData = {
    image: file,
    type: 'syntax',
    others: '',
  };

  const { executePost } = usePostData('item/general-image-items/', postData, {
    'Content-Type': 'multipart/form-data',
  });

  const {
    data: puData,
    error: putError,
    executePatch,
  } = usePatchHook(`item/images/${id}/`, postData, {
    'Content-Type': 'multipart/form-data',
  });

  const fetchUrl = `item/images/${id}/`;
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

  const onSubmit = async () => {
    const isSuccess = await executePost();
    if (isSuccess) {
      alert('아이템 추가가 완료되었습니다.');
      openHandler();
      mutate();
    } else {
      alert('아이템 추가 중 오류가 발생했습니다.');
      openHandler();
    }
  };
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
          <Typography variant="h4">구문이해 아이템</Typography>
        </BlockStyle>
        <BlockStyle>
          {filePreviewUrl ? (
            <img
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%',
                maxHeight: 280,
              }}
              src={filePreviewUrl}
              alt={filePreviewUrl}
            />
          ) : null}
        </BlockStyle>
        <Box sx={{ marginTop: 'auto' }}>
          <BlockStyle>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button
                variant="outlined"
                onClick={async () => handleButtonClick()}
              >
                {file ? file.name : '파일 선택'}
              </Button>
            </div>
            <Button
              variant="outlined"
              sx={{ marginLeft: '100px' }}
              onClick={onSubmit}
            >
              {id ? '수정' : '업로드'}
            </Button>
          </BlockStyle>
        </Box>
      </Box>
    </Box>
  );
};

export default AddSyntaxItemForm;
