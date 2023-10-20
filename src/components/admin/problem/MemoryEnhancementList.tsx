import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  styled,
} from '@mui/material';

interface PropsType {
  problemNumber: string;
  handleProblemNumberClick: (selectedNumber: number) => void;
  data: any;
  currentLevel: number;
}

const RowStyle = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createData(
  no: number,
  count: number,
  answer: number,
  delay: number,
  pk: number
) {
  return { no, count, answer, delay, pk };
}

const MemoryEnhancement: React.FC<PropsType> = ({
  problemNumber,
  handleProblemNumberClick,
  data,
  currentLevel,
}) => {
  const rows = data
    ? data
        .filter((item: any) => item.problem.level === currentLevel)
        .map((item: any) => {
          return createData(
            item.problem.question_number,
            item.choice_count,
            item.answer_count,
            item.response_delay,
            item.id
          );
        })
    : null;

  return (
    <div>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>보기수</TableCell>
                <TableCell>답변수</TableCell>
                <TableCell>반응지연(초)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row: any) => (
                  <RowStyle
                    key={row.no}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => {
                      handleProblemNumberClick(row.pk);
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.no}
                    </TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{row.delay}</TableCell>
                  </RowStyle>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default MemoryEnhancement;
