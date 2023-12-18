import React from 'react';
import styled from 'styled-components';

interface PropsType {
  name: string;
  onClick: () => void;
  isRetry?: boolean;
}

const ContainerStyle = styled.button<{ retry?: boolean }>`
  width: 200px;
  height: 76px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props) => (props.retry ? 'white' : 'black')};
  border: ${(props) => (props.retry ? '2px solid black' : 'none')};
  color: ${(props) => (props.retry ? 'black' : 'white')};
  font-size: 26px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.retry ? '#eee' : '#333')};
  }

  &:active {
    background-color: ${(props) => (props.retry ? '#ddd' : '#666')};
  }
`;

const ControlButton: React.FC<PropsType> = ({ name, onClick, isRetry }) => {
  return (
    <ContainerStyle onClick={onClick} retry={isRetry && true}>
      <span>{name}</span>
    </ContainerStyle>
  );
};

export default ControlButton;
