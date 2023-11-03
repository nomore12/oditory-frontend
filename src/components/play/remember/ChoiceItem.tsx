import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMemoryProblemStore } from '../../../store/MemoryStore';

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
  border: ${(props) => (props.checked ? '10px solid #F81D1D' : 'none')};

  .item-image-wrapper {
    width: 130px;
    height: 130px;

    & img {
      width: 100%;
      height: 100%;
    }
  }
`;

const ChoiceItem: React.FC<PropsType> = ({ src, itemId }) => {
  const [checked, setChecked] = useState(false);
  const { userCheckedAnswers, setUserCheckedAnswers } = useMemoryProblemStore();

  const onClick = () => {
    if (userCheckedAnswers.includes(itemId)) {
      setChecked(false);
      setUserCheckedAnswers(itemId, true);
    } else {
      setChecked(true);
      setUserCheckedAnswers(itemId);
    }
  };

  useEffect(() => {
    console.log('checked', checked);
  }, [checked]);

  return (
    <ContainerStyle onClick={onClick} checked={checked}>
      <div className="item-image-wrapper">
        <img src={src} alt={src} />
      </div>
    </ContainerStyle>
  );
};

export default ChoiceItem;
