import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const useOrderProblemAdminStore = create(
  devtools(
    persist(
      (set) => ({
        currentType: 'basic',
        level: 0,
        problemNumber: 0,
        problemId: null,
        setCurrentType: (type: 'basic' | 'time' | 'quantity' | 'location') =>
          set({ currentType: type }),
        setCurrentLevel: (level: number) => set({ level: level }),
        setCurrentProblemNumber: (number: number) =>
          set({ problemNumber: number }),
        setCurrentProblemId: (id: number) => set({ problemId: id }),
      }),
      {
        name: 'order-problem-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
