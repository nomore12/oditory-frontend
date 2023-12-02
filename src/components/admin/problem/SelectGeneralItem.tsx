import React from 'react';
import { Box, Paper } from '@mui/material';

interface PropsType {
  id: number;
  url: string;
  overlayHandler: () => void;
  handleItemClicked: (id: number) => void;
}

const SelectGeneralItem: React.FC<PropsType> = ({
  id,
  url,
  overlayHandler,
  handleItemClicked,
}) => {
  return (
    <Paper
      sx={{ width: '100%', height: '100%' }}
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
    </Paper>
  );
};

export default SelectGeneralItem;
