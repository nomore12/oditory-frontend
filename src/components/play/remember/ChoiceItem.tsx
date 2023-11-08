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
`;

const ChoiceItem: React.FC<PropsType> = ({ src, itemId }) => {
  const [checked, setChecked] = useState(false);
  const [numbering, setNumbering] = useState(0);

  const {
    currentProblemNumber,
    correctAnswers,
    userCheckedAnswers,
    setUserCheckedAnswers,
  } = useMemoryProblemStore();

  const onClick = () => {
    if (userCheckedAnswers.includes(itemId)) {
      setChecked(false);
      setUserCheckedAnswers(itemId, true);
    } else {
      setChecked(true);
      setUserCheckedAnswers(itemId);
      setNumbering(0);
    }
  };

  useEffect(() => {
    setChecked(false);
  }, [currentProblemNumber]);

  useEffect(() => {
    const num = userCheckedAnswers.findIndex((item) => item === itemId);
    setNumbering(num + 1);
  }, [checked, userCheckedAnswers.length]);

  return (
    <ContainerStyle onClick={onClick} checked={checked}>
      <div className="item-image-wrapper">
        <img src={src} alt={src} />
      </div>
      <div className="item-numbering">{numbering !== 0 && numbering}</div>
    </ContainerStyle>
  );
};

export default ChoiceItem;
