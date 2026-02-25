import { useQuery } from '@tanstack/react-query';
import {
    getCatalogSongsAction,
    getCatalogArtistsAction,
    getCatalogAlbumsAction,
    getCatalogPodcastsAction,
    getCatalogArtistAction,
    getArtistAlbumsAction,
    getArtistSongsAction,
    getCatalogAlbumAction,
    getAlbumSongsAction,
    getCatalogPodcastAction,
    getPodcastChaptersAction,
} from '../../core/actions/catalog.actions';

export const useCatalogSongs = () => {
    return useQuery({
        queryKey: ['catalogSongs'],
        queryFn: getCatalogSongsAction,
    });
};

export const useCatalogArtists = () => {
    return useQuery({
        queryKey: ['catalogArtists'],
        queryFn: getCatalogArtistsAction,
    });
};

export const useCatalogAlbums = () => {
    return useQuery({
        queryKey: ['catalogAlbums'],
        queryFn: getCatalogAlbumsAction,
    });
};

export const useCatalogPodcasts = () => {
    return useQuery({
        queryKey: ['catalogPodcasts'],
        queryFn: getCatalogPodcastsAction,
    });
};

export const useArtistDetail = (artistaId: number) => {
    return useQuery({
        queryKey: ['artist', artistaId],
        queryFn: () => getCatalogArtistAction(artistaId),
        enabled: !!artistaId,
    });
};

export const useArtistAlbums = (artistaId: number) => {
    return useQuery({
        queryKey: ['artistAlbums', artistaId],
        queryFn: () => getArtistAlbumsAction(artistaId),
        enabled: !!artistaId,
    });
};

export const useArtistSongs = (artistaId: number) => {
    return useQuery({
        queryKey: ['artistSongs', artistaId],
        queryFn: () => getArtistSongsAction(artistaId),
        enabled: !!artistaId,
    });
};

export const useAlbumDetail = (albumId: number) => {
    return useQuery({
        queryKey: ['album', albumId],
        queryFn: () => getCatalogAlbumAction(albumId),
        enabled: !!albumId,
    });
};

export const useAlbumSongs = (albumId: number) => {
    return useQuery({
        queryKey: ['albumSongs', albumId],
        queryFn: () => getAlbumSongsAction(albumId),
        enabled: !!albumId,
    });
};

export const usePodcastDetail = (podcastId: number) => {
    return useQuery({
        queryKey: ['podcast', podcastId],
        queryFn: () => getCatalogPodcastAction(podcastId),
        enabled: !!podcastId,
    });
};

export const usePodcastChapters = (podcastId: number) => {
    return useQuery({
        queryKey: ['podcastChapters', podcastId],
        queryFn: () => getPodcastChaptersAction(podcastId),
        enabled: !!podcastId,
    });
};
