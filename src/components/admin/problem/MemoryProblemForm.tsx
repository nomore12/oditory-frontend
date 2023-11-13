import React, { useEffect, useMemo, useState } from 'react';
import { Box, TextField, Typography, styled, Button } from '@mui/material';
import ItemButton from './ItemButton';
import useSWR, { mutate } from 'swr';
import { fetcher } from '../../../utils/fetcher';
import EmptyItemButton from './EmptyItemButton';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Overlay from '../../commons/Overlay';
import AddImageItemForm from './AddImageItemForm';
import { OverlayProvider } from '../../../context/OverlayContext';
import { useAddItemStore } from '../../../store/MemoryStore';
import usePostHook from '../../../hooks/usePostHook';
import usePatchHook from '../../../hooks/usePatchHook';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  currentLevel: number;
  currentProblemId: number;
}

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

// ... other styles

const MemoryProblemForm: React.FC<PropsType> = ({
  currentLevel,
  currentProblemId,
}) => {
  const [itemCount, setItemCount] = useState(0);
  const [delay, setDelay] = useState(0);
  const [problem, setProblem] = useState('');
  const [items, setItems] = useState(0);
  const [itemArray, setItemArray] = useState<any[]>([]);
  const [answerItems, setAnswerItems] = useState<number[]>([]);
  const [soundUrl, setSoundUrl] = useState('');
  const [level, setLevel] = useState(0);
  const [problemNumber, setProblemNumber] = useState(0);
  const { clickedItemId, answerId, setClickedItemId, setAnswerId } =
    useAddItemStore((state: any) => state);
  const navigate = useNavigate();

  const {
    data: responseData,
    error: patchError,
    isValidating,
    executePatch,
  } = usePatchHook(
    `problem/memory/${currentProblemId}/`,
    {
      problem: {
        type: 'memory',
        level: level,
        question_number: problemNumber,
      },
      choices: itemArray.map((item) => item.pk),
      answers: answerItems,
      choice_count: itemCount,
      answer_count: answerItems.length,
      syllable_count: 4,
      has_response_delay: true,
      response_delay: delay,
    },
    { 'Content-Type': 'application/json' }
  );

  const { data, error, isLoading } = useSWR(
    `problem/memory/${currentProblemId}/`,
    (url) => fetcher({ url })
  );

  const { data: imageItemData } = useSWR('item/images/', (url) =>
    fetcher({ url })
  );

  const onCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (items > Number(e.target.value)) {
      return;
    } else {
      setItemCount(Number(e.target.value));
    }
  };

  const onDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelay(Number(e.target.value));
  };

  const onLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevel(Number(e.target.value));
  };

  const onProblemNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProblemNumber(Number(e.target.value));
  };

  const onSubmit = () => {
    if (
      itemArray.length !== itemCount ||
      itemArray.length < 1 ||
      answerItems.length < 1 ||
      problemNumber < 1 ||
      level < 1
    ) {
      alert('보기 개수와 정답 개수를 확인해주세요.');
      return;
    }

    executePatch({
      problem: {
        type: 'memory',
        level: level,
        question_number: problemNumber,
      },
      choices: itemArray.map((item) => item.pk),
      answers: answerItems,
      choice_count: itemCount,
      answer_count: answerItems.length,
      syllable_count: 4,
      has_response_delay: true,
      response_delay: delay,
    }).then(() => {
      // 패치 요청이 성공적으로 완료되면 SWR 캐시를 갱신하고 페이지 이동
      mutate(`problem/memory/${currentProblemId}/`);
      navigate('/admin/problem/memory');
    });
  };

  useEffect(() => {
    if (data) {
      setItemCount(data.choice_count || 0);
      setDelay(data.response_delay || 0);
      setItems(data.choices.length);
      setItemArray([...data.choices]);
      setAnswerItems([...data.answers.map((answer: any) => answer.pk)]);
      setSoundUrl(data.problem.sound_item.sound);
      setLevel(data.problem.level);
      setProblemNumber(data.problem.question_number);
      const problemText = data.answers
        .map((item: any) => item.item_name)
        .join(', ');
      setProblem(problemText);
    }
  }, [data]);

  const emptyItems = useMemo(() => {
    const length = itemArray ? itemArray.length : 0;
    return Array(itemCount > length ? itemCount - length : 0).fill(0);
  }, [itemCount, itemArray]);

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
      const items = answerItems.filter((item) => item !== deleteItemId);
      setAnswerItems([...items]);
      setItemArray(itemArray.filter((item: any) => item.pk !== deleteItemId));
      setClickedItemId(null);
    }
  }, [clickedItemId]);

  useEffect(() => {
    if (answerId !== null && answerId > 0) {
      setAnswerItems((prev) => [...prev, answerId]);
      setAnswerId(null);
    } else if (answerId < 0) {
      const deletedId = answerId * -1;

      setAnswerItems((prev) => prev.filter((item) => item !== deletedId));
      setAnswerId(null);
    }
  }, [answerId]);

  useEffect(() => {
    const text = itemArray
      .filter((item: any) => answerItems.includes(item.pk))
      .map((item: any) => item.item_name)
      .join(', ');
    setProblem(text);
  }, [answerItems]);

  return (
    <OverlayProvider>
      <ContainerStyle>
        <Box>기억력 향상 폼 레벨. {currentLevel}</Box>
        <BlockStyle>
          <Typography>문제</Typography>
          <TextField value={problem} sx={{ width: 620 }} size="small" />
        </BlockStyle>
        <BlockStyle height={'130px'}>
          <Typography>음성</Typography>
          <AudioPlayer
            autoPlay
            src={soundUrl}
            onPlay={(e) => console.log('onPlay')}
          />
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
                answer={answerItems.some(
                  (answerItem: any) => answerItem === item.pk
                )}
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

export default MemoryProblemForm;
