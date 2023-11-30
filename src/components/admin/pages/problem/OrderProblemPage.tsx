import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, Divider, Button } from '@mui/material';
import OrderProblemPanel from './OrderProblemPanel';
import OrderProblemListPage from './OrderProblemListPage';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import MemoryProblemCreateForm from '../../problem/MemoryProblemCreateForm';
import MemoryProblemForm from '../../problem/MemoryProblemForm';
import OrderProblemForm from '../../problem/OrderProblemForm';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const OrderProblemPage: React.FC = () => {
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
        지시 따르기
      </Typography>
      <Divider />
      <Routes>
        <Route path="/create" element={<OrderProblemForm />} />
        <Route
          path={'255'}
          element={
            <MemoryProblemForm
              currentLevel={Number(1)}
              currentProblemId={Number(255)}
            />
          }
        />
      </Routes>
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
