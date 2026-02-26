import { spotifyApi } from '../api/spotifyApi';

export interface AuthResponse {
    ok: boolean;
    message?: string;
    token?: string;
    user?: any;
}

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        console.log('Login attempt:', { email, password: '***' });
        const { data } = await spotifyApi.post('/auth/login', { email, password });
        console.log('Login response:', JSON.stringify(data));
        return {
            ok: true,
            token: data.token,
            user: data.user
        };
    } catch (error: any) {

        console.log('Login error status:', error.response?.status);
        console.log('Login error data:', JSON.stringify(error.response?.data));
        console.log('Login error message:', error.message);

        const message = error.response?.data?.message
            || error.message
            || 'Error desconocido en el login';
        return {
            ok: false,
            message
        };
    }
};

export const registerAction = async (userData: any): Promise<AuthResponse> => {
    try {
        const { data } = await spotifyApi.post('/usuarios', userData);
        return {
            ok: true,
            user: data
        };
    } catch (error: any) {
        return {
            ok: false,
            message: error.response?.data?.message || 'Error en el registro'
        };
    }
};

export const checkAuthStatusAction = async (): Promise<AuthResponse> => {
    try {
        const { data } = await spotifyApi.get('/auth/check-status');
        return {
            ok: true,
            token: data.token,
            user: data.user
        };
    } catch (error) {
        return {
            ok: false,
            message: 'Token expirado o inválido'
        };
    }
};
