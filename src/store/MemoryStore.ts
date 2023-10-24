import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AddItemState {
  clickedItemId: number[] | null;
  setClickedItemId: (id: number) => void;
}

export const useAddItemStore = create(
  devtools((set) => ({
    clickedItemId: null,
    setClickedItemId: (id: number) => set({ clickedItemId: id }),
  }))
);
