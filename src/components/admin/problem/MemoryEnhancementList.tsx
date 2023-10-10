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
} from '@mui/material';

interface PropsType {
  level: number;
}

function createData(
  level: number,
  count: number,
  answer: number,
  delay: number
) {
  return { name, level, count, answer, delay };
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
];

const MemoryEnhancement: React.FC<PropsType> = ({ level }) => {
  return (
    <div>
      <Typography>{level}</Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>레벨</TableCell>
                <TableCell>보기수</TableCell>
                <TableCell>답변수</TableCell>
                <TableCell>반응지연(초)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.level}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.level}
                  </TableCell>
                  <TableCell>{row.count}</TableCell>
                  <TableCell>{row.answer}</TableCell>
                  <TableCell>{row.delay}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default MemoryEnhancement;
