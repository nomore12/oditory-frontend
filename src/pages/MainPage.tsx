import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: '2rem', paddingBottom: 10 }}>
        <Link to={'/play-remember'}>
          <Box
            sx={{
              width: 300,
              height: 400,
              border: '1px solid black',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            <Typography variant="h2" fontWeight={600}>
              기억하기
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarIcon />
              <ClearIcon />
              <Typography variant="h6">16</Typography>
            </Box>
          </Box>
        </Link>
        <Link to={'/play-order'}>
          <Box
            sx={{
              width: 300,
              height: 400,
              border: '1px solid black',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            <Typography variant="h2" fontWeight={600}>
              지시 따르기
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarIcon />
              <ClearIcon />
              <Typography variant="h6">6</Typography>
            </Box>
          </Box>
        </Link>
        <Link to={'/play-understand'}>
          <Box
            sx={{
              width: 300,
              height: 400,
              border: '1px solid black',
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '3rem',
            }}
          >
            <Typography variant="h2" fontWeight={600}>
              구문이해
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <StarIcon />
              <ClearIcon />
              <Typography variant="h6">3</Typography>
            </Box>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default MainPage;
