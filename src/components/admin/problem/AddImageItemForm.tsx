import React, { useEffect } from 'react';
import { Box, Button, Grid, styled, Typography } from '@mui/material';
import { fetcher } from '../../../utils/fetcher';
import ItemButton from './ItemButton';
import useSWR from 'swr';

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, minmax(80px, 240px))',
  justifyContent: 'space-between',
  gap: 16,
  border: '1px solid black',
  width: 700,
  height: 460,
  overflowY: 'auto',
  padding: 4,
}));

const AddImageItemForm: React.FC = () => {
  const { data, isLoading, error } = useSWR('item/images/', (url) =>
    fetcher({ url })
  );

  useEffect(() => {
    console.log('data', data);
  }, [isLoading]);

  return (
    <Box sx={{ width: 720, height: 480, backgroundColor: '#fff' }}>
      <GridContainer>
        {data &&
          data?.map((item: any) => (
            <ItemButton
              key={item.pk}
              fontSize={40}
              name={item.item_name}
              category={item.category}
              syllableCount={item.syllable_count}
              image={item.image}
              isAdd={true}
            />
          ))}
      </GridContainer>
    </Box>
  );
};

export default AddImageItemForm;
