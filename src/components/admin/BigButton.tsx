import React from 'react';
import { Box, styled, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

interface PropsType {
  to: string;
  text: string;
}

const BigButtonStyle = styled(Paper)({
  width: 200,
  height: 200,
  // border: '1px solid #c5c5c5',
  borderRadius: 10,
  a: {
    textDecoration: 'none',
    color: '#757575',
  },
});

const LinkStyle = styled(Link)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2rem',
});

const BigButton: React.FC<PropsType> = ({ to, text }) => {
  return (
    <BigButtonStyle elevation={6}>
      <LinkStyle to={to}>{text}</LinkStyle>
    </BigButtonStyle>
  );
};

export default BigButton;
