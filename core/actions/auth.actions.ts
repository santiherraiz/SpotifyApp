import { spotifyApi } from '../api/spotifyApi';
import { ApiLoginResponse, ApiUsuario } from '../../infrastructure/interfaces/api.interfaces';
import { AuthResponse, Usuario } from '../../infrastructure/interfaces/app.interfaces';
import { mapUsuario } from '../../infrastructure/mappers/entity.mapper';

export const loginAction = async (username: string, password: string): Promise<AuthResponse> => {
    const { data } = await spotifyApi.post<ApiLoginResponse>('/auth/login', { username, password });
    return {
        token: data.token,
        user: mapUsuario(data.usuario),
    };
};

export const registerAction = async (userData: {
    username: string;
    email: string;
    password: string;
    fechaNacimiento: string;
}): Promise<Usuario> => {
    const { data } = await spotifyApi.post<ApiUsuario>('/usuarios', {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        fecha_nacimiento: userData.fechaNacimiento,
    });
    return mapUsuario(data);
};

export const checkAuthStatusAction = async (): Promise<AuthResponse> => {
    const { data } = await spotifyApi.get<ApiLoginResponse>('/auth/check-status');
    return {
        token: data.token,
        user: mapUsuario(data.usuario),
    };
};
