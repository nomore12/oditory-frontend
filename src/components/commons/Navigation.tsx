import React from 'react';
import styled from 'styled-components';
import useAuthStore from '../../store/AuthStore';
import { useLocation } from 'react-router-dom';

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
  const { user } = useAuthStore();
  const location = useLocation();

  return (
    <ContainerStyle>
      <div className="logo-wrapper">
        <img src="/images/logo.png" alt="logo" />
      </div>

      <div>
        <div>{user?.user.username}</div>
      </div>
    </ContainerStyle>
  );
};

export default Navigation;
