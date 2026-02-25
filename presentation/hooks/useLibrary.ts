import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getFollowedPlaylistsAction,
    followPlaylistAction,
    unfollowPlaylistAction,
    getFollowedArtistsAction,
    followArtistAction,
    unfollowArtistAction,
    getFollowedAlbumsAction,
    followAlbumAction,
    unfollowAlbumAction,
    getFollowedPodcastsAction,
    followPodcastAction,
    unfollowPodcastAction,
    getSavedSongsAction,
    saveSongAction,
    unsaveSongAction,
} from '../../core/actions/follow.actions';
import { useAuthStore } from '../stores/auth.store';

// ─── Followed Playlists ───
export const useFollowedPlaylists = () => {
    const user = useAuthStore((s) => s.user);
    return useQuery({
        queryKey: ['followedPlaylists', user?.id],
        queryFn: () => getFollowedPlaylistsAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useFollowPlaylist = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (playlistId: number) => followPlaylistAction(user!.id, playlistId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followedPlaylists'] }),
    });
};

export const useUnfollowPlaylist = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (playlistId: number) => unfollowPlaylistAction(user!.id, playlistId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followedPlaylists'] }),
    });
};

// ─── Followed Artists ───
export const useFollowedArtists = () => {
    const user = useAuthStore((s) => s.user);
    return useQuery({
        queryKey: ['followedArtists', user?.id],
        queryFn: () => getFollowedArtistsAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useFollowArtist = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (artistaId: number) => followArtistAction(user!.id, artistaId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followedArtists'] }),
    });
};

export const useUnfollowArtist = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (artistaId: number) => unfollowArtistAction(user!.id, artistaId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followedArtists'] }),
    });
};

// ─── Followed Albums ───
export const useFollowedAlbums = () => {
    const user = useAuthStore((s) => s.user);
    return useQuery({
        queryKey: ['followedAlbums', user?.id],
        queryFn: () => getFollowedAlbumsAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useFollowAlbum = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (albumId: number) => followAlbumAction(user!.id, albumId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followedAlbums'] }),
    });
};

export const useUnfollowAlbum = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (albumId: number) => unfollowAlbumAction(user!.id, albumId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followedAlbums'] }),
    });
};

// ─── Followed Podcasts ───
export const useFollowedPodcasts = () => {
    const user = useAuthStore((s) => s.user);
    return useQuery({
        queryKey: ['followedPodcasts', user?.id],
        queryFn: () => getFollowedPodcastsAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useFollowPodcast = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (podcastId: number) => followPodcastAction(user!.id, podcastId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followedPodcasts'] }),
    });
};

export const useUnfollowPodcast = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (podcastId: number) => unfollowPodcastAction(user!.id, podcastId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['followedPodcasts'] }),
    });
};

// ─── Saved Songs ───
export const useSavedSongs = () => {
    const user = useAuthStore((s) => s.user);
    return useQuery({
        queryKey: ['savedSongs', user?.id],
        queryFn: () => getSavedSongsAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useSaveSong = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (cancionId: number) => saveSongAction(user!.id, cancionId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedSongs'] }),
    });
};

export const useUnsaveSong = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    return useMutation({
        mutationFn: (cancionId: number) => unsaveSongAction(user!.id, cancionId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['savedSongs'] }),
    });
};
