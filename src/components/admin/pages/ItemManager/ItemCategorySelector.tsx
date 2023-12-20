import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ItemCategorySelector: React.FC = () => {
  const [category, setCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Box sx={{ maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="과일야채">과일야채</MenuItem>
          <MenuItem value="가전가구">가전가구</MenuItem>
          <MenuItem value="교동수단">교동수단</MenuItem>
          <MenuItem value="문구">문구</MenuItem>
          <MenuItem value="숫자">숫자</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ItemCategorySelector;
