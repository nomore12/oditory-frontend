import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface ProblemManagerState {
  currentProblemIndex: number;
  currState: 'waiting' | 'solving' | 'playing' | 'checkAnswer';
  toNextProblem: () => void;
  playProblemSound: () => void;
}
