import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Star } from '../../assets/images/icons/icn-star.svg';
import { useNavigate } from 'react-router-dom';

interface PropsType {
  starNumber: number;
  url: string;
  color?: string;
}

const ContainerStyle = styled.div<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => (props.color ? props.color : '#f5d319')};
  width: 64px;
  height: 64px;
  position: relative;

  .star-icon-number {
    position: absolute;
    top: calc(50% - 10px);
    left: calc(50% - 12px);
    width: 24px;
    height: 24px;
    color: ${(props) => (props.color ? props.color : '#f5d319')};
    font-size: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StarNumberIcon: React.FC<PropsType> = ({ starNumber, url, color }) => {
  const navigate = useNavigate();

  const onIconClick = () => {
    navigate(url);
  };

  return (
    <ContainerStyle onClick={onIconClick} color={color}>
      <Star width="44px" height="44px" fill="#fff" />
      <div className="star-icon-number">{starNumber}</div>
    </ContainerStyle>
  );
};

export default StarNumberIcon;
