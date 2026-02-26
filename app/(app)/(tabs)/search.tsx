import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SearchBar } from '../../../presentation/components/SearchBar';
import { SongCard } from '../../../presentation/components/SongCard';
import { PosterCard } from '../../../presentation/components/PosterCard';
import {
    useCatalogSongs,
    useCatalogArtists,
    useCatalogAlbums,
    useCatalogPodcasts,
} from '../../../presentation/hooks/useCatalog';
import { usePublicPlaylists } from '../../../presentation/hooks/usePlaylists';


type QuickCategory = 'playlists' | 'podcasts' | 'artistas' | 'albums';

const quickButtons: { key: QuickCategory; label: string; icon: keyof typeof Ionicons.glyphMap; color: string }[] = [
    { key: 'playlists', label: 'Playlists', icon: 'list', color: '#1DB954' },
    { key: 'podcasts', label: 'Podcasts', icon: 'mic', color: '#E91E63' },
    { key: 'artistas', label: 'Artistas', icon: 'people', color: '#FF9800' },
    { key: 'albums', label: 'Álbumes', icon: 'disc', color: '#2196F3' },
];

export default function SearchScreen() {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<QuickCategory | null>(null);

    const { data: songs } = useCatalogSongs();
    const { data: artists } = useCatalogArtists();
    const { data: albums } = useCatalogAlbums();
    const { data: podcasts } = useCatalogPodcasts();
    const { data: playlists } = usePublicPlaylists();

    const handleSearch = useCallback((text: string) => {
        setQuery(text);
        if (text.length === 0) setActiveCategory(null);
    }, []);

    const filteredSongs = query
        ? (songs ?? []).filter((s) => s.titulo.toLowerCase().includes(query.toLowerCase()))
        : [];
    const filteredArtists = query
        ? (artists ?? []).filter((a) => a.nombre.toLowerCase().includes(query.toLowerCase()))
        : [];
    const filteredAlbums = query
        ? (albums ?? []).filter((a) => a.titulo.toLowerCase().includes(query.toLowerCase()))
        : [];
    const filteredPlaylists = query
        ? (playlists ?? []).filter((p) => p.titulo.toLowerCase().includes(query.toLowerCase()))
        : [];

    return (
        <View className="flex-1 bg-spotify-black">
            <View className="pt-14 pb-4 px-4">
                <Text className="text-white text-2xl font-bold mb-4">Buscar</Text>
                <SearchBar onSearch={handleSearch} />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {!query && !activeCategory && (
                    <View className="flex-row flex-wrap px-4 gap-3 mb-6">
                        {quickButtons.map((btn) => (
                            <TouchableOpacity
                                key={btn.key}
                                onPress={() => setActiveCategory(btn.key)}
                                className="flex-1 min-w-[45%] rounded-xl py-6 px-4 items-center"
                                style={{ backgroundColor: btn.color + '20' }}
                                activeOpacity={0.7}
                            >
                                <Ionicons name={btn.icon} size={32} color={btn.color} />
                                <Text className="text-white text-base font-semibold mt-2">{btn.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {activeCategory && !query && (
                    <View className="px-4 mb-4">
                        <TouchableOpacity
                            onPress={() => setActiveCategory(null)}
                            className="flex-row items-center mb-3"
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                            <Text className="text-white text-lg ml-2">Volver</Text>
                        </TouchableOpacity>
                        <Text className="text-white text-xl font-bold capitalize mb-4">
                            {activeCategory}
                        </Text>
                        {activeCategory === 'artistas' &&
                            (artists ?? []).map((artist, index) => (
                                <TouchableOpacity
                                    key={`search-artist-${artist.id}-${index}`}
                                    onPress={() => router.push(`/(app)/artist/${artist.id}`)}
                                    className="flex-row items-center py-3"
                                >
                                    <PosterCard
                                        title={artist.nombre}
                                        imageUrl={artist.imagen}
                                        size="small"
                                        rounded
                                        onPress={() => router.push(`/(app)/artist/${artist.id}`)}
                                    />
                                </TouchableOpacity>
                            ))}
                        {activeCategory === 'albums' &&
                            (albums ?? []).map((album, index) => (
                                <PosterCard
                                    key={`search-album-${album.id}-${index}`}
                                    title={album.titulo}
                                    subtitle={album.artista?.nombre}
                                    imageUrl={album.imagen}
                                    size="small"
                                    onPress={() => router.push(`/(app)/album/${album.id}`)}
                                />
                            ))}
                        {activeCategory === 'playlists' &&
                            (playlists ?? []).map((pl, index) => (
                                <PosterCard
                                    key={`search-playlist-${pl.id}-${index}`}
                                    title={pl.titulo}
                                    subtitle={`${pl.numeroCanciones ?? 0} canciones`}
                                    imageUrl={pl.imagen}
                                    size="small"
                                    onPress={() => router.push(`/(app)/playlist/${pl.id}`)}
                                />
                            ))}
                        {activeCategory === 'podcasts' &&
                            (podcasts ?? []).map((pod, index) => (
                                <PosterCard
                                    key={`search-podcast-${pod.id}-${index}`}
                                    title={pod.titulo}
                                    imageUrl={pod.imagen}
                                    size="small"
                                    onPress={() => router.push(`/(app)/podcast/${pod.id}`)}
                                />
                            ))}
                    </View>
                )}

                {query.length >= 3 && (
                    <View className="px-4">
                        {filteredArtists.length > 0 && (
                            <View className="mb-4">
                                <Text className="text-white text-lg font-bold mb-2">Artistas</Text>
                                <FlatList
                                    data={filteredArtists.slice(0, 5)}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <PosterCard
                                            title={item.nombre}
                                            imageUrl={item.imagen}
                                            size="small"
                                            rounded
                                            onPress={() => router.push(`/(app)/artist/${item.id}`)}
                                        />
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        )}

                        {filteredAlbums.length > 0 && (
                            <View className="mb-4">
                                <Text className="text-white text-lg font-bold mb-2">Álbumes</Text>
                                <FlatList
                                    data={filteredAlbums.slice(0, 5)}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <PosterCard
                                            title={item.titulo}
                                            subtitle={item.artista?.nombre}
                                            imageUrl={item.imagen}
                                            size="small"
                                            onPress={() => router.push(`/(app)/album/${item.id}`)}
                                        />
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        )}

                        {filteredPlaylists.length > 0 && (
                            <View className="mb-4">
                                <Text className="text-white text-lg font-bold mb-2">Playlists</Text>
                                <FlatList
                                    data={filteredPlaylists.slice(0, 5)}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <PosterCard
                                            title={item.titulo}
                                            subtitle={`${item.numeroCanciones ?? 0} canciones`}
                                            imageUrl={item.imagen}
                                            size="small"
                                            onPress={() => router.push(`/(app)/playlist/${item.id}`)}
                                        />
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        )}

                        {filteredSongs.length > 0 && (
                            <View className="mb-4">
                                <Text className="text-white text-lg font-bold mb-2">Canciones</Text>
                                {filteredSongs.slice(0, 10).map((song, index) => (
                                    <SongCard key={song.id} song={song} index={index} />
                                ))}
                            </View>
                        )}

                        {
                            filteredSongs.length === 0 &&
                            filteredArtists.length === 0 &&
                            filteredAlbums.length === 0 &&
                            filteredPlaylists.length === 0 && (
                                <View className="items-center py-12">
                                    <Ionicons name="search-outline" size={48} color="#535353" />
                                    <Text className="text-spotify-light-gray text-base mt-4">
                                        No se encontraron resultados para "{query}"
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
