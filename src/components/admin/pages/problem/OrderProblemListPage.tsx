import React, { useEffect } from 'react';
import {
  Box,
  Button,
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
import type { SelectChangeEvent } from '@mui/material/Select';
import { Link, useSearchParams } from 'react-router-dom';

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

const RowStyle = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createData(
  level: number,
  answerType: number,
  colorCount: number,
  size: boolean,
  optionCount: number,
  answerCount: number
) {
  return { level, answerType, colorCount, size, optionCount, answerCount };
}

const dummyData = [
  {
    level: 1,
    answerType: 1,
    colorCount: 1,
    size: false,
    optionCount: 4,
    answerCount: 1,
  },
  {
    level: 1,
    answerType: 1,
    colorCount: 1,
    size: false,
    optionCount: 4,
    answerCount: 1,
  },
  {
    level: 1,
    answerType: 1,
    colorCount: 1,
    size: false,
    optionCount: 4,
    answerCount: 1,
  },
  {
    level: 1,
    answerType: 1,
    colorCount: 1,
    size: true,
    optionCount: 4,
    answerCount: 1,
  },
  {
    level: 1,
    answerType: 1,
    colorCount: 1,
    size: true,
    optionCount: 4,
    answerCount: 1,
  },
  {
    level: 6,
    answerType: 1,
    colorCount: 1,
    size: true,
    optionCount: 4,
    answerCount: 1,
  },
];

const OrderProblemListPage: React.FC<PropsType> = ({ type }) => {
  const [level, setLevel] = React.useState('1');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    params.level = event.target.value as string;
    setSearchParams({ ...params });
  };

  useEffect(() => {
    if (searchParams.get('level')) {
      setLevel(searchParams.get('level') as string);
    }
  }, [searchParams]);

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
          <Link
            to={`/admin/problem/order/create?${
              searchParams.get('type') ? `type=${searchParams.get('type')}` : ''
            }${
              searchParams.get('level')
                ? `&level=${searchParams.get('level')}`
                : ''
            }`}
          >
            문제 만들기
          </Link>
        </StyledBox>
      </Box>
      <Divider />
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>레벨</TableCell>
                <TableCell>보기종류</TableCell>
                <TableCell>색상</TableCell>
                <TableCell>크기</TableCell>
                <TableCell>보기개수</TableCell>
                <TableCell>답변수</TableCell>
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
                    <TableCell>{row.level}</TableCell>
                    <TableCell>{row.answerType}</TableCell>
                    <TableCell>{row.colorCount}</TableCell>
                    <TableCell>{row.size ? '적용' : '없음'}</TableCell>
                    <TableCell>{row.optionCount}</TableCell>
                    <TableCell>{row.answerCount}</TableCell>
                  </RowStyle>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default OrderProblemListPage;
