import React from 'react';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  width: 100%;
  height: 100vh;
  padding: 60px 0 0 0;
  display: flex;
  flex-direction: column;
  background-image: url('/images/bg-02-02@2x.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const OrderProblemPage: React.FC = () => {
  return (
    <ContainerStyle>
      <div className="problem-block-wrapper">
        <h2>기본 지시 따르기</h2>
      </div>
    </ContainerStyle>
  );
};

export default OrderProblemPage;
