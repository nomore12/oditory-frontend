import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import styled from 'styled-components';
import { useOverlay } from '../../../hooks/useOverlay';
import Overlay from '../../../components/commons/Overlay';
import { fetcher } from '../../../utils/fetcher';
import useSWR from 'swr';
import SelectGeneralItem from './SelectGeneralItem';

interface PropsType {
  row: number;
  col: number;
}

const StyledGridItem = styled(Grid)`
  position: relative;
  width: 100px;
  height: 200px;

  &:before {
    content: '';
    display: block;
    padding-top: 100%; // 1:1 비율을 유지하기 위해 가로 크기와 동일한 패딩을 적용
  }

  > div {
    // 실제 콘텐츠를 담는 컨테이너
    position: absolute;
    top: calc(50% - 80px);
    left: calc(50% - 90px);
    padding: 10px;

    > div {
      background-color: white;
      width: 160px !important;
      height: 160px !important;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ProblemItemSelectBox: React.FC<PropsType> = ({ row, col }) => {
  const [listItem, setListItem] = useState<number[]>([]);
  const [clickedItem, setClickedItem] = useState<number | undefined>(undefined);
  const [selectedImageItemId, setSelectedImageItemId] = useState<number>(-1);
  const [answers, setAnswers] = useState<number[]>([]);

  const { overlayHandler } = useOverlay();

  const { data, error, isLoading, mutate } = useSWR(
    'item/general-image-items/?type=order',
    (url) => fetcher({ url })
  );

  const handleItemClicked = (index: number, id: number) => {
    overlayHandler();
    setClickedItem(index);
  };

  useEffect(() => {
    if (!isLoading) {
      setListItem(Array.from({ length: 3 * col }, (_) => -10));
    }
  }, [isLoading]);

  useEffect(() => {
    setListItem(Array.from({ length: 3 * col }, (_) => -10));
    setClickedItem(undefined);
    setSelectedImageItemId(-1);
    const arr = Array.from({ length: 3 * col }, (_) => -1);
    setAnswers([...arr]);
  }, [col]);

  useEffect(() => {
    if (clickedItem !== undefined && clickedItem > -1) {
      const newArr = [...listItem];
      newArr[clickedItem] = selectedImageItemId;
      setListItem(newArr);
    }
  }, [selectedImageItemId]);

  useEffect(() => {
    console.log(listItem);
  }, [listItem]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        marginTop: 2,
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ececec',
        borderRadius: 2,
      }}
    >
      <Grid container>
        {listItem &&
          listItem.map((id, index) =>
            id > -1 ? (
              <StyledGridItem key={index} item xs={12 / col}>
                <div>
                  <Paper
                    component="div"
                    elevation={4}
                    onClick={() => {
                      handleItemClicked(index, id);
                    }}
                  >
                    <img
                      src={data.find((item: any) => item.id === id)?.image}
                      alt={data.find((item: any) => item.id === id)?.title}
                      style={{
                        objectFit: 'contain',
                        height: '100%',
                        width: '100%',
                        padding: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 16,
                        bottom: 16,
                        padding: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FormControlLabel
                        control={<Checkbox />}
                        label="정답:"
                        labelPlacement="start"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('clicked', id, index);
                        }}
                      />
                    </Box>
                  </Paper>
                </div>
              </StyledGridItem>
            ) : (
              <StyledGridItem key={index} item xs={12 / col}>
                <div>
                  <Paper component="div" elevation={4}>
                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        overlayHandler();
                        setClickedItem(index);
                      }}
                    >
                      <AddCircleOutlineIcon sx={{ fontSize: 80 }} />
                    </IconButton>
                  </Paper>
                </div>
              </StyledGridItem>
            )
          )}
      </Grid>
      <Overlay>
        <Box
          sx={{ width: 720, height: 760, backgroundColor: 'white', zIndex: 10 }}
        >
          <Box sx={{ padding: 1 }}>
            <Typography variant="h6">이미지를 선택하세요.</Typography>
          </Box>
          <Box
            sx={{
              width: 720,
              height: 720,
              backgroundColor: 'white',
              zIndex: 10,
              padding: 2,
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {data &&
              data.map((item: any) => (
                <Box key={item.id} sx={{ width: '100%', height: 180 }}>
                  <SelectGeneralItem
                    id={item.id}
                    url={item.image}
                    title={item.title}
                    overlayHandler={overlayHandler}
                    handleItemClicked={setSelectedImageItemId}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Overlay>
    </Box>
  );
};

export default ProblemItemSelectBox;
