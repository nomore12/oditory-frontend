import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, Divider, Button } from '@mui/material';
import OrderProblemPanel from './OrderProblemPanel';
import OrderProblemListPage from './OrderProblemListPage';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import OrderProblemForm from '../../problem/OrderProblemForm';
import useSWR from 'swr';
import { fetcher } from '../../../../utils/fetcher';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function getOrderQueryParams(type: string) {
  if (type === 'basic') {
    return 0;
  } else if (type === 'time') {
    return 1;
  } else if (type === 'quantity') {
    return 2;
  } else if (type === 'location') {
    return 3;
  } else {
    return 0;
  }
}

function getOrderType(value: number) {
  if (value === 0) {
    return 'basic';
  } else if (value === 1) {
    return 'time';
  } else if (value === 2) {
    return 'quantity';
  } else if (value === 3) {
    return 'location';
  } else {
    return 'basic';
  }
}

const OrderProblemPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('');
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const orderType = getOrderType(newValue);
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    params.type = orderType;
    setSearchParams({ ...params });
  };

  useEffect(() => {
    const paths = location.pathname.split('/');
    setCurrentLocation(paths[paths.length - 1]);
  }, [location.pathname]);

  useEffect(() => {
    if (searchParams.get('type')) {
      setValue(getOrderQueryParams(searchParams.get('type') as string));
    }
  }, [searchParams]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant="h6"
        component="h1"
        gutterBottom
        sx={{ paddingLeft: 2, paddingTop: 2 }}
      >
        지시 따르기
      </Typography>
      <Divider />
      <Box
        sx={{
          height: currentLocation === 'order' ? '100%' : 'calc(100vh - 118px)',
        }}
      >
        <Routes>
          <Route path="/create" element={<OrderProblemForm />} />
          <Route path="/:id" element={<OrderProblemForm />} />
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
      {currentLocation === 'order' ? (
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              variant="fullWidth"
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="기본 지시" {...a11yProps(0)} />
              <Tab label="시간적 지시" {...a11yProps(1)} />
              <Tab label="양적 지시" {...a11yProps(2)} />
              <Tab label="위치적 지시" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <OrderProblemPanel value={value} index={0}>
            <OrderProblemListPage type="basic" />
          </OrderProblemPanel>
          <OrderProblemPanel value={value} index={1}>
            <OrderProblemListPage type="time" />
          </OrderProblemPanel>
          <OrderProblemPanel value={value} index={2}>
            <OrderProblemListPage type="quantity" />
          </OrderProblemPanel>
          <OrderProblemPanel value={value} index={3}>
            <OrderProblemListPage type="location" />
          </OrderProblemPanel>
        </>
      ) : null}
    </Box>
  );
};

export default OrderProblemPage;
