import create from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

type User = {
  id: number;
  last_login: string | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
  groups: any[]; // 필요한 경우 구체적인 타입으로 변경
  user_permissions: any[]; // 필요한 경우 구체적인 타입으로 변경
};

type Profile = {
  id: number;
  is_teacher: boolean;
  phone_number: string;
  user: number;
};

type TeacherInfo = any; // 필요한 경우 구체적인 타입으로 변경

type StudentInfo = {
  id: number;
  user: number;
};

type UserInfo = {
  user: User;
  profile: Profile;
  teacher_info: TeacherInfo | null;
  student_info: StudentInfo | null;
};

type AuthStore = {
  token: string | null;
  user: UserInfo | null;
  setAuth: (newToken: string, user: any) => void;
  clearAuth: () => void;
};

const a = {
  user: {
    id: 2,
    password:
      'pbkdf2_sha256$600000$MrYf9EOAaNSyhBqXevxV4U$6K6PEiNqRA9pGAi2A9Z1E36vwOvxg0WCvRrMKS/4ekQ=',
    last_login: null,
    is_superuser: false,
    username: '노성호',
    first_name: '',
    last_name: '',
    email: 'nightwing@naver.com',
    is_staff: true,
    is_active: true,
    date_joined: '2023-10-28T15:38:34.831054+09:00',
    groups: [],
    user_permissions: [],
  },
  profile: {
    id: 1,
    is_teacher: false,
    phone_number: '',
    user: 2,
  },
  teacher_info: null,
  student_info: {
    id: 1,
    user: 2,
  },
};

const useAuthStoreInternal = create(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        setAuth: (newToken: string, user: UserInfo) =>
          set({ token: newToken, user: user }),
        clearAuth: () => set({ token: null }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
) as unknown as () => AuthStore;

export const useAuthStore = (): AuthStore => {
  const state = useAuthStoreInternal();
  return {
    token: state.token,
    user: state.user,
    setAuth: state.setAuth,
    clearAuth: state.clearAuth,
  };
};

export default useAuthStore;
// 사용 예:
// useAuthStore.getState().setToken('YOUR_NEW_TOKEN');
