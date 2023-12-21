import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface ProblemManagerState {
  currentProblemIndex: number;
  currState: 'waiting' | 'solving' | 'playing' | 'checkAnswer' | 'end';
  answers: number[];
  scores: number[];
  setCurrState: (
    state: 'waiting' | 'solving' | 'playing' | 'checkAnswer' | 'end'
  ) => void;
  checkAnswer: (answer: number[]) => boolean;
  setScores: (score: number) => void;
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
        scores: [],
        answers: [],
        setCurrState: (
          curr: 'waiting' | 'solving' | 'playing' | 'checkAnswer'
        ) =>
          set((state: any) => ({
            currState: curr,
          })),
        setScores: (score: number) =>
          set((state: any) => ({
            scores: [...state.scores, score],
          })),
        setAnswers: (answer: number) =>
          set((state: any) => ({
            answers: [...state.answers, answer],
          })),
        removeAnswer: (answer: number) =>
          set((state: any) => ({
            answers: [...state.answers.filter((a: number) => a !== answer)],
          })),
        checkAnswer: (answer: number[]) =>
          set((state: any) => {
            if (answer.length !== state.answers.length) return false;
            return answer.every(
              (value, index) => value === state.answers[index]
            );
          }),
        clearAnswers: () =>
          set((state: any) => ({
            answers: [],
          })),
        clearAll: () =>
          set((state: any) => ({
            answers: [],
            currentProblemIndex: 0,
            currState: 'waiting',
            scores: [],
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
    scores: state.scores,
    setScores: state.setScores,
    setAnswers: state.setAnswers,
    removeAnswer: state.removeAnswer,
    setCurrState: state.setCurrState,
    clearAnswers: state.clearAnswers,
    checkAnswer: state.checkAnswer,
    clearAll: state.clearAll,
    toNextProblem: state.toNextProblem,
    playProblemSound: state.playProblemSound,
  };
};
