import React from 'react';
import { Box, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface LinePropsType {
  name: number;
}

const LineComp: React.FC<LinePropsType> = ({ name }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Typography variant="h5" sx={{ marginRight: 'auto' }}>
        {name} 장
      </Typography>
      <StarBorderIcon sx={{ fontSize: '2rem' }} />
      <StarBorderIcon sx={{ fontSize: '2rem' }} />
      <StarBorderIcon sx={{ fontSize: '2rem' }} />
    </Box>
  );
};

const PlayUnderstandPage: React.FC = () => {
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
        구문 이해
      </Typography>
      <Box sx={{ display: 'flex', marginTop: '6rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: 5,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ width: 500, height: 360 }}>
            <Typography textAlign="center" variant="h4">
              의자에 앉기
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '80%',
                backgroundColor: '#ECECEC',
                borderRadius: 2,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Box key={index}>
                  <LineComp name={index + 1} />
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ width: 500, height: 360 }}>
            <Typography textAlign="center" variant="h4">
              술레잡기
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '80%',
                backgroundColor: '#ECECEC',
                borderRadius: 2,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Box key={index}>
                  <LineComp name={index + 1} />
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ width: 400, height: 360 }}>
            <Typography textAlign="center" variant="h4">
              자전거타기
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '80%',
                backgroundColor: '#ECECEC',
                borderRadius: 2,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <Box key={index}>
                  <LineComp name={index + 1} />
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ width: 400, height: 360 }}>
            <Typography textAlign="center" variant="h4">
              비교
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '80%',
                backgroundColor: '#ECECEC',
                borderRadius: 2,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <Box key={index}>
                  <LineComp name={index + 1} />
                </Box>
              ))}
            </Box>
          </Box>
          <Box sx={{ width: 400, height: 360 }}>
            <Typography textAlign="center" variant="h4">
              물건주기
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '80%',
                backgroundColor: '#ECECEC',
                borderRadius: 2,
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {Array.from({ length: 4 }, (_, index) => (
                <Box key={index}>
                  <LineComp name={index + 1} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PlayUnderstandPage;
