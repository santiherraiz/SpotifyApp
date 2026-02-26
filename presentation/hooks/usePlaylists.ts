import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getUserPlaylistsAction,
    createPlaylistAction,
    getPlaylistDetailAction,
    getPlaylistSongsAction,
    addSongToPlaylistAction,
    removeSongFromPlaylistAction,
    getPublicPlaylistsAction,
} from '../../core/actions/playlist.actions';
import { useAuthStore } from '../stores/auth.store';

export const useUserPlaylists = () => {
    const user = useAuthStore((s) => s.user);

    return useQuery({
        queryKey: ['userPlaylists', user?.id],
        queryFn: () => getUserPlaylistsAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useCreatePlaylist = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);

    return useMutation({
        mutationFn: (titulo: string) => createPlaylistAction(user!.id, titulo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userPlaylists', user?.id] });
            queryClient.invalidateQueries({ queryKey: ['publicPlaylists'] });
        },
    });
};

export const usePlaylistDetail = (playlistId: number) => {
    return useQuery({
        queryKey: ['playlist', playlistId],
        queryFn: () => getPlaylistDetailAction(playlistId),
        enabled: !!playlistId,
    });
};

export const usePlaylistSongs = (playlistId: number) => {
    return useQuery({
        queryKey: ['playlistSongs', playlistId],
        queryFn: () => getPlaylistSongsAction(playlistId),
        enabled: !!playlistId,
    });
};

export const useAddSongToPlaylist = (playlistId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cancionId: number) => addSongToPlaylistAction(playlistId, cancionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlistSongs', playlistId] });
        },
    });
};

export const useAddSongToPlaylistGeneric = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ playlistId, cancionId }: { playlistId: number; cancionId: number }) =>
            addSongToPlaylistAction(playlistId, cancionId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['playlistSongs', variables.playlistId] });
        },
    });
};

export const useRemoveSongFromPlaylist = (playlistId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cancionId: number) => removeSongFromPlaylistAction(playlistId, cancionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlistSongs', playlistId] });
        },
    });
};

export const usePublicPlaylists = () => {
    return useQuery({
        queryKey: ['publicPlaylists'],
        queryFn: getPublicPlaylistsAction,
    });
};
