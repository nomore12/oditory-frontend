import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type AuthStore = {
  token: string | null;
  setToken: (newToken: string) => void;
  clearToken: () => void;
};

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        token: null,
        setToken: (newToken: string) => set({ token: newToken }),
        clearToken: () => set({ token: null }),
      }),
      {
        name: 'auth-storage',
        getStorage: () => localStorage,
      }
    )
  )
) as unknown as AuthStore;

export default useAuthStore;
// 사용 예:
// useAuthStore.getState().setToken('YOUR_NEW_TOKEN');
