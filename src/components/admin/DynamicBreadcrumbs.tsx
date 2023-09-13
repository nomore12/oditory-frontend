import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs, Link, Typography } from '@mui/material';

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathname.map((value, index) => {
        const last = index === pathname.length - 1;
        const to = `/${pathname.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="text.primary" key={to}>
            {value}
          </Typography>
        ) : (
          <Link underline="hover" color="inherit" href={to} key={to}>
            {value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default DynamicBreadcrumbs;
