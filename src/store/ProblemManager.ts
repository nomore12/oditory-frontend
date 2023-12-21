import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface ProblemManagerState {
  currentProblemIndex: number;
  currState: 'waiting' | 'solving' | 'playing' | 'checkAnswer';
  answers: number[];
  setCurrState: (
    state: 'waiting' | 'solving' | 'playing' | 'checkAnswer'
  ) => void;
  removeAnswer: (answer: number) => void;
  setAnswers: (answer: number) => void;
  clearAnswers: () => void;
  clearAll: () => void;
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
        setCurrState: (
          curr: 'waiting' | 'solving' | 'playing' | 'checkAnswer'
        ) =>
          set((state: any) => ({
            currState: curr,
          })),
        setAnswers: (answer: number) =>
          set((state: any) => ({
            answers: [...state.answers, answer],
          })),
        removeAnswer: (answer: number) =>
          set((state: any) => ({
            answers: [...state.answers.filter((a: number) => a !== answer)],
          })),
        clearAnswers: () =>
          set((state: any) => ({
            answers: [],
          })),
        clearAll: () =>
          set((state: any) => ({
            answers: [],
            currentProblemIndex: 0,
            currState: 'waiting',
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
    removeAnswer: state.removeAnswer,
    setCurrState: state.setCurrState,
    clearAnswers: state.clearAnswers,
    clearAll: state.clearAll,
    toNextProblem: state.toNextProblem,
    playProblemSound: state.playProblemSound,
  };
};
