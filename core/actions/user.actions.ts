import { spotifyApi } from '../api/spotifyApi';
import { ApiUsuario, ApiConfiguracion } from '../../infrastructure/interfaces/api.interfaces';
import { Usuario, Configuracion } from '../../infrastructure/interfaces/app.interfaces';
import { mapUsuario, mapConfiguracion } from '../../infrastructure/mappers/entity.mapper';

// Usuario
export const getUserAction = async (userId: number): Promise<Usuario> => {
    const { data } = await spotifyApi.get<ApiUsuario>(`/usuarios/${userId}`);
    return mapUsuario(data);
};

export const updateUserAction = async (
    userId: number,
    userData: Partial<{
        username: string;
        email: string;
        genero: string;
        pais: string;
        codigoPostal: string;
    }>,
): Promise<Usuario> => {
    const { data } = await spotifyApi.put<ApiUsuario>(`/usuarios/${userId}`, {
        username: userData.username,
        email: userData.email,
        genero: userData.genero,
        pais: userData.pais,
        codigo_postal: userData.codigoPostal,
    });
    return mapUsuario(data);
};

export const deleteUserAction = async (userId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}`);
};

// Configuración
export const getConfigAction = async (userId: number): Promise<Configuracion> => {
    const { data } = await spotifyApi.get<ApiConfiguracion>(`/usuarios/${userId}/configuracion`);
    return mapConfiguracion(data);
};

export const updateConfigAction = async (
    userId: number,
    config: Partial<Configuracion>,
): Promise<Configuracion> => {
    const { data } = await spotifyApi.put<ApiConfiguracion>(`/usuarios/${userId}/configuracion`, config);
    return mapConfiguracion(data);
};
