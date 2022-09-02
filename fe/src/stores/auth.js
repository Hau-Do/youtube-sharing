import create from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {},
      isLoading: false,
      rebound: true,
      tokens: {},
      setAuthState: (state, action) => {
        Object.keys(action?.payload || {}).forEach((key) => {
          state[key] = action.payload[key];
        });
        set(state);
      },
      logoutAction: () => {
        set({
          user: {},
          isLoading: false,
          rebound: true,
          tokens: {},
        });
      },
    }),
    {
      name: 'auth',
    }
  )
);

export default useAuthStore;
