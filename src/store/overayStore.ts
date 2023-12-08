import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface OverlayStore {
  isOverlayOpen: boolean;
  showOverlay: () => void;
  hideOverlay: () => void;
}

const useOveralyStore = create(
  devtools((set) => ({
    isOverlayOpen: false,
    showOverlay: () => set({ isOverlayOpen: true }),
    hideOverlay: () => set({ isOverlayOpen: false }),
  }))
) as unknown as () => OverlayStore;

export default useOveralyStore;
