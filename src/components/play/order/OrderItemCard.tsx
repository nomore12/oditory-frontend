import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useProblemManagerStore } from '../../../store/ProblemManager';

interface PropsType {
  size: 'small' | 'medium' | 'large';
  url: string;
  imageId: number;
}

const ContainerStyle = styled.div<{ size: string; checked: boolean }>`
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

  .image-wrapper {
    width: 50%;
    height: 50%;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 40px;
    }
  }
`;

const OrderItemCard: React.FC<PropsType> = ({ size, url, imageId }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const { answers, setAnswers } = useProblemManagerStore();

  const onClick = () => {
    if (!checked) {
      if (answers.find((answer) => answer === imageId)) return;
      setAnswers(imageId);
    }
    setChecked(!checked);
  };

  useEffect(() => {
    if (answers.length === 0) setChecked(false);
  }, [answers]);

  return (
    <ContainerStyle
      size={size}
      checked={answers.length === 0 ? false : checked}
      onClick={onClick}
    >
      <div className="image-wrapper">
        <img src={url} alt="food" />
      </div>
    </ContainerStyle>
  );
};

export default OrderItemCard;
