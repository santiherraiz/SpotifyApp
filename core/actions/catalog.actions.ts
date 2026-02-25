import { spotifyApi } from '../api/spotifyApi';
import {
    ApiCancion,
    ApiArtista,
    ApiAlbum,
    ApiPodcast,
    ApiCapitulo,
} from '../../infrastructure/interfaces/api.interfaces';
import {
    Cancion,
    Artista,
    Album,
    Podcast,
    Capitulo,
} from '../../infrastructure/interfaces/app.interfaces';
import {
    mapCancion,
    mapArtista,
    mapAlbum,
    mapPodcast,
    mapCapitulo,
} from '../../infrastructure/mappers/entity.mapper';

// ─── Canciones ───
export const getCatalogSongsAction = async (): Promise<Cancion[]> => {
    const { data } = await spotifyApi.get<ApiCancion[]>('/canciones');
    return data.map(mapCancion);
};

export const getCatalogSongAction = async (cancionId: number): Promise<Cancion> => {
    const { data } = await spotifyApi.get<ApiCancion>(`/canciones/${cancionId}`);
    return mapCancion(data);
};

// ─── Artistas ───
export const getCatalogArtistsAction = async (): Promise<Artista[]> => {
    const { data } = await spotifyApi.get<ApiArtista[]>('/artistas');
    return data.map(mapArtista);
};

export const getCatalogArtistAction = async (artistaId: number): Promise<Artista> => {
    const { data } = await spotifyApi.get<ApiArtista>(`/artistas/${artistaId}`);
    return mapArtista(data);
};

export const getArtistAlbumsAction = async (artistaId: number): Promise<Album[]> => {
    const { data } = await spotifyApi.get<ApiAlbum[]>(`/artistas/${artistaId}/albums`);
    return data.map(mapAlbum);
};

export const getArtistSongsAction = async (artistaId: number): Promise<Cancion[]> => {
    const { data } = await spotifyApi.get<ApiCancion[]>(`/artistas/${artistaId}/canciones`);
    return data.map(mapCancion);
};

// ─── Albums ───
export const getCatalogAlbumsAction = async (): Promise<Album[]> => {
    const { data } = await spotifyApi.get<ApiAlbum[]>('/albums');
    return data.map(mapAlbum);
};

export const getCatalogAlbumAction = async (albumId: number): Promise<Album> => {
    const { data } = await spotifyApi.get<ApiAlbum>(`/albums/${albumId}`);
    return mapAlbum(data);
};

export const getAlbumSongsAction = async (albumId: number): Promise<Cancion[]> => {
    const { data } = await spotifyApi.get<ApiCancion[]>(`/albums/${albumId}/canciones`);
    return data.map(mapCancion);
};

// ─── Podcasts ───
export const getCatalogPodcastsAction = async (): Promise<Podcast[]> => {
    const { data } = await spotifyApi.get<ApiPodcast[]>('/podcasts');
    return data.map(mapPodcast);
};

export const getCatalogPodcastAction = async (podcastId: number): Promise<Podcast> => {
    const { data } = await spotifyApi.get<ApiPodcast>(`/podcasts/${podcastId}`);
    return mapPodcast(data);
};

export const getPodcastChaptersAction = async (podcastId: number): Promise<Capitulo[]> => {
    const { data } = await spotifyApi.get<ApiCapitulo[]>(`/podcasts/${podcastId}/capitulos`);
    return data.map(mapCapitulo);
};

// ─── Capitulos ───
export const getChapterAction = async (capituloId: number): Promise<Capitulo> => {
    const { data } = await spotifyApi.get<ApiCapitulo>(`/capitulos/${capituloId}`);
    return mapCapitulo(data);
};
