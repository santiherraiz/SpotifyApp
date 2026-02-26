import { create } from 'zustand';
import { SecureStorageAdapter } from '../../infrastructure/storage/secureStorage';
import { checkAuthStatusAction, loginAction, registerAction } from '../../core/actions/auth.actions';

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

export interface AuthState {
    status: AuthStatus;
    token: string | null;
    user: any | null;
    login: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
    register: (userData: any) => Promise<{ ok: boolean; message?: string }>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: null,
    user: null,

    login: async (email, password) => {
        set({ status: 'checking' });
        const resp = await loginAction(email, password);

        if (!resp.ok || !resp.token) {
            set({ status: 'unauthenticated', token: null, user: null });
            await SecureStorageAdapter.removeItem('auth_token');
            return { ok: false, message: resp.message };
        }

        await SecureStorageAdapter.setItem('auth_token', resp.token);
        set({ status: 'authenticated', token: resp.token, user: resp.user });
        return { ok: true };
    },

    register: async (userData) => {
        set({ status: 'checking' });
        const resp = await registerAction(userData);

        if (!resp.ok) {
            set({ status: 'unauthenticated' });
            return { ok: false, message: resp.message };
        }

        // We do not auto-login right now since it doesn't return a token reliably
        set({ status: 'unauthenticated' });
        return { ok: true };
    },

    checkStatus: async () => {
        set({ status: 'checking' });
        const currentToken = await SecureStorageAdapter.getItem('auth_token');

        if (!currentToken) {
            set({ status: 'unauthenticated', user: null, token: null });
            return;
        }

        const resp = await checkAuthStatusAction();
        if (!resp.ok) {
            set({ status: 'unauthenticated', user: null, token: null });
            await SecureStorageAdapter.removeItem('auth_token');
            return;
        }

        // If endpoint refreshed token, update it, otherwise keep current
        const newToken = resp.token || currentToken;
        await SecureStorageAdapter.setItem('auth_token', newToken);
        set({ status: 'authenticated', token: newToken, user: resp.user });
    },

    logout: async () => {
        await SecureStorageAdapter.removeItem('auth_token');
        set({ status: 'unauthenticated', token: null, user: null });
    }
}));
