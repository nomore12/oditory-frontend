import React, { useEffect, useState } from 'react';
import { Box, Button, ImageList, Typography } from '@mui/material';
import GeneralImageItemCard from './GeneralImageItemCard';
import usePostHook from '../../../../hooks/usePostHook';
import { useOverlay } from '../../../../hooks/useOverlay';
import Overlay from '../../../commons/Overlay';
import AddGeneralImageItemForm from './AddGeneralImageItemForm';
import { fetcher } from '../../../../utils/fetcher';
import useSWR from 'swr';
import usePostData from '../../../../hooks/usePostHook';

const OrderItemManagement: React.FC = () => {
  const [images, setImages] = useState<
    { id: number; image: string; others: string; type: string }[]
  >([]);
  const { isAdd, overlayHandler } = useOverlay();
  const [isModify, setModify] = useState(false);
  const [currentId, setCurrentId] = useState<number | undefined>(undefined);

  const { data, error, isLoading, mutate } = useSWR(
    'item/general-image-items/?type=order',
    (url) => fetcher({ url })
  );

  const onItemAddHandler = () => {
    overlayHandler();
  };

  useEffect(() => {
    console.log('loading', isLoading);
    if (!isLoading) {
      setImages(data);
      console.log(data);
    }
  }, [isLoading]);

  return (
    <Box>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography>지시따르기 아이템 관리</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setCurrentId(undefined);
              onItemAddHandler();
            }}
          >
            아이템 추가
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh - 190px)',
            overflowY: 'auto',
            padding: 1,
            backgroundColor: '#e5e5e5',
            border: '1px solid #e5e5e5',
            borderRadius: 1,
          }}
        >
          <ImageList
            sx={{
              width: '100%',
              overflowY: 'auto',
            }}
            cols={4}
            rowHeight={230}
          >
            {data
              ? data.map((item: any) => (
                  <div key={item.id}>
                    <GeneralImageItemCard
                      url={item.image}
                      id={item.id}
                      title={item.title}
                      openHandler={onItemAddHandler}
                      setModify={setModify}
                      setCurrentId={setCurrentId}
                      mutate={mutate}
                    />
                  </div>
                ))
              : null}
          </ImageList>
        </Box>
      </Box>
      <Overlay>
        {
          <AddGeneralImageItemForm
            openHandler={onItemAddHandler}
            mutate={mutate}
            type="order"
            id={currentId}
            setModify={setModify}
          />
        }
      </Overlay>
    </Box>
  );
};

export default OrderItemManagement;
