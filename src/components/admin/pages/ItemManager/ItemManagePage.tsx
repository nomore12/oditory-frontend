import React, { useEffect, useState } from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ItemListItem from './ItemListItem';
import AddItemForm from './AddItemForm';
import ItemCategorySelector from './ItemCategorySelector';
import { fetcher } from '../../../../utils/fetcher';
import useSWR from 'swr';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns:
    'repeat(5, 200px)' /* 아이템의 크기를 조절하려면 200px 값을 변경하십시오 */,
  justifyContent: 'space-between',
  gap: 16 /* 아이템 간의 간격 */,
  border: '1px solid black',
  width: '100%',
  height: 640,
  overflowY: 'auto',
  padding: 16,
}));

const ItemManagePage: React.FC = () => {
  const [addItem, setAddItem] = useState(false);

  const { data, error, isLoading } = useSWR('item/images/', (url) =>
    fetcher({ url })
  );

  useEffect(() => {
    console.log(data);
    console.log(error);
  }, [isLoading]);

  const addItemHandler = () => {
    setAddItem(!addItem);
  };

  // const items = [
  //   <ItemListItem key={0} />,
  //   <ItemListItem key={1} />,
  //   <ItemListItem key={2} />,
  //   <ItemListItem key={3} />,
  //   <ItemListItem key={4} />,
  //   <ItemListItem key={5} />,
  //   <ItemListItem key={6} />,
  //   <ItemListItem key={7} />,
  //   <ItemListItem key={8} />,
  //   <ItemListItem key={9} />,
  //   <ItemListItem key={10} />,
  //   <ItemListItem key={11} />,
  //   <ItemListItem key={12} />,
  // ];

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
                item_name={item.item_name}
                image={item.image}
                syllable_count={item.syllable_count}
                category={item.category}
                created_at={item.created_at}
                key={item.id}
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
      {addItem && <AddItemForm openHandler={addItemHandler} />}
    </Box>
  );
};

export default ItemManagePage;
