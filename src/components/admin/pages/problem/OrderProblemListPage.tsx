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
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher } from '../../../../utils/fetcher';

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
  answerCount: number,
  choiceCount: number
) {
  return { level, answerType, answerCount, choiceCount };
}

function orderTypeToString(orderType: string) {
  if (orderType === 'sequential') {
    return '순차 방식';
  } else if (orderType === 'and') {
    return 'AND 조건';
  } else if (orderType === 'or') {
    return 'OR 조건';
  } else {
    return '순차 방식';
  }
}

const OrderProblemListPage: React.FC<PropsType> = ({ type }) => {
  const [level, setLevel] = React.useState('1');
  const [searchParams, setSearchParams] = useSearchParams();
  const [problemList, setProblemList] = React.useState<
    {
      id: number;
      level: number;
      title: string;
      choiceCount: number;
      answerCount: number;
      answerType: string;
    }[]
  >([]);
  const [keyUrl, setKeyUrl] = React.useState('');
  const navigate = useNavigate();

  const createSWRKey = (level: string, searchParams: URLSearchParams) => {
    const typeParam = searchParams.get('type')
      ? `&category=${searchParams.get('type')}`
      : '&category=basic';
    return `problem/order/?level=${level}${typeParam}`;
  };

  const { data, error, isLoading, mutate } = useSWR(keyUrl, (url) =>
    fetcher({ url })
  );

  const handleChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value as string);
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    params.level = event.target.value as string;
    setSearchParams({ ...params });
  };

  const handleRowClick = (id: number) => {
    navigate(`/admin/problem/order/${id}`);
  };

  useEffect(() => {
    if (searchParams.get('level')) {
      setLevel(searchParams.get('level') as string);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading) {
      if (data && Array.isArray(data) && data.length > 0) {
        const arr = data.map((item: any) => ({
          id: item.id,
          level: item.problem.level ? item.problem.level : -1,
          title: item.title,
          choiceCount: item.choices ? item.choices.length : 0,
          answerCount: item.answers ? item.answers.length : 0,
          answerType: item.order_type,
        }));
        setProblemList([...arr]);
      } else {
        setProblemList([]);
      }
    }
  }, [isLoading, data]);

  useEffect(() => {
    const url = createSWRKey(level, searchParams);
    setKeyUrl(url);
    mutate(url);
  }, [level, searchParams]);

  useEffect(() => {
    const url = createSWRKey(level, searchParams);
    setKeyUrl(url);
  }, []);

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
                <TableCell>제목</TableCell>
                <TableCell>보기 개수</TableCell>
                <TableCell>답변 방식</TableCell>
                <TableCell>답변 수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problemList &&
                problemList.map((row: any, index: number) => (
                  <RowStyle
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => {
                      handleRowClick(row.id);
                    }}
                  >
                    <TableCell>{row.level}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.choiceCount}</TableCell>
                    <TableCell>{orderTypeToString(row.answerType)}</TableCell>
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
