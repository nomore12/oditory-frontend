import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Typography, styled } from '@mui/material';

const StyledBreadcrumb = styled(Breadcrumbs)(({ theme }) => {
  const backgroundColor = theme.palette.mode === 'light' ? '#ebebeb' : '#222';
  const color = theme.palette.mode === 'light' ? '#222' : '#ebebeb';
  const hoverColor = theme.palette.mode === 'light' ? '#ebebeb' : '#222';

  return {
    borderRadius: 5,
    color: '#858585',
    padding: theme.spacing(0.5),
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor,
    },
    '& > a:last-child': {
      color,
      backgroundColor,
    },
  };
});

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname.split('/').filter((x) => x);

  return (
    <StyledBreadcrumb aria-label="breadcrumb">
      {pathname.map((value, index) => {
        const last = index === pathname.length - 1;
        const to = `/${pathname.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {value === 'admin' ? 'Home' : value}
          </Typography>
        ) : (
          <Link underline="hover" color="inherit" href={to} key={to}>
            {value === 'admin' ? 'Home' : value}
          </Link>
        );
      })}
    </StyledBreadcrumb>
  );
};

export default DynamicBreadcrumbs;
