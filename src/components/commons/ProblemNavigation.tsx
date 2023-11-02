import React from 'react';
import styled from 'styled-components';
import useAuthStore from '../../store/AuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/images/icons/icn-back.svg';

const ContainerStyle = styled.div`
  width: 100vw;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .back-wrapper {
    display: flex;
    gap: 12px;
    align-items: center;

    & > h2 {
      font-size: 24px;
      font-weight: 600;
    }
  }
`;

const ProblemNavigation: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <ContainerStyle>
      <div className="back-wrapper">
        <BackIcon width="36px" height="36px" onClick={() => navigate(-1)} />
        <h2>기억력 향상</h2>
      </div>

      <div>
        <div>{user?.user.username}</div>
      </div>
    </ContainerStyle>
  );
};

export default ProblemNavigation;
