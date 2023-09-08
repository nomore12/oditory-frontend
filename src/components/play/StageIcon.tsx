import React from 'react';
import { Box, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface PropsType {
  isClear: boolean;
  isStar: boolean;
  stageNumber: number;
  color?: string;
}

const StageIcon: React.FC<PropsType> = ({
  isClear,
  isStar,
  stageNumber,
  color = '#ECECEC',
}) => {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: 64,
          height: 64,
          border: '5px solid darkgray',
          borderRadius: '50%',
          backgroundColor: isClear ? 'yellow' : color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">{stageNumber}</Typography>
        {isStar && (
          <StarBorderIcon
            sx={{
              width: 32,
              height: 32,
              position: 'absolute',
              top: -20,
              left: 12,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default StageIcon;
