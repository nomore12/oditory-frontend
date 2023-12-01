import React from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Link } from 'react-router-dom';

interface PropsType {
  type: 'basic' | 'time' | 'quantity' | 'location';
}

const StyledBox = styled(Box)(({ theme }) => ({
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingRight: 10,
  paddingLeft: 10,
  border: '1px solid rgb(190, 190, 190)',
  borderRadius: 3,

  '& a': {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const OrderProblemListPage: React.FC<PropsType> = ({ type }) => {
  const [level, setLevel] = React.useState('1');

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
  };

  return (
    <Box>
      <Box
        sx={{ display: 'flex', gap: 2, alignItems: 'center', paddingBottom: 2 }}
      >
        <FormControl>
          <InputLabel id="demo-simple-select-label">레벨</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={level}
            label="레벨"
            size="small"
            onChange={handleChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
        <StyledBox>
          <Link to="/admin/problem/order/create">문제 만들기</Link>
        </StyledBox>
      </Box>
      <Divider />
      <Box>content</Box>
    </Box>
  );
};

export default OrderProblemListPage;
