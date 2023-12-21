import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProblemManagerStore } from '../../../store/ProblemManager';

interface PropsType {
  size: 'small' | 'medium' | 'large';
  url: string;
  imageId: number;
  isCorrect: boolean;
}

const ContainerStyle = styled.div<{
  size: string;
  checked: boolean;
  visible: boolean;
  correct: boolean;
}>`
  width: ${(props) =>
    props.size === 'small'
      ? '100px'
      : props.size === 'medium'
      ? '140px'
      : '180px'};
  height: ${(props) =>
    props.size === 'small'
      ? '100px'
      : props.size === 'medium'
      ? '140px'
      : '180px'};
  background-color: #ffffff;
  border: ${(props) => (props.checked ? '3px solid #FF0000' : 'none')};
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  position: relative;

  .image-wrapper {
    width: 50%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 40px;
    }

    & > h1 {
      font-size: 4rem;
      font-weight: 700;
      color: #000000;
    }

    & > h6 {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 0.8rem;
      background-color: ${(props) => (props.correct ? '#015bff' : '#FF0000')};
      border-radius: 50%;
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
`;

const OrderItemCard: React.FC<PropsType> = ({
  size,
  url,
  imageId,
  isCorrect,
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  const {
    currState,
    scores,
    currentProblemIndex,
    answers,
    setAnswers,
    removeAnswer,
  } = useProblemManagerStore();

  const onClick = () => {
    if (!checked && currState === 'solving') {
      // if (answers.find((answer) => answer === imageId)) {
      //   console.log('remove', imageId);
      //   removeAnswer(imageId);
      // }
      setAnswers(imageId);
      setChecked(!checked);
      return;
    }
    if (currState === 'solving' && checked) {
      setChecked(!checked);
      if (answers.find((answer) => answer === imageId)) {
        console.log('remove', imageId);
        removeAnswer(imageId);
      }
    }
  };

  useEffect(() => {
    console.log('isCorrect', isCorrect);
  }, [isCorrect]);

  useEffect(() => {
    if (!answers) setChecked(false);
  }, [answers]);

  useEffect(() => {
    if (currState === 'solving') {
      setChecked(false);
    }
  }, [currState]);

  return (
    <ContainerStyle
      size={size}
      checked={!answers ? false : checked}
      onClick={onClick}
      visible={
        currentProblemIndex === 0 && currState === 'waiting' ? false : true
      }
      correct={isCorrect}
    >
      {currState !== 'end' && (
        <div className="image-wrapper">
          {currState === 'solving' || currState === 'checkAnswer' ? (
            <>
              <img src={url} alt="food" />
              {currState === 'checkAnswer' && isCorrect && <h6>정답</h6>}
              {currState === 'checkAnswer' && checked && !isCorrect && (
                <h6>오답</h6>
              )}
            </>
          ) : (
            <>
              <h1>?</h1>
            </>
          )}
        </div>
      )}
    </ContainerStyle>
  );
};

export default OrderItemCard;
