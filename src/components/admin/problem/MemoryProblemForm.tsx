import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  styled,
  Grid,
  Button,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import ItemButton from './ItemButton';
import useSWR from 'swr';
import { fetcher } from '../../../utils/fetcher';
import EmptyItemButton from './EmptyItemButton';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Overlay from '../../commons/Overlay';
import AddImageItemForm from './AddImageItemForm';

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

  const { data, error, isLoading } = useSWR(
    `problem/memory/${currentProblemId}/`,
    (url) => fetcher({ url })
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

  useEffect(() => {
    if (data) {
      setItemCount(data.choice_count || 0);
      setDelay(data.response_delay || 0);
      setItems(data.choices.length);
      const problemText = data.choices
        .map((item: any) => item.item_name)
        .join(', ');
      setProblem(problemText);
    }
  }, [data]);

  const emptyItems = useMemo(() => {
    const length = data?.choices ? data.choices.length : 0;
    return Array(itemCount > length ? itemCount - length : 0).fill(0);
  }, [itemCount, data]);

  return (
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
          src="http://example.com/audio.mp3"
          onPlay={(e) => console.log('onPlay')}
          // other props here
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
          {data &&
            data.choices.map((item: any) => (
              <ItemButton
                key={item.pk}
                fontSize={40}
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
        <Button variant="outlined">저장</Button>
      </Box>
      <Overlay>{<AddImageItemForm />}</Overlay>
    </ContainerStyle>
  );
};

export default MemoryProblemForm;
