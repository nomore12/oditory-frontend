import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface PropsType {
  id: number;
  url: string;
  title: string;
  overlayHandler: () => void;
  handleItemClicked: (id: number) => void;
}

const SelectGeneralItem: React.FC<PropsType> = ({
  id,
  url,
  title,
  overlayHandler,
  handleItemClicked,
}) => {
  return (
    <Paper
      sx={{ width: '100%', height: '100%', position: 'relative' }}
      key={id}
      elevation={4}
      onClick={() => {
        console.log('clicked', id, url);
        handleItemClicked(id);
        overlayHandler();
      }}
    >
      <img
        src={url}
        style={{
          objectFit: 'contain',
          height: '100%',
          width: '100%',
          padding: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 2,
          bottom: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: 1,
        }}
      >
        <Typography>{title}</Typography>
      </Box>
    </Paper>
  );
};

export default SelectGeneralItem;
