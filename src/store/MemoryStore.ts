import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { MemoryProblemData } from '../type.d';

type MemoryProblemStateData = {
  problemNumber: number;
  status: 'correct' | 'wrong' | 'solving' | 'none';
};

type MemoryProblemStoreState = {
  currentProblemNumber: number;
  memoryProblemStateData: MemoryProblemStateData[];
  userCheckedAnswers: number[];
  setInitialMemoryProblemStateData: (data: MemoryProblemData[]) => void;
  setCurrentProblemIsCorrect: () => void;
  setCurrentProblemIsWrong: () => void;
  setUserCheckedAnswers: (id: number, remove?: boolean) => void;
  clearUserCheckedAnswers: () => void;
};

export const useAddItemStore = create(
  devtools((set) => ({
    clickedItemId: null,
    answerId: null,
    setClickedItemId: (id: number) => set({ clickedItemId: id }),
    setAnswerId: (id: number) => set({ answerId: id }),
  }))
);

const useMemoryProblemInternalStore = create(
  devtools(
    persist(
      (set) => ({
        currentProblemNumber: 0,
        memoryProblemStateData: [] as MemoryProblemStateData[],
        userCheckedAnswers: [] as number[],
        setInitialMemoryProblemStateData: (data: MemoryProblemData[]) => {
          const problemData = data.map(
            (item: MemoryProblemData, index: number) => ({
              problemNumber: index + 1,
              status: index === 0 ? 'solving' : 'none',
            })
          );
          return {
            memoryProblemStateData: problemData,
            currentProblemNumber: 1,
          };
        },
        setCurrentProblemIsCorrect: () =>
          set((state: MemoryProblemStoreState) => {
            state.memoryProblemStateData[state.currentProblemNumber].status =
              'correct';
            if (state.currentProblemNumber <= 10) {
              state.memoryProblemStateData[
                state.currentProblemNumber + 1
              ].status = 'solving';
            }
            return {
              currentProblemNumber:
                state.currentProblemNumber < 10
                  ? state.currentProblemNumber + 1
                  : 10,
              memoryProblemStateData: state.memoryProblemStateData,
            };
          }),
        setCurrentProblemIsWrong: () =>
          set((state: MemoryProblemStoreState) => {
            state.memoryProblemStateData[state.currentProblemNumber].status =
              'wrong';
            if (state.currentProblemNumber <= 10) {
              state.memoryProblemStateData[
                state.currentProblemNumber + 1
              ].status = 'solving';
            }
            return {
              currentProblemNumber:
                state.currentProblemNumber < 10
                  ? state.currentProblemNumber + 1
                  : 10,
              memoryProblemStateData: state.memoryProblemStateData,
            };
          }),
        setUserCheckedAnswers: (id: number, remove = false) =>
          set((state: MemoryProblemStoreState) => ({
            userCheckedAnswers: remove
              ? [...state.userCheckedAnswers.filter((item) => item !== id)]
              : [...state.userCheckedAnswers, id],
          })),
        clearUserCheckedAnswers: () =>
          set((state: MemoryProblemStoreState) => ({
            userCheckedAnswers: [],
          })),
      }),
      {
        name: 'memory-problem-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
) as unknown as () => MemoryProblemStoreState;

export const useMemoryProblemStore = (): MemoryProblemStoreState => {
  const state = useMemoryProblemInternalStore();
  return {
    currentProblemNumber: state.currentProblemNumber,
    memoryProblemStateData: state.memoryProblemStateData,
    userCheckedAnswers: state.userCheckedAnswers,
    setInitialMemoryProblemStateData: state.setInitialMemoryProblemStateData,
    setCurrentProblemIsCorrect: state.setCurrentProblemIsCorrect,
    setCurrentProblemIsWrong: state.setCurrentProblemIsWrong,
    setUserCheckedAnswers: state.setUserCheckedAnswers,
    clearUserCheckedAnswers: state.clearUserCheckedAnswers,
  };
};
