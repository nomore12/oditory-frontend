import React from 'react';
import styled from 'styled-components';
import useOveralyStore from '../../store/overayStore';

interface PropsType {
  children: React.ReactNode;
  blockBackground?: boolean;
}

const ContainerStyle = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const NewOverlay: React.FC<PropsType> = ({ children, blockBackground }) => {
  const { isOverlayOpen, hideOverlay } = useOveralyStore();

  if (!isOverlayOpen) return null;

  return (
    <ContainerStyle onClick={blockBackground ? undefined : hideOverlay}>
      {children}
    </ContainerStyle>
  );
};

export default NewOverlay;
