import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import StarNumberIcon from '../components/commons/StarNumberIcon';
import useGetHook from '../hooks/useGetHook';

const ContainerStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('/images/bg-01-01-1@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const arr = [];
for (let i = 0; i < 40; i++) {
  arr.push(i + 1);
}

const stageArr = arr.map((item, index) => {
  return (
    <Box key={index} sx={{ margin: '1rem' }}>
      <StarNumberIcon starNumber={index + 1} />
    </Box>
  );
});

const PlayRememberPage: React.FC = () => {
  const { data, error, mutate } = useGetHook('problem/memory/');

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  const starArr = data?.map((item: any, index: number) => {
    return (
      <Box key={index} sx={{ margin: '1rem' }}>
        <StarNumberIcon starNumber={item.problem.question_number} />
      </Box>
    );
  });

  return (
    <ContainerStyle>
      <Typography variant="h2" fontWeight={600}>
        단어를 듣고 알맞은 정답을 찾아보세요.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: 25 }}>
        {starArr}
      </Box>
    </ContainerStyle>
  );
};

export default PlayRememberPage;
