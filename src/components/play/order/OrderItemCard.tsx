import React from 'react';
import styled from 'styled-components';

interface PropsType {
  size: 'small' | 'medium' | 'large';
  url: string;
}

const ContainerStyle = styled.div<{ size: string }>`
  width: ${(props) =>
    props.size === 'small'
      ? '100px'
      : props.size === 'medium'
      ? '140px'
      : '180px'};
  height: ${(props) =>
    props.size === 'small'
      ? '100px'
      : props.size === 'medium'
      ? '140px'
      : '180px'};
  background-color: #ffffff;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .image-wrapper {
    width: 50%;
    height: 50%;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 40px;
    }
  }
`;

const OrderItemCard: React.FC<PropsType> = ({ size, url }) => {
  return (
    <ContainerStyle size={size}>
      <div className="image-wrapper">
        <img src={url} alt="food" />
      </div>
    </ContainerStyle>
  );
};

export default OrderItemCard;
