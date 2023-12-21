import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProblemManagerStore } from '../../../store/ProblemManager';

interface PropsType {
  size: 'small' | 'medium' | 'large';
  url: string;
  imageId: number;
}

const ContainerStyle = styled.div<{
  size: string;
  checked: boolean;
  visible: boolean;
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
  }
`;

const OrderItemCard: React.FC<PropsType> = ({ size, url, imageId }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const { currState, currentProblemIndex, answers, setAnswers, removeAnswer } =
    useProblemManagerStore();

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
    if (answers.length === 0) setChecked(false);
  }, [answers]);

  useEffect(() => {
    if (currState === 'solving') {
      setChecked(false);
    }
  }, [currState]);

  return (
    <ContainerStyle
      size={size}
      checked={answers.length === 0 ? false : checked}
      onClick={onClick}
      visible={
        currentProblemIndex === 0 && currState === 'waiting' ? false : true
      }
    >
      <div className="image-wrapper">
        {currState === 'solving' ? (
          <>
            <img src={url} alt="food" />
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

export default OrderItemCard;
