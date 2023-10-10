import React, { useCallback, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Link,
  Popover,
  Typography,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PageContainer from '../components/admin/PageContainer';
import { Route, Routes } from 'react-router-dom';
import ProblemManagePage from '../components/admin/pages/problem/ProblemManagePage';
import ItemManagePage from '../components/admin/pages/ItemManagePage';
import MemberManagePage from '../components/admin/pages/MemberManagePage';
import DynamicBreadcrumbs from '../components/admin/DynamicBreadcrumbs';

const AdminPage: React.FC = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const onUserProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('popover open', popoverOpen);
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            border: '1px solid black',
            width: '100%',
            height: 60,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <DynamicBreadcrumbs />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1">user</Typography>
              <IconButton aria-label="user-menu" onClick={onUserProfileClick}>
                <ArrowDropDownIcon />
              </IconButton>
            </Box>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button>마이 페이지</Button>
                <Button>로그아웃</Button>
              </Box>
            </Popover>
          </Box>
        </Box>
        <Box
          sx={{
            border: '1px solid black',
            width: '100%',
            height: 'calc(100vh - 60px)',
          }}
        >
          <PageContainer>
            <Routes>
              <Route path="problem/*" element={<ProblemManagePage />} />
              <Route path="item/*" element={<ItemManagePage />} />
              <Route path="members/*" element={<MemberManagePage />} />
            </Routes>
          </PageContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminPage;
