import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, styled, TextField, Typography } from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import ItemButton from './ItemButton';
import EmptyItemButton from './EmptyItemButton';
import Overlay from '../../commons/Overlay';
import AddImageItemForm from './AddImageItemForm';
import { OverlayProvider } from '../../../context/OverlayContext';
import { useAddItemStore } from '../../../store/MemoryStore';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import usePostHook from '../../../hooks/usePostHook';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(80px, 240px))',
  justifyContent: 'space-between',
  gap: 16,
  border: '1px solid black',
  width: 760,
  height: 420,
  overflowY: 'auto',
  padding: 16,
}));

const ContainerStyle = styled(Box)({
  height: 'calc(100% - 60px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const BlockStyle = styled(Box)(({ height }: { height?: string }) => ({
  width: '100%',
  height: height ? height : 'fit-content',
  display: 'flex',
  position: 'relative',
  '& > :nth-child(2)': {
    position: 'absolute',
    left: '80px',
  },

  '& > .rhap_container': {
    width: '620px',
  },

  '& > .rhap_main': {
    width: '600px',
  },

  '& .rhap_progress-section': {
    width: '590px',
  },

  '& .rhap_controls-section': {
    width: '590px',
  },
}));

const MemoryProblemCreateForm: React.FC = () => {
  const [problemText, setProblemText] = useState('');
  const [delay, setDelay] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [itemArray, setItemArray] = useState<any[]>([]);
  const [level, setLevel] = useState(0);
  const [problemNumber, setProblemNumber] = useState(0);
  const [answerItems, setAnswerItems] = useState<number[]>([]);

  const { clickedItemId, answerId, setClickedItemId, setAnswerId } =
    useAddItemStore((state: any) => state);

  const { data: imageItemData } = useSWR('item/images/', (url) =>
    fetcher({ url })
  );

  const {
    data: responseData,
    error,
    isValidating,
    executePost,
  } = usePostHook('problem/memory/', {
    problem: {
      type: 'memory',
      level: level,
      question_number: problemNumber,
    },
    choice_count: itemCount,
    answer_count: answerItems.length,
    choices: itemArray.map((item: any) => item.pk),
    answers: answerItems,
  });

  const a = {
    problem: {
      type: 'memory',
      level: 2,
      question_number: 2,
    },
    choice_count: 4,
    answer_count: 1,
    choices: [25, 32, 28, 29],
    answers: [32, 25],
  };

  const emptyItems = useMemo(() => {
    const length = itemArray ? itemArray.length : 0;
    return Array(itemCount > length ? itemCount - length : 0).fill(0);
  }, [itemCount, itemArray]);

  const onDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value));
  };

  const onCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemCount(Number(e.target.value));
  };

  const onLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(e.target.value));
  };

  const onProblemNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProblemNumber(Number(e.target.value));
  };

  const onSubmit = () => {
    if (
      level < 1 ||
      problemNumber < 1 ||
      itemCount < 1 ||
      itemArray.length < 1 ||
      answerItems.length < 1 ||
      emptyItems.length > 0
    ) {
      return;
    }
  };

  useEffect(() => {
    if (clickedItemId !== null && clickedItemId > 0) {
      const isDuplicated = itemArray.find(
        (item: any) => item.pk === clickedItemId
      );
      if (isDuplicated) {
        setClickedItemId(null);
        return;
      }
      setItemArray([
        ...itemArray,
        imageItemData?.find((item: any) => item.pk === clickedItemId),
      ]);
      setClickedItemId(null);
    } else if (clickedItemId < 0) {
      const deleteItemId = clickedItemId * -1;
      setItemArray(itemArray.filter((item: any) => item.pk !== deleteItemId));
      setClickedItemId(null);
    }
  }, [clickedItemId]);

  useEffect(() => {
    if (answerId !== null && answerId > 0) {
      setAnswerItems([...answerItems, answerId]);
      setAnswerId(null);
    } else if (answerId < 0) {
      const deletedId = answerId * -1;
      setAnswerItems(answerItems.filter((item: any) => item !== deletedId));
      setAnswerId(null);
    }
  }, [answerId]);

  useEffect(() => {
    const text = itemArray.map((item: any) => item.item_name).join(', ');
    setProblemText(text);
  }, [itemArray]);

  return (
    <OverlayProvider>
      <ContainerStyle>
        <Box>기억력 향상 문제 만들기</Box>
        <BlockStyle>
          <Typography>문제</Typography>
          <TextField value={problemText} sx={{ width: 620 }} size="small" />
        </BlockStyle>
        <BlockStyle height={'130px'}>
          <Typography>음성</Typography>
          <AudioPlayer autoPlay src="" onPlay={(e) => console.log('onPlay')} />
        </BlockStyle>
        <BlockStyle>
          <Typography>반응지연</Typography>
          <TextField
            value={delay}
            type="number"
            sx={{ width: 620 }}
            size="small"
            onChange={onDelayChange}
          />
        </BlockStyle>
        <BlockStyle>
          <Typography>레벨</Typography>
          <TextField
            value={level}
            type="number"
            sx={{ width: 620 }}
            size="small"
            onChange={onLevelChange}
          />
        </BlockStyle>
        <BlockStyle>
          <Typography>문제 번호</Typography>
          <TextField
            value={problemNumber}
            type="number"
            sx={{ width: 620 }}
            size="small"
            onChange={onProblemNumberChange}
          />
        </BlockStyle>
        <BlockStyle>
          <Typography>보기개수</Typography>
          <TextField
            value={itemCount}
            type="number"
            sx={{ width: 620 }}
            size="small"
            onChange={onCountChange}
          />
        </BlockStyle>
        <BlockStyle>
          <Typography>보기</Typography>
          <GridContainer>
            {itemArray.map((item: any) => (
              <ItemButton
                key={item.pk}
                id={item.pk}
                name={item.item_name}
                category={item.category}
                syllableCount={item.syllable_count}
                image={item.image}
              />
            ))}
            {emptyItems.length > 0 &&
              emptyItems.map((item: any, index: number) => (
                <EmptyItemButton key={index} />
              ))}
          </GridContainer>
        </BlockStyle>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 'auto',
            gap: 2,
          }}
        >
          <Button variant="outlined">취소</Button>
          <Button onClick={onSubmit} variant="outlined">
            저장
          </Button>
        </Box>

        <Overlay>
          <AddImageItemForm />
        </Overlay>
      </ContainerStyle>
    </OverlayProvider>
  );
};

export default MemoryProblemCreateForm;
