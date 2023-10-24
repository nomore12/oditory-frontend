import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAddItemStore = create(
  devtools((set) => ({
    clickedItemId: null,
    answerId: null,
    setClickedItemId: (id: number) => set({ clickedItemId: id }),
    setAnswerId: (id: number) => set({ answerId: id }),
  }))
);
