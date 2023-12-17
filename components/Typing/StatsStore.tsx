import { create } from 'zustand';

interface StatsStore {
  speeds: number[];
  accuracies: number[];
  addSpeed: (speed: number) => void;
  addAccuracy: (accuracy: number) => void;
}

const useStatsStore = create<StatsStore>((set) => ({
  speeds: [],
  accuracies: [],
  addSpeed: (speed) => set((state) => ({ speeds: [...state.speeds, speed] })),
  addAccuracy: (accuracy) => set((state) => ({ accuracies: [...state.accuracies, accuracy] })),
}));

export default useStatsStore;
