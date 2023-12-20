import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface ProblemManagerState {
  currentProblemIndex: number;
  currState: 'waiting' | 'solving' | 'playing' | 'checkAnswer';
  answers: number[];
  setAnswers: (answer: number) => void;
  clearAnswers: () => void;
  toNextProblem: () => void;
  playProblemSound: (audio: any) => void;
}

const useOrderProblemAdminStore = create(
  devtools(
    persist(
      (set) => ({
        currentProblemIndex: 0,
        currState: 'waiting',
        answers: [],
        setAnswers: (answer: number) =>
          set((state: any) => ({
            answers: [...state.answers, answer],
          })),
        clearAnswers: () =>
          set((state: any) => ({
            answers: [],
          })),
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
    answers: state.answers,
    setAnswers: state.setAnswers,
    clearAnswers: state.clearAnswers,
    toNextProblem: state.toNextProblem,
    playProblemSound: state.playProblemSound,
  };
};
