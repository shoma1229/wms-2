import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  role: 'client' | 'warehouse';
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email: string, password: string) => {
        // このデモでは簡易的な実装としています
        const mockUser = {
          id: '1',
          name: email.includes('warehouse') ? '倉庫 担当者' : '山田 太郎',
          role: email.includes('warehouse') ? 'warehouse' : 'client',
        } as User;

        const mockToken = 'mock-token-' + mockUser.role;

        set({ user: mockUser, token: mockToken });
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);