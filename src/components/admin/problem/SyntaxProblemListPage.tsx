import React, { useState } from 'react';
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';

interface PropsType {
  type: string;
}

const dummyData = [
  { level: 1, no: 1, title: '문제1' },
  { level: 1, no: 2, title: '문제2' },
  { level: 1, no: 3, title: '문제3' },
  { level: 1, no: 4, title: '문제4' },
];

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

const RowStyle = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SyntaxProblemListPage: React.FC<PropsType> = ({ type }) => {
  const [level, setLevel] = useState('1');

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
          <Link to={`/admin/problem/syntax/create`}>문제 만들기</Link>
        </StyledBox>
      </Box>
      <Divider />
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>문제</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData &&
                dummyData.map((row: any, index: number) => (
                  <RowStyle
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    // onClick={() => {
                    //   handleProblemNumberClick(row.pk);
                    // }}
                  >
                    <TableCell>{row.no}</TableCell>
                    <TableCell>{row.title}</TableCell>
                  </RowStyle>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default SyntaxProblemListPage;
