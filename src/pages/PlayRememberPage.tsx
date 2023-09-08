import React from 'react';
import { Box, Typography } from '@mui/material';
import StageIcon from '../components/play/StageIcon';

const arr = [];
for (let i = 0; i < 40; i++) {
  arr.push(i + 1);
}

const stageArr = arr.map((item, index) => {
  return (
    <Box key={index} sx={{ margin: '1rem' }}>
      <StageIcon
        isClear={index < 9 ? true : false}
        isStar={index < 5 ? true : false}
        stageNumber={item}
      />
    </Box>
  );
});

const PlayRememberPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" fontWeight={600}>
        기억하기
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: 25 }}>
        {/*<StageIcon isClear={true} isStar={true} stageNumber={4} />*/}
        {stageArr}
      </Box>
    </Box>
  );
};

export default PlayRememberPage;
