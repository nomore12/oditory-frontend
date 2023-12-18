import React from 'react';
import styled from 'styled-components';

const ContainerStyle = styled.div`
  width: 420px;
  height: 260px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 30px;

  @media screen and (max-width: 1159px) {
    width: 340px;
    height: 220px;
  }

  .img-wrapper {
    width: 100%;
    height: 100%;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const SyntaxItemCard: React.FC = () => {
  return (
    <ContainerStyle>
      <div className="img-wrapper">
        <img src="/images/syntax-sample.png" alt="syntax-01" />
      </div>
    </ContainerStyle>
  );
};

export default SyntaxItemCard;
