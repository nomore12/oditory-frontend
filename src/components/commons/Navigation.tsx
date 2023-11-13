import React, { useState } from 'react';
import styled from 'styled-components';
import useAuthStore from '../../store/AuthStore';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Popover, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ContainerStyle = styled.div`
  width: 100vw;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .logo-wrapper {
    width: 92px;
    height: 24px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Navigation: React.FC = () => {
  const { user, clearAuth } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const onUserProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <ContainerStyle>
      <div className="logo-wrapper">
        <img src="/images/logo.png" alt="logo" />
      </div>

      <div>
        <Link to="/admin">관리자 페이지 바로가기</Link>
      </div>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1">
            {user ? user?.user.username : ''}
          </Typography>
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
            <Button
              onClick={() => {
                clearAuth();
                navigate('/');
              }}
            >
              로그아웃
            </Button>
          </Box>
        </Popover>
      </div>
    </ContainerStyle>
  );
};

export default Navigation;
