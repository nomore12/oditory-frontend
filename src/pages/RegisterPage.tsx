import React, { useState } from 'react';
import styled from 'styled-components';
import RegisterForm from '../components/auth/RegisterForm';
import MainImage from '../components/auth/MainImage';

const ContainerStyle = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  .left-side {
    width: 50%;
  }

  .right-side {
    width: 50%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const RegisterPage: React.FC = () => {
  return (
    <ContainerStyle>
      <div className="left-side">
        <MainImage />
      </div>
      <div className="right-side">
        <RegisterForm />
      </div>
    </ContainerStyle>
  );
};

export default RegisterPage;
