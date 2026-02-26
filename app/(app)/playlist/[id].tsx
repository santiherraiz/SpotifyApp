import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlaylistDetail, usePlaylistSongs } from '../../../presentation/hooks/usePlaylists';
import { SongCard } from '../../../presentation/components/SongCard';
import { LoadingScreen } from '../../../presentation/components/LoadingScreen';
import { EmptyState } from '../../../presentation/components/EmptyState';
import { getImageSource } from '../../../presentation/utils/imageAssets';

export default function PlaylistDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const playlistId = Number(id);

    const { data: playlist, isLoading: loadingPlaylist } = usePlaylistDetail(playlistId);
    const { data: songs, isLoading: loadingSongs } = usePlaylistSongs(playlistId);

    if (loadingPlaylist || loadingSongs) return <LoadingScreen />;

    return (
        <View className="flex-1 bg-spotify-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="pt-14 pb-6 px-4">
                    <TouchableOpacity onPress={() => router.back()} className="mb-4">
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>

                    <View className="items-center mb-6">
                        {playlist?.imagen ? (
                            <Image
                                source={getImageSource(playlist.imagen)}
                                className="w-48 h-48 rounded-xl mb-4"
                            />
                        ) : (
                            <View className="w-48 h-48 rounded-xl bg-spotify-dark-surface items-center justify-center mb-4">
                                <Ionicons name="musical-notes" size={64} color="#1DB954" />
                            </View>
                        )}
                        <Text className="text-white text-2xl font-bold text-center">
                            {playlist?.titulo ?? 'Playlist'}
                        </Text>
                        <Text className="text-spotify-light-gray text-sm mt-1">
                            {playlist?.usuario?.username ?? 'Usuario'} · {playlist?.numeroCanciones ?? songs?.length ?? 0} canciones
                        </Text>
                    </View>

                    <View className="flex-row justify-center items-center gap-4 mb-6">
                        <TouchableOpacity className="bg-spotify-green w-14 h-14 rounded-full items-center justify-center">
                            <Ionicons name="play" size={28} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="shuffle" size={28} color="#1DB954" />
                        </TouchableOpacity>
                    </View>
                </View>

                {songs && songs.length > 0 ? (
                    songs.map((song, index) => (
                        <SongCard key={`pl-song-${song.id}-${index}`} song={song} index={index} />
                    ))
                ) : (
                    <EmptyState
                        icon="musical-notes-outline"
                        title="Playlist vacía"
                        subtitle="Añade canciones a esta playlist"
                    />
                )}
            </ScrollView>
        </View>
    );
}
