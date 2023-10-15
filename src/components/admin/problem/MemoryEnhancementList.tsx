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
}

const RowStyle = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createData(no: number, count: number, answer: number, delay: number) {
  return { no, count, answer, delay };
}

const rows = [
  createData(1, 10, 4, 1),
  createData(2, 10, 4, 1),
  createData(3, 10, 4, 1),
  createData(4, 10, 4, 1),
  createData(5, 10, 4, 1),
  createData(6, 10, 4, 1),
  createData(7, 10, 4, 1),
  createData(8, 10, 4, 1),
  createData(9, 10, 4, 1),
  createData(10, 10, 4, 1),
];

const MemoryEnhancement: React.FC<PropsType> = ({
  problemNumber,
  handleProblemNumberClick,
}) => {
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
              {rows.map((row) => (
                <RowStyle
                  key={row.no}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => {
                    console.log('problem number is ', row.no);
                    handleProblemNumberClick(row.no);
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
