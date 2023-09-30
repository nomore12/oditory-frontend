import React from 'react';
import styled from 'styled-components';

interface PropsType {
  type?: string;
  label: string;
  placeholder?: string;
}

const ContainerStyle = styled.input`
  width: 100%;
  height: 57px;
  border-radius: 10px;
  background-color: rgb(245, 245, 243);
  border: none;
  font-size: 19px;
  padding: 16px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const TextField: React.FC<PropsType> = ({
  type = 'text',
  label,
  placeholder,
}) => {
  return (
    <>
      <div>{label}</div>
      <ContainerStyle type={type} placeholder={placeholder && placeholder} />
    </>
  );
};

export default TextField;
