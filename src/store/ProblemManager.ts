import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface ProblemManagerState {
  currentProblemIndex: number;
  currState: 'waiting' | 'solving' | 'playing' | 'checkAnswer';
  toNextProblem: () => void;
  playProblemSound: (audio: any) => void;
}

const useOrderProblemAdminStore = create(
  devtools(
    persist(
      (set) => ({
        currentProblemIndex: 0,
        currState: 'waiting',
        toNextProblem: () =>
          set((state: any) => ({
            currentProblemIndex: state.currentProblemIndex + 1,
          })),
        playProblemSound: (audio: any) => {
          audio.play();
        },
      }),
      {
        name: 'order-problem-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
) as unknown as () => ProblemManagerState;

export const useProblemManagerStore = (): ProblemManagerState => {
  const state = useOrderProblemAdminStore();
  return {
    currentProblemIndex: state.currentProblemIndex,
    currState: state.currState,
    toNextProblem: state.toNextProblem,
    playProblemSound: state.playProblemSound,
  };
};
