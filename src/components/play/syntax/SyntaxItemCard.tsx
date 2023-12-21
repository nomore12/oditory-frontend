import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProblemManagerStore } from '../../../store/ProblemManager';

interface PropsType {
  itemId: number;
  src: string;
  isCorrect: boolean;
}

const ContainerStyle = styled.div<{
  checked: boolean;
  visible: boolean;
  correct: boolean;
}>`
  width: 420px;
  height: 260px;
  padding: 30px;
  display: flex;
  flex-direction: column;

  background-color: #ffffff;
  border-radius: 30px;
  border: ${(props) => (props.checked ? '3px solid #FF0000' : 'none')};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  position: relative;

  @media screen and (max-width: 1159px) {
    width: 340px;
    height: 220px;
  }

  .img-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
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

const SyntaxItemCard: React.FC<PropsType> = ({ itemId, src, isCorrect }) => {
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
      setAnswers(itemId);
      setChecked(!checked);
      return;
    }
    if (currState === 'solving' && checked) {
      setChecked(!checked);
      if (answers.find((answer) => answer === itemId)) {
        console.log('remove', itemId);
        removeAnswer(itemId);
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
      correct={isCorrect}
      checked={!answers ? false : checked}
      visible={
        currentProblemIndex === 0 && currState === 'waiting' ? false : true
      }
      onClick={onClick}
    >
      <div className="img-wrapper">
        {currState === 'solving' ||
        currState === 'checkAnswer' ||
        currState === 'end' ? (
          <>
            <img src={src} alt="syntax-01" />
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
    </ContainerStyle>
  );
};

export default SyntaxItemCard;
