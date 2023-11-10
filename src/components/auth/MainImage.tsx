import React from 'react';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f2f2ec;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  .bg-image {
    object-fit: cover;
    width: 50vw;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .logo-image {
    object-fit: cover;
    width: 320px;
    height: 80px;
    z-index: 1;
    position: absolute;
    top: 150px;
    left: calc(50% - 160px);
  }

  .under {
    background-color: #d9d9ce;
    width: 100%;
    height: 30%;
  }

  .title-text {
    font-size: 16px;
    margin-bottom: 360px;
    z-index: 1;
  }
`;

const MainImage: React.FC = () => {
  return (
    <ContainerStyle>
      <img className="bg-image" src="/images/main_bg@2x.png" alt="main" />
      <img className="logo-image" src="/images/logo@2x.png" alt="logo" />
      <div className="title-text">오디토리에 오신 것을 환영합니다.</div>
      <div className="under"></div>
    </ContainerStyle>
  );
};

export default MainImage;
