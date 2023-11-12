import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMemoryProblemStore } from '../../../store/MemoryStore';
import { arraysMatch } from '../../../utils/utils';

interface PropsType {
  src: string;
  itemId: number;
}

interface ContainerStyleProps {
  checked: boolean;
}

const ContainerStyle = styled.div<ContainerStyleProps>`
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  // border: ${(props) => (props.checked ? '10px solid #F81D1D' : 'none')};

  .item-image-wrapper {
    width: 130px;
    height: 130px;

    & img {
      width: 100%;
      height: 100%;

      opacity: ${(props) => (props.checked ? '0.5' : '1')};
    }
  }

  .item-numbering {
    position: absolute;
    top: calc(50% - 45px);
    right: calc(50% - 25px);
    font-size: 90px;
    font-weight: 700;
  }

  .correct-numbering {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 30px;
    left: 30px;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    background-color: #0068b7;
    border-radius: 50%;
  }

  .user-checked {
    position: absolute;
    top: calc(50% + 45px);
    right: calc(50% + 25px);
    font-size: 16px;
    font-weight: 700;
    color: #f81d1d;
    border: 1px solid black;
  }
`;

const ChoiceItem: React.FC<PropsType> = ({ src, itemId }) => {
  const [checked, setChecked] = useState(false);
  const [numbering, setNumbering] = useState(0);
  const [correctNumber, setCorrectNumber] = useState(0);

  const {
    currentProblemNumber,
    wrongCheck,
    correctAnswers,
    userCheckedAnswers,
    memoryProblemStateData,
    setUserCheckedAnswers,
  } = useMemoryProblemStore();

  const onClick = () => {
    if (userCheckedAnswers.includes(itemId)) {
      setChecked(false);
      setUserCheckedAnswers(itemId, true);
    } else {
      setChecked(true);
      setUserCheckedAnswers(itemId);
      const num2 = userCheckedAnswers.findIndex((item) => item === itemId) + 1;
      setNumbering(0);
    }
  };

  useEffect(() => {
    setChecked(false);
    const num1 = correctAnswers.findIndex((item) => item === itemId) + 1;
    console.log(num1);
    setCorrectNumber(num1);
  }, [currentProblemNumber, correctNumber, correctAnswers, wrongCheck]);

  useEffect(() => {
    console.log(correctAnswers);
    const num = userCheckedAnswers.findIndex((item) => item === itemId) + 1;
    setNumbering(num);
  }, [checked, userCheckedAnswers.length, wrongCheck]);

  return (
    <ContainerStyle onClick={onClick} checked={checked}>
      <div className="item-image-wrapper">
        <img src={src} alt={src} />
      </div>
      <div className="item-numbering">{numbering !== 0 && numbering}</div>
      {wrongCheck && (
        <>
          {wrongCheck && correctNumber !== 0 && (
            <div className="correct-numbering">{correctNumber}</div>
          )}

          {/*<div className="user-checked">{numbering !== 0 && numbering}</div>*/}
        </>
      )}
    </ContainerStyle>
  );
};

export default ChoiceItem;
