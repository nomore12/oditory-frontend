import React from 'react';
import { Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';

interface PropsType {
  to: string;
  text: string;
}

const BigButtonStyle = styled(Box)({
  width: 200,
  height: 200,
  border: '1px solid black',
  borderRadius: 10,
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
    <BigButtonStyle>
      <LinkStyle to={to}>{text}</LinkStyle>
    </BigButtonStyle>
  );
};

export default BigButton;
