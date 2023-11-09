import React, { useEffect } from 'react';
import styled from 'styled-components';
import type { MemoryProblemData, AnswerItem } from '../../../type.d';
import ChoiceItem from './ChoiceItem';

interface PropsType {
  itemArray: AnswerItem[];
}

const ContainerStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 100px;
`;

const ChoicesBoard: React.FC<PropsType> = ({ itemArray }) => {
  const choicesArray = itemArray
    ? itemArray.map((item: AnswerItem) => {
        return (
          <div key={item.pk}>
            <ChoiceItem src={item.image} itemId={item.pk} />
          </div>
        );
      })
    : [];

  // useEffect(() => {
  //   console.log('itemArray', itemArray);
  // }, [itemArray]);

  return <ContainerStyle>{choicesArray && choicesArray}</ContainerStyle>;
};

export default ChoicesBoard;
