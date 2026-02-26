import { spotifyApi } from '../api/spotifyApi';
import {
    ApiPlaylist,
    ApiArtista,
    ApiAlbum,
    ApiPodcast,
    ApiCancion,
} from '../../infrastructure/interfaces/api.interfaces';
import {
    Playlist,
    Artista,
    Album,
    Podcast,
    Cancion,
} from '../../infrastructure/interfaces/app.interfaces';
import {
    mapPlaylist,
    mapArtista,
    mapAlbum,
    mapPodcast,
    mapCancion,
} from '../../infrastructure/mappers/entity.mapper';

// Followed Playlists
export const getFollowedPlaylistsAction = async (userId: number): Promise<Playlist[]> => {
    const { data } = await spotifyApi.get<ApiPlaylist[]>(`/usuarios/${userId}/playlists-seguidas`);
    return data.map(mapPlaylist);
};

export const followPlaylistAction = async (userId: number, playlistId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/playlists-seguidas`, { playlistId });
};

export const unfollowPlaylistAction = async (userId: number, playlistId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/playlists-seguidas`, { data: { playlistId } });
};

// Followed Artists
export const getFollowedArtistsAction = async (userId: number): Promise<Artista[]> => {
    const { data } = await spotifyApi.get<ApiArtista[]>(`/usuarios/${userId}/artistas-seguidos`);
    return data.map(mapArtista);
};

export const followArtistAction = async (userId: number, artistaId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/artistas-seguidos`, { artistaId });
};

export const unfollowArtistAction = async (userId: number, artistaId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/artistas-seguidos`, { data: { artistaId } });
};

// Followed Albums
export const getFollowedAlbumsAction = async (userId: number): Promise<Album[]> => {
    const { data } = await spotifyApi.get<ApiAlbum[]>(`/usuarios/${userId}/albums-seguidos`);
    return data.map(mapAlbum);
};

export const followAlbumAction = async (userId: number, albumId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/albums-seguidos`, { albumId });
};

export const unfollowAlbumAction = async (userId: number, albumId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/albums-seguidos`, { data: { albumId } });
};

// Followed Podcasts
export const getFollowedPodcastsAction = async (userId: number): Promise<Podcast[]> => {
    const { data } = await spotifyApi.get<ApiPodcast[]>(`/usuarios/${userId}/podcasts-seguidos`);
    return data.map(mapPodcast);
};

export const followPodcastAction = async (userId: number, podcastId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/podcasts-seguidos`, { podcastId });
};

export const unfollowPodcastAction = async (userId: number, podcastId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/podcasts-seguidos`, { data: { podcastId } });
};

// Saved Songs
export const getSavedSongsAction = async (userId: number): Promise<Cancion[]> => {
    const { data } = await spotifyApi.get<ApiCancion[]>(`/usuarios/${userId}/canciones-guardadas`);
    return data.map(mapCancion);
};

export const saveSongAction = async (userId: number, cancionId: number): Promise<void> => {
    await spotifyApi.put(`/usuarios/${userId}/canciones-guardadas`, { cancionId });
};

export const unsaveSongAction = async (userId: number, cancionId: number): Promise<void> => {
    await spotifyApi.delete(`/usuarios/${userId}/canciones-guardadas`, { data: { cancionId } });
};
