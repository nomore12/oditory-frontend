import React from 'react';
import { Box, Typography } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import styled from 'styled-components';
import ProblemNavigation from '../components/commons/ProblemNavigation';

interface LinePropsType {
  name: number;
}

const ContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  padding: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  background-image: url('/images/bg-03-01@2x.png');
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

const SyntaxProblemPage: React.FC = () => {
  return (
    <ContainerStyle>
      <ProblemNavigation />
      <div className="problem-block-wrapper">
        <h2>기본 구문이해</h2>
      </div>
    </ContainerStyle>
  );
};

export default SyntaxProblemPage;
