import { spotifyApi } from '../api/spotifyApi';
import { ApiPlaylist, ApiCancion } from '../../infrastructure/interfaces/api.interfaces';
import { Playlist, Cancion } from '../../infrastructure/interfaces/app.interfaces';
import { mapPlaylist, mapCancion } from '../../infrastructure/mappers/entity.mapper';

// Playlists del Usuario
export const getUserPlaylistsAction = async (userId: number): Promise<Playlist[]> => {
    const { data } = await spotifyApi.get<ApiPlaylist[]>(`/usuarios/${userId}/playlists`);
    return data.map(mapPlaylist);
};

export const createPlaylistAction = async (
    userId: number,
    titulo: string,
): Promise<Playlist> => {
    const { data } = await spotifyApi.post<ApiPlaylist>(`/usuarios/${userId}/playlists`, { titulo });
    return mapPlaylist(data);
};

// Detalle de la Playlist
export const getPlaylistDetailAction = async (playlistId: number): Promise<Playlist> => {
    const { data } = await spotifyApi.get<ApiPlaylist>(`/playlists/${playlistId}`);
    return mapPlaylist(data);
};

// Canciones de la Playlist
export const getPlaylistSongsAction = async (playlistId: number): Promise<Cancion[]> => {
    const { data } = await spotifyApi.get<ApiCancion[]>(`/playlists/${playlistId}/canciones`);
    return data.map(mapCancion);
};

export const addSongToPlaylistAction = async (
    playlistId: number,
    cancionId: number,
): Promise<void> => {
    await spotifyApi.post(`/playlists/${playlistId}/canciones`, { cancionId });
};

export const removeSongFromPlaylistAction = async (
    playlistId: number,
    cancionId: number,
): Promise<void> => {
    await spotifyApi.delete(`/playlists/${playlistId}/canciones/${cancionId}`);
};

// Playlists Públicas
export const getPublicPlaylistsAction = async (): Promise<Playlist[]> => {
    const { data } = await spotifyApi.get<ApiPlaylist[]>('/playlists');
    return data.map(mapPlaylist);
};
