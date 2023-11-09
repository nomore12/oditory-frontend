import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuthStore from '../../store/AuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../assets/images/icons/icn-back.svg';
import { ReactComponent as FailIcon } from '../../assets/images/icons/icn-fail.svg';
import { ReactComponent as SuccessIcon } from '../../assets/images/icons/icn-sucess.svg';
import { useMemoryProblemStore } from '../../store/MemoryStore';

const ContainerStyle = styled.div`
  width: 100vw;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  z-index: 1000;

  .back-wrapper {
    display: flex;
    gap: 12px;
    align-items: center;

    & > h2 {
      font-size: 24px;
      font-weight: 600;
    }
  }

  .current-status-wrapper {
    display: flex;
    gap: 8px;

    .icn-wrapper {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .icn-success {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #b8d9ea;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icn-fail {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #facccc;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .solving {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
  }

  .icn-none {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
  }
`;

const ProblemNavigation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isProblemPage, setIsProblemPage] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { memoryProblemStateData } = useMemoryProblemStore();

  useEffect(() => {
    if (location.pathname.includes('play-remember')) {
      setTitle('기억력 향상');
      const splits = location.pathname.split('/');
      const level = splits[splits.length - 1];
      if (Number(level)) {
        setIsProblemPage(true);
      } else {
        setIsProblemPage(false);
      }
    }
  }, [location.pathname]);

  return (
    <ContainerStyle>
      <div className="back-wrapper">
        <BackIcon width="36px" height="36px" onClick={() => navigate(-1)} />
        <h2>{title}</h2>
      </div>

      <div className="current-status-wrapper">
        {isProblemPage &&
          memoryProblemStateData?.map((item, index) => (
            <div key={index} className="icn-wrapper">
              {item.status === 'correct' ? (
                <div className="icn-success">
                  <SuccessIcon width="12px" height="12px" />
                </div>
              ) : item.status === 'wrong' ? (
                <div className="icn-fail">
                  <FailIcon width="12px" height="12px" />
                </div>
              ) : item.status === 'solving' ? (
                <div className="solving"></div>
              ) : (
                <div className="icn-none"></div>
              )}
            </div>
          ))}
      </div>
    </ContainerStyle>
  );
};

export default ProblemNavigation;
