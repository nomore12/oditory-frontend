import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMemoryProblemStore } from '../../../store/MemoryStore';

interface PropsType {
  level: number;
  correctCount: number;
  overlayHandler: () => void;
}

const ContainerStyle = styled.div`
  width: 420px;
  height: 320px;
  background-color: #fff;
  border-radius: 30px;
  position: relative;
  transform-origin: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  .panel-title {
    font-size: 46px;
    font-weight: 600;
  }

  .panel-subtitle {
    font-size: 16px;
    color: #999999;
  }

  .panel-score {
    font-size: 60px;
    color: rgba(0, 0, 0, 0.1);

    &:first-child {
      color: #fa6540;
    }
  }
`;

const ClearPanel: React.FC<PropsType> = ({
  level,
  correctCount,
  overlayHandler,
}) => {
  const navigate = useNavigate();
  const { clearMemoryProblemStore } = useMemoryProblemStore();

  const onConfirm = () => {
    clearMemoryProblemStore();
    overlayHandler();
    navigate('/play-remember');
  };

  const onRetry = () => {
    clearMemoryProblemStore();
    overlayHandler();
  };

  return (
    <ContainerStyle>
      <div className="panel-title">{level} 레벨 성공!</div>
      <div className="panel-subtitle">
        멋져요. 총 {correctCount}개 문제를 맞췄어요.
      </div>
      <div className="panel-score">
        <span>{correctCount * 10}</span>
        <span>/</span>
        <span>100</span>
      </div>
      <div>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onRetry}>다시풀기</button>
      </div>
    </ContainerStyle>
  );
};

export default ClearPanel;
