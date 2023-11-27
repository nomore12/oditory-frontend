import React, { useEffect, useState } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ItemListItem from './ItemListItem';
import AddItemForm from './AddItemForm';
import ItemCategorySelector from './ItemCategorySelector';
import { fetcher } from '../../../../utils/fetcher';
import useSWR, { mutate } from 'swr';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(80px, 240px))',
  justifyContent: 'space-between',
  gap: 16,
  border: '1px solid black',
  width: '100%',
  height: 640,
  overflowY: 'auto',
  padding: 16,
}));

const MemoryItemManagement: React.FC = () => {
  const [addItem, setAddItem] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const [currPk, setCurrPk] = useState<number>(0);

  const { data, error, isLoading } = useSWR('item/images/', (url) =>
    fetcher({ url })
  );

  const modifyItemHandler = (pk: number) => {
    setIsModify(true);
    setAddItem(true);
    setCurrPk(pk);
  };

  const addItemHandler = () => {
    setAddItem(!addItem);
  };

  const MAX_ITEMS_PER_ROW = 5; // 한 행에 배치할 아이템의 최대 수

  // 마지막 행의 아이템 수를 계산
  const lastRowItemCount = data ? data.length % MAX_ITEMS_PER_ROW : 0;

  // 빈 아이템들을 추가
  const emptyItems = Array(MAX_ITEMS_PER_ROW - lastRowItemCount)
    .fill(null)
    .map((_, idx) => <div key={`empty-${idx}`} className="empty-item"></div>);

  return (
    <Box>
      <Box sx={{ padding: '16px 0' }}>
        <Typography>아이템 관리</Typography>
      </Box>
      <ItemCategorySelector />
      <Box>
        <GridContainer>
          {!isLoading &&
            data?.map((item: any) => (
              <ItemListItem
                id={item.pk}
                item_name={item.item_name}
                image={item.image}
                syllable_count={item.syllable_count}
                category={item.category}
                created_at={item.created_at}
                key={item.id}
                modifyHandler={modifyItemHandler}
                mutateData={mutate}
              />
            ))}
          {emptyItems}
        </GridContainer>
      </Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={addItemHandler}>
          아이템 추가
        </Button>
      </Box>
      {addItem && (
        <AddItemForm
          title={isModify ? '수정하기' : '추가하기'}
          isModify={isModify}
          openHandler={addItemHandler}
          id={currPk}
        />
      )}
    </Box>
  );
};

export default MemoryItemManagement;
