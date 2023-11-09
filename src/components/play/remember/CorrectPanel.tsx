import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface PropsType {
  isCorrect: boolean;
  onClick: () => void;
}

const shakeAnimation = keyframes`
  0% {
    transform: translateX(0) rotateZ(0deg);
  }
  25% {
    transform: translateX(-10px) rotateZ(5deg);
  }
  50% {
    transform: translateX(10px) rotateZ(-5deg);
  }
  75% {
    transform: translateX(-10px) rotateZ(5deg);
  }
  100% {
    transform: translateX(0) rotateZ(0deg);
  }
`;

const ContainerStyle = styled.div`
  width: 340px;
  height: 280px;
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 30px;
  position: relative;
  animation: ${shakeAnimation} 0.2s ease-in-out;
  transform-origin: center center;

  .img-wrapper {
    width: 240px;
    height: 240px;
    position: absolute;
    bottom: calc(50% - 50px);
    left: calc(50% - 120px);
    display: flex;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .correct-text {
    height: 100%;
    padding-top: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34px;
    font-weight: 600;
  }

  .next-button {
    width: 280px;
    height: 76px;
    background-color: #000;
    color: #fff;
    font-size: 26px;
    border-radius: 20px;
    position: absolute;
    bottom: -100px;
    left: calc(50% - 140px);
  }
`;

const CorrectPanel: React.FC<PropsType> = ({ isCorrect, onClick }) => {
  return (
    <ContainerStyle>
      <div className="img-wrapper">
        <img src="/images/correctImg.png" alt="correct" />
      </div>
      <div className="correct-text">
        {isCorrect ? '정답이에요!' : '오답이에요!'}
      </div>
      <button className="next-button" onClick={onClick}>
        다음문제
      </button>
    </ContainerStyle>
  );
};

export default CorrectPanel;
