import React from 'react';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
  }
`;

const MainImage: React.FC = () => {
  return (
    <ContainerStyle>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#d2cdc1',
          padding: '100px',
        }}
      >
        image
      </div>
    </ContainerStyle>
  );
};

export default MainImage;
