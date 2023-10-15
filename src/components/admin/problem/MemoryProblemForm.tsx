import React, { useEffect, useState } from 'react';
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

interface PropsType {
  currentLevel: number;
}

const ContainerStyle = styled(Box)({
  height: 'calc(100% - 60px)',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

const BlockStyle = styled(Box)({
  width: '100%',
  height: 'fit-content',
  display: 'flex',
  position: 'relative',
  border: '1px solid black',
  '& > :nth-child(2)': {
    position: 'absolute',
    left: '80px',
  },
});

const MemoryProblemForm: React.FC<PropsType> = ({ currentLevel }) => {
  const [problemNumber, setProblemNumber] = useState(0);
  const location = useLocation();

  console.log('memory problem form', location.pathname, currentLevel);

  useEffect(() => {
    const paths = location.pathname.split('/');
    const [level, number] = paths[paths.length - 1].split('-');
    console.log('level is ', level, 'number is ', number);
  }, [location.pathname]);

  return (
    <ContainerStyle>
      <Box>기억력 향상 폼 레벨. {currentLevel}</Box>
      <BlockStyle>
        <Typography>문제</Typography>
        <TextField sx={{ width: 620 }} size="small" />
      </BlockStyle>
      <BlockStyle>
        <Typography>반응지연</Typography>
        <TextField type="number" sx={{ width: 620 }} size="small" />
      </BlockStyle>
      <BlockStyle>
        <Typography>보기개수</Typography>
        <Grid
          container
          sx={{
            width: '90%',
            height: 340,
            overflowY: 'auto',
            border: '1px solid black',
            padding: 2,
          }}
        >
          <ItemButton />
          <ItemButton />
          <ItemButton />
          <ItemButton />
          <ItemButton />
          <ItemButton />
          <ItemButton />
          <ItemButton />
          <ItemButton />
        </Grid>
      </BlockStyle>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginTop: 'auto',
        }}
      >
        <Button>취소</Button>
        <Button>저장</Button>
      </Box>
    </ContainerStyle>
  );
};

export default MemoryProblemForm;
