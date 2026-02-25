import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFollowedPlaylists, useFollowedAlbums, useSavedSongs } from '../../../presentation/hooks/useLibrary';
import { HorizontalList } from '../../../presentation/components/HorizontalList';
import { PosterCard } from '../../../presentation/components/PosterCard';
import { SongCard } from '../../../presentation/components/SongCard';
import { LoadingScreen } from '../../../presentation/components/LoadingScreen';
import { EmptyState } from '../../../presentation/components/EmptyState';
import { useAuthStore } from '../../../presentation/stores/auth.store';

export default function HomeScreen() {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const { data: playlists, isLoading: loadingPlaylists } = useFollowedPlaylists();
    const { data: albums, isLoading: loadingAlbums } = useFollowedAlbums();
    const { data: songs, isLoading: loadingSongs } = useSavedSongs();

    if (loadingPlaylists && loadingAlbums && loadingSongs) {
        return <LoadingScreen />;
    }

    return (
        <View className="flex-1 bg-spotify-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 pt-14 pb-4">
                    <Text className="text-white text-2xl font-bold">
                        ¡Hola, {user?.username ?? 'Usuario'}!
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('/(app)/profile')}
                        className="w-10 h-10 rounded-full bg-spotify-dark-surface items-center justify-center"
                    >
                        <Ionicons name="person" size={20} color="#1DB954" />
                    </TouchableOpacity>
                </View>

                {/* Playlists Seguidas (Horizontal) */}
                <HorizontalList
                    title="Playlists seguidas"
                    data={playlists ?? []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => (
                        <PosterCard
                            title={item.titulo}
                            subtitle={`${item.numeroCanciones ?? 0} canciones`}
                            onPress={() => router.push(`/(app)/playlist/${item.id}`)}
                        />
                    )}
                />

                {/* Álbumes Seguidos (Horizontal) */}
                <HorizontalList
                    title="Álbumes seguidos"
                    data={albums ?? []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(item) => (
                        <PosterCard
                            title={item.titulo}
                            subtitle={item.artista?.nombre}
                            imageUrl={item.imagen}
                            onPress={() => router.push(`/(app)/album/${item.id}`)}
                        />
                    )}
                />

                {/* Canciones Favoritas (Vertical) */}
                <View className="mb-6">
                    <Text className="text-white text-xl font-bold px-4 mb-3">
                        Canciones favoritas
                    </Text>
                    {songs && songs.length > 0 ? (
                        songs.map((song, index) => (
                            <SongCard
                                key={song.id}
                                song={song}
                                index={index}
                                onPress={() => { }}
                            />
                        ))
                    ) : (
                        <EmptyState
                            icon="heart-outline"
                            title="Sin canciones guardadas"
                            subtitle="Guarda tus canciones favoritas aquí"
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
