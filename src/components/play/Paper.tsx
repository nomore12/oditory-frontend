import React from 'react';
import styled from 'styled-components';

interface PropsType {
  children: React.ReactNode;
  styleProps?: ContainerStyleProps;
}

interface ContainerStyleProps {
  width?: string;
  height?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
  gap?: string;
  margin?: string;
  padding?: string;
  borderRadius?: string;
}

const ContainerStyle = styled.div<ContainerStyleProps>`
  display: flex;
  width: ${(props) => (props.width ? props.width : '')};
  height: ${(props) => (props.height ? props.height : '')};
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : ''};
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : ''};
  align-items: ${(props) => (props.alignItems ? props.alignItems : '')};
  gap: ${(props) => (props.gap ? props.gap : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : '30px'};
  background-color: white;
`;

const Paper: React.FC<PropsType> = ({ children, styleProps }) => {
  return <ContainerStyle {...styleProps}>{children}</ContainerStyle>;
};

export default Paper;
