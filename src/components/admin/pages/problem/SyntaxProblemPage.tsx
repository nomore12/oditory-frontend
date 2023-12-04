import React, { useEffect, useState } from 'react';
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import SyntaxProblemForm from '../../problem/SyntaxProblemForm';
import SyntaxProblemListPage from '../../problem/SyntaxProblemListPage';
import OrderProblemPanel from './OrderProblemPanel';
import OrderProblemListPage from './OrderProblemListPage';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SyntaxProblemPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('');
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const paths = location.pathname.split('/');
    setCurrentLocation(paths[paths.length - 1]);
  }, [location.pathname]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        sx={{ paddingLeft: 2, paddingTop: 2 }}
      >
        구문 이해
      </Typography>
      <Divider />
      <Box
        sx={{
          height: currentLocation === 'syntax' ? '100%' : 'calc(100vh - 118px)',
        }}
      >
        <Routes>
          <Route path="/create" element={<SyntaxProblemForm />} />
          {/*<Route*/}
          {/*  path={'255'}*/}
          {/*  element={*/}
          {/*    <MemoryProblemForm*/}
          {/*      currentLevel={Number(1)}*/}
          {/*      currentProblemId={Number(255)}*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
        </Routes>
      </Box>
      {currentLocation === 'syntax' ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              variant="fullWidth"
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="의자에 앉기" {...a11yProps(0)} />
              <Tab label="술래잡기" {...a11yProps(1)} />
              <Tab label="자전거 타기" {...a11yProps(2)} />
              <Tab label="비교" {...a11yProps(3)} />
              <Tab label="물건주기" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <OrderProblemPanel value={value} index={0}>
            <SyntaxProblemListPage type="chair" />
          </OrderProblemPanel>
          <OrderProblemPanel value={value} index={1}>
            <SyntaxProblemListPage type="hide" />
          </OrderProblemPanel>
          <OrderProblemPanel value={value} index={2}>
            <SyntaxProblemListPage type="bike" />
          </OrderProblemPanel>
          <OrderProblemPanel value={value} index={3}>
            <SyntaxProblemListPage type="compare" />
          </OrderProblemPanel>
          <OrderProblemPanel value={value} index={4}>
            <SyntaxProblemListPage type="send" />
          </OrderProblemPanel>
        </>
      ) : null}
    </Box>
  );
};

export default SyntaxProblemPage;
