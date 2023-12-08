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
  answers: number[];
  itemList: number[];
  setItemList: (itemList: number[]) => void;
  setAnswers: (answers: number[]) => void;
  sequential: string;
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

const ProblemItemSelectBox: React.FC<PropsType> = ({
  row,
  col,
  answers,
  itemList,
  setItemList,
  setAnswers,
  sequential,
}) => {
  // const [listItem, setListItem] = useState<number[]>([]);
  const [clickedItem, setClickedItem] = useState<number | undefined>(undefined);
  const [selectedImageItemId, setSelectedImageItemId] = useState<number>(-1);
  const { overlayHandler } = useOverlay();

  const { data, error, isLoading, mutate } = useSWR(
    'item/general-image-items/?type=order',
    (url) => fetcher({ url })
  );

  const handleItemClicked = (index: number, id: number) => {
    overlayHandler();
    setClickedItem(index);
  };

  const handleAnswerItemClicked = (
    e: React.MouseEvent,
    index: number,
    id: number
  ) => {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      const newArr = answers ? [...answers] : [];
      newArr.push(id);
      setAnswers([...newArr]);
      console.log(newArr);
    } else {
      const newArr = answers ? [...answers] : [];
      const index = newArr.findIndex((item) => item === id);
      newArr.splice(index, 1);
      setAnswers([...newArr]);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setItemList(Array.from({ length: 3 * col }, (_) => -10));
    }
  }, [isLoading]);

  useEffect(() => {
    setItemList(Array.from({ length: 3 * col }, (_) => -10));
    setClickedItem(undefined);
    setSelectedImageItemId(-1);
  }, [col]);

  useEffect(() => {
    if (clickedItem !== undefined && clickedItem > -1) {
      const newArr = [...itemList];
      newArr[clickedItem] = selectedImageItemId;
      if (itemList.find((item) => item === selectedImageItemId) !== undefined) {
        alert('중복된 이미지를 선택할 수 없습니다.');
        return;
      }

      setItemList(newArr);
      setItemList(newArr);
    }
  }, [selectedImageItemId]);

  useEffect(() => {
    console.log('initial', answers, sequential);
  }, []);

  useEffect(() => {
    console.log('sequential', sequential);
    // setItemList([...itemList]);
  }, [sequential]);

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
        {itemList &&
          itemList.map((id, index) =>
            id > -1 ? (
              <StyledGridItem key={index} item xs={12 / col}>
                <div>
                  <Paper
                    sx={{ position: 'relative' }}
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
                    <Typography
                      sx={{ position: 'absolute', top: 10, left: 10 }}
                    >
                      {data.find((item: any) => item.id === id)?.title}
                    </Typography>
                    <Box>
                      {
                        sequential === '1' && 'asdfgasdf'
                        // sequential === '1' &&
                        // answers &&
                        // answers.findIndex((item) => item === id) >= 0 && (
                        //   <Box
                        //     sx={{
                        //       position: 'absolute',
                        //       width: 30,
                        //       height: 30,
                        //       bottom: 10,
                        //       right: 10,
                        //       backgroundColor: '#a9a9a9',
                        //       borderRadius: '50%',
                        //       display: 'flex',
                        //       justifyContent: 'center',
                        //       alignItems: 'center',
                        //     }}
                        //   >
                        //     {answers
                        //       ? answers.findIndex((item) => item === id) >= 0
                        //         ? answers.findIndex((item) => item === id) + 1
                        //         : null
                        //       : null}
                        //   </Box>
                        // )
                      }
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 4,
                        bottom: 4,
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
                          handleAnswerItemClicked(e, index, id);
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
