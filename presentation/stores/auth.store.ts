import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Usuario } from '../../infrastructure/interfaces/app.interfaces';
import { loginAction, checkAuthStatusAction } from '../../core/actions/auth.actions';

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthState {
    status: AuthStatus;
    token: string | null;
    user: Usuario | null;
    isPremium: boolean;

    login: (username: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    setUser: (user: Usuario) => void;
    setPremium: (isPremium: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'authenticated',
    token: 'mock-token',
    user: {
        id: 1,
        username: 'Demo User',
        email: 'demo@example.com',
        fechaNacimiento: '1990-01-01',
    },
    isPremium: true,

    login: async (username: string, password: string) => {
        try {
            const { token, user } = await loginAction(username, password);
            await SecureStore.setItemAsync('auth_token', token);
            set({ status: 'authenticated', token, user });
            return true;
        } catch (error) {
            set({ status: 'unauthenticated', token: null, user: null });
            return false;
        }
    },

    logout: async () => {
        await SecureStore.deleteItemAsync('auth_token');
        set({ status: 'unauthenticated', token: null, user: null, isPremium: false });
    },

    checkAuth: async () => {
        // En modo bypass, siempre confirmamos que estamos autenticados
        set({ status: 'authenticated' });
    },


    setUser: (user: Usuario) => set({ user }),
    setPremium: (isPremium: boolean) => set({ isPremium }),
}));
