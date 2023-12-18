import React from 'react';
import { Box, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styled from 'styled-components';

interface LinePropsType {
  name: number;
}

const ContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  padding: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  background-image: url('/images/bg-02-01@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  .problem-block-wrapper {
    width: 100%;
    height: 100%;
    padding: 80px 120px;
    display: flex;
  }
`;

const PlayOrderPage: React.FC = () => {
  return (
    <ContainerStyle>
      <div className="problem-block-wrapper">
        <h2>기본 지시 따르기</h2>
      </div>
    </ContainerStyle>
  );
};

export default PlayOrderPage;
