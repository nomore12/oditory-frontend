import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface PropsType {
  level: number;
}

const BlockStyle = styled(Box)({
  width: '100%',
  display: 'flex',
  border: '1px solid black',
});

const MemoryProblemForm: React.FC<PropsType> = ({ level }) => {
  const [problemNumber, setProblemNumber] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const paths = location.pathname.split('/');
    setProblemNumber(Number(paths[paths.length - 1]));
    console.log(problemNumber);
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Box>기억력 향상 폼 레벨. {level}</Box>
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
      </BlockStyle>
    </Box>
  );
};

export default MemoryProblemForm;
