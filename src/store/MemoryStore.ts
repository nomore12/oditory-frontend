import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { MemoryProblemData } from '../type.d';

export type MemoryProblemStateData = {
  problemNumber: number;
  status: 'correct' | 'wrong' | 'solving' | 'none';
};

type MemoryProblemStoreState = {
  currentProblemNumber: number;
  memoryProblemStateData: MemoryProblemStateData[];
  userCheckedAnswers: number[];
  correctAnswers: number[];
  setCorrectAnswers: (answers: number[]) => void;
  setInitialMemoryProblemStateData: (data: MemoryProblemData[]) => void;
  setCurrentProblemIsCorrect: () => void;
  setCurrentProblemIsWrong: () => void;
  setUserCheckedAnswers: (id: number, remove?: boolean) => void;
  clearUserCheckedAnswers: () => void;
  clearMemoryProblemStore: () => void;
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
        memoryProblemStateData: [
          { problemNumber: 0, status: 'none' },
        ] as MemoryProblemStateData[],
        userCheckedAnswers: [] as number[],
        correctAnswers: [] as number[],
        setCorrectAnswers: (answers: number[]) =>
          set({ correctAnswers: answers }),
        setInitialMemoryProblemStateData: (data: MemoryProblemData[]) =>
          set((state: MemoryProblemStoreState) => {
            const problemData = data.map(
              (item: MemoryProblemData, index: number) => ({
                problemNumber: index,
                status: index === 0 ? 'solving' : 'none',
              })
            );
            return {
              memoryProblemStateData: [...problemData],
              currentProblemNumber: 0,
            };
          }),
        setCurrentProblemIsCorrect: () =>
          set((state: MemoryProblemStoreState) => {
            if (
              state.currentProblemNumber === state.memoryProblemStateData.length
            ) {
              console.log('equal');

              return {
                currentProblemNumber: 10,
                memoryProblemStateData: state.memoryProblemStateData,
              };
            }
            if (
              state.currentProblemNumber >= 0 &&
              state.currentProblemNumber <
                state.memoryProblemStateData.length &&
              state.memoryProblemStateData[state.currentProblemNumber]
                .status !== undefined
            ) {
              state.memoryProblemStateData[state.currentProblemNumber].status =
                'correct';
            }
            if (state.currentProblemNumber < 9) {
              state.memoryProblemStateData[
                state.currentProblemNumber + 1
              ].status = 'solving';
            }
            return {
              currentProblemNumber:
                state.currentProblemNumber < 9
                  ? state.currentProblemNumber + 1
                  : -1,
              memoryProblemStateData: state.memoryProblemStateData,
            };
          }),
        setCurrentProblemIsWrong: () =>
          set((state: MemoryProblemStoreState) => {
            console.log(
              state.currentProblemNumber,
              state.memoryProblemStateData
            );

            if (
              state.currentProblemNumber === state.memoryProblemStateData.length
            ) {
              console.log('equal');

              return {
                currentProblemNumber: 10,
                memoryProblemStateData: state.memoryProblemStateData,
              };
            }
            if (
              state.currentProblemNumber >= 0 &&
              state.currentProblemNumber <
                state.memoryProblemStateData.length &&
              state.memoryProblemStateData[state.currentProblemNumber]
                .status !== undefined
            ) {
              state.memoryProblemStateData[state.currentProblemNumber].status =
                'wrong';
            }

            if (state.currentProblemNumber < 9) {
              state.memoryProblemStateData[
                state.currentProblemNumber + 1
              ].status = 'solving';
            }
            return {
              currentProblemNumber:
                state.currentProblemNumber < 9
                  ? state.currentProblemNumber + 1
                  : -1,
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
        clearMemoryProblemStore: () =>
          set((state: MemoryProblemStoreState) => ({
            currentProblemNumber: 0,
            memoryProblemStateData: [
              { problemNumber: 0, status: 'none' },
            ] as MemoryProblemStateData[],
            userCheckedAnswers: [] as number[],
            correctAnswers: [] as number[],
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
    correctAnswers: state.correctAnswers,
    setCorrectAnswers: state.setCorrectAnswers,
    setInitialMemoryProblemStateData: state.setInitialMemoryProblemStateData,
    setCurrentProblemIsCorrect: state.setCurrentProblemIsCorrect,
    setCurrentProblemIsWrong: state.setCurrentProblemIsWrong,
    setUserCheckedAnswers: state.setUserCheckedAnswers,
    clearUserCheckedAnswers: state.clearUserCheckedAnswers,
    clearMemoryProblemStore: state.clearMemoryProblemStore,
  };
};
