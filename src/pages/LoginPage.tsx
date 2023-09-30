import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainImage from '../components/auth/MainImage';
import TextField from '../components/commons/TextField';

const ContainerStyle = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  .login-image__section {
    width: 50%;
  }

  .login-form__section {
    width: 50%;
    padding: 100px;
    display: flex;
    flex-direction: column;
  }
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <ContainerStyle>
      <div className="login-image__section">
        <MainImage />
      </div>
      <div className="login-form__section">
        <TextField label="아이디" />
        <TextField type="password" label="패스워드" />
      </div>
    </ContainerStyle>
  );
};

export default LoginPage;
