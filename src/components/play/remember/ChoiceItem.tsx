import React from 'react';
import styled from 'styled-components';

interface PropsType {
  src: string;
  itemId: number;
}

const ContainerStyle = styled.div`
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .item-image-wrapper {
    width: 130px;
    height: 130px;

    & img {
      width: 100%;
      height: 100%;
    }
  }
`;

const ChoiceItem: React.FC<PropsType> = ({ src, itemId }) => {
  return (
    <ContainerStyle>
      <div className="item-image-wrapper">
        <img src={src} alt={src} />
      </div>
    </ContainerStyle>
  );
};

export default ChoiceItem;
