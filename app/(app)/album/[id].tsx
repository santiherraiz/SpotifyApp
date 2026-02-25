import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAlbumDetail, useAlbumSongs } from '../../../presentation/hooks/useCatalog';
import { SongCard } from '../../../presentation/components/SongCard';
import { LoadingScreen } from '../../../presentation/components/LoadingScreen';
import { EmptyState } from '../../../presentation/components/EmptyState';

export default function AlbumDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const albumId = Number(id);

    const { data: album, isLoading: loadingAlbum } = useAlbumDetail(albumId);
    const { data: songs, isLoading: loadingSongs } = useAlbumSongs(albumId);

    if (loadingAlbum || loadingSongs) return <LoadingScreen />;

    return (
        <View className="flex-1 bg-spotify-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="pt-14 pb-6 px-4">
                    <TouchableOpacity onPress={() => router.back()} className="mb-4">
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>

                    <View className="items-center mb-6">
                        {album?.imagen ? (
                            <Image
                                source={{ uri: album.imagen }}
                                className="w-56 h-56 rounded-xl mb-4"
                            />
                        ) : (
                            <View className="w-56 h-56 rounded-xl bg-spotify-dark-surface items-center justify-center mb-4">
                                <Ionicons name="disc" size={64} color="#2196F3" />
                            </View>
                        )}
                        <Text className="text-white text-2xl font-bold text-center">
                            {album?.titulo ?? 'Álbum'}
                        </Text>
                        <TouchableOpacity
                            onPress={() => album?.artista?.id && router.push(`/(app)/artist/${album.artista.id}`)}
                        >
                            <Text className="text-spotify-light-gray text-base mt-1">
                                {album?.artista?.nombre ?? 'Artista'}
                            </Text>
                        </TouchableOpacity>
                        {album?.anyo && (
                            <Text className="text-spotify-medium-gray text-sm mt-1">{album.anyo}</Text>
                        )}
                        {album?.patrocinado && (
                            <View className="bg-spotify-green px-3 py-1 rounded-full mt-2">
                                <Text className="text-black text-xs font-bold">PATROCINADO</Text>
                            </View>
                        )}
                    </View>

                    {/* Play button */}
                    <View className="flex-row justify-center items-center gap-4 mb-6">
                        <TouchableOpacity className="bg-spotify-green w-14 h-14 rounded-full items-center justify-center">
                            <Ionicons name="play" size={28} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="shuffle" size={28} color="#1DB954" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="heart-outline" size={28} color="#B3B3B3" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Songs List */}
                {songs && songs.length > 0 ? (
                    songs.map((song, index) => (
                        <SongCard
                            key={song.id}
                            song={song}
                            index={index}
                            showAlbumArt={false}
                            onPress={() => { }}
                        />
                    ))
                ) : (
                    <EmptyState icon="disc-outline" title="Sin canciones" subtitle="Este álbum no tiene canciones" />
                )}
            </ScrollView>
        </View>
    );
}
