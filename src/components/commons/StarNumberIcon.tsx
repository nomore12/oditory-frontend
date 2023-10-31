import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Star } from '../../assets/images/icons/icn-star.svg';

interface PropsType {
  starNumber: number;
}

const ContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #f5d319;
  width: 64px;
  height: 64px;
  position: relative;

  .star-icon-number {
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 12px);
    width: 24px;
    height: 24px;
    color: #f5d319;
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StarNumberIcon: React.FC<PropsType> = ({ starNumber }) => {
  return (
    <ContainerStyle>
      <Star width="44px" height="44px" fill="#fff" />
      <div className="star-icon-number">{starNumber}</div>
    </ContainerStyle>
  );
};

export default StarNumberIcon;
