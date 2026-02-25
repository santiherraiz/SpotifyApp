import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
    useFollowedPlaylists,
    useFollowedArtists,
    useFollowedAlbums,
    useFollowedPodcasts,
    useSavedSongs,
} from '../../../presentation/hooks/useLibrary';
import { useUserPlaylists } from '../../../presentation/hooks/usePlaylists';
import { PosterCard } from '../../../presentation/components/PosterCard';
import { SongCard } from '../../../presentation/components/SongCard';
import { LoadingScreen } from '../../../presentation/components/LoadingScreen';
import { EmptyState } from '../../../presentation/components/EmptyState';

type FilterType = 'playlists' | 'artistas' | 'albums' | 'podcasts' | 'canciones';

const filters: { key: FilterType; label: string }[] = [
    { key: 'playlists', label: 'Playlists' },
    { key: 'artistas', label: 'Artistas' },
    { key: 'albums', label: 'Álbumes' },
    { key: 'podcasts', label: 'Podcasts' },
    { key: 'canciones', label: 'Canciones' },
];

export default function LibraryScreen() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<FilterType>('playlists');

    const { data: myPlaylists } = useUserPlaylists();
    const { data: followedPlaylists } = useFollowedPlaylists();
    const { data: followedArtists } = useFollowedArtists();
    const { data: followedAlbums } = useFollowedAlbums();
    const { data: followedPodcasts } = useFollowedPodcasts();
    const { data: savedSongs } = useSavedSongs();

    const allPlaylists = [...(myPlaylists ?? []), ...(followedPlaylists ?? [])];

    const renderContent = () => {
        switch (activeFilter) {
            case 'playlists':
                return allPlaylists.length > 0 ? (
                    allPlaylists.map((pl) => (
                        <TouchableOpacity
                            key={pl.id}
                            onPress={() => router.push(`/(app)/playlist/${pl.id}`)}
                            className="flex-row items-center py-3 px-4"
                        >
                            <View className="w-14 h-14 rounded bg-spotify-dark-surface items-center justify-center mr-3">
                                <Ionicons name="musical-notes" size={24} color="#1DB954" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-base font-medium">{pl.titulo}</Text>
                                <Text className="text-spotify-light-gray text-sm">
                                    Playlist · {pl.numeroCanciones ?? 0} canciones
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <EmptyState
                        icon="musical-notes-outline"
                        title="Sin playlists"
                        subtitle="Crea o sigue playlists"
                    />
                );

            case 'artistas':
                return (followedArtists ?? []).length > 0 ? (
                    (followedArtists ?? []).map((artist) => (
                        <TouchableOpacity
                            key={artist.id}
                            onPress={() => router.push(`/(app)/artist/${artist.id}`)}
                            className="flex-row items-center py-3 px-4"
                        >
                            <View className="w-14 h-14 rounded-full bg-spotify-dark-surface items-center justify-center mr-3">
                                <Ionicons name="person" size={24} color="#FF9800" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-base font-medium">{artist.nombre}</Text>
                                <Text className="text-spotify-light-gray text-sm">Artista</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <EmptyState icon="people-outline" title="Sin artistas" subtitle="Sigue a tus artistas favoritos" />
                );

            case 'albums':
                return (followedAlbums ?? []).length > 0 ? (
                    (followedAlbums ?? []).map((album) => (
                        <TouchableOpacity
                            key={album.id}
                            onPress={() => router.push(`/(app)/album/${album.id}`)}
                            className="flex-row items-center py-3 px-4"
                        >
                            <View className="w-14 h-14 rounded bg-spotify-dark-surface items-center justify-center mr-3">
                                <Ionicons name="disc" size={24} color="#2196F3" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-base font-medium">{album.titulo}</Text>
                                <Text className="text-spotify-light-gray text-sm">
                                    {album.artista?.nombre ?? 'Álbum'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <EmptyState icon="disc-outline" title="Sin álbumes" subtitle="Sigue álbumes que te gusten" />
                );

            case 'podcasts':
                return (followedPodcasts ?? []).length > 0 ? (
                    (followedPodcasts ?? []).map((pod) => (
                        <TouchableOpacity
                            key={pod.id}
                            onPress={() => router.push(`/(app)/podcast/${pod.id}`)}
                            className="flex-row items-center py-3 px-4"
                        >
                            <View className="w-14 h-14 rounded bg-spotify-dark-surface items-center justify-center mr-3">
                                <Ionicons name="mic" size={24} color="#E91E63" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-base font-medium">{pod.titulo}</Text>
                                <Text className="text-spotify-light-gray text-sm">Podcast</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <EmptyState icon="mic-outline" title="Sin podcasts" subtitle="Sigue podcasts interesantes" />
                );

            case 'canciones':
                return (savedSongs ?? []).length > 0 ? (
                    (savedSongs ?? []).map((song, index) => (
                        <SongCard key={song.id} song={song} index={index} onPress={() => { }} />
                    ))
                ) : (
                    <EmptyState icon="heart-outline" title="Sin canciones" subtitle="Guarda canciones que te gusten" />
                );
        }
    };

    return (
        <View className="flex-1 bg-spotify-black">
            {/* Header */}
            <View className="pt-14 pb-2 px-4">
                <Text className="text-white text-2xl font-bold">Tu biblioteca</Text>
            </View>

            {/* Filter Buttons (Horizontal) */}
            <FlatList
                data={filters}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setActiveFilter(item.key)}
                        className={`px-4 py-2 rounded-full mr-2 ${activeFilter === item.key
                                ? 'bg-spotify-green'
                                : 'bg-spotify-dark-surface'
                            }`}
                    >
                        <Text
                            className={`text-sm font-semibold ${activeFilter === item.key ? 'text-black' : 'text-white'
                                }`}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.key}
            />

            {/* Content */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {renderContent()}
            </ScrollView>
        </View>
    );
}
