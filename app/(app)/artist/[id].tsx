import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useArtistDetail, useArtistAlbums } from '../../../presentation/hooks/useCatalog';
import { PosterCard } from '../../../presentation/components/PosterCard';
import { LoadingScreen } from '../../../presentation/components/LoadingScreen';
import { EmptyState } from '../../../presentation/components/EmptyState';
import { getImageSource } from '../../../presentation/utils/imageAssets';

export default function ArtistDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const artistaId = Number(id);

    const { data: artist, isLoading: loadingArtist } = useArtistDetail(artistaId);
    const { data: albums, isLoading: loadingAlbums } = useArtistAlbums(artistaId);

    if (loadingArtist || loadingAlbums) return <LoadingScreen />;

    return (
        <View className="flex-1 bg-spotify-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="pt-14 pb-6 px-4">
                    <TouchableOpacity onPress={() => router.back()} className="mb-4">
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>

                    <View className="items-center mb-6">
                        {artist?.imagen ? (
                            <Image
                                source={getImageSource(artist.imagen)}
                                className="w-48 h-48 rounded-full mb-4"
                            />
                        ) : (
                            <View className="w-48 h-48 rounded-full bg-spotify-dark-surface items-center justify-center mb-4">
                                <Ionicons name="person" size={64} color="#FF9800" />
                            </View>
                        )}
                        <Text className="text-white text-3xl font-bold text-center">
                            {artist?.nombre ?? 'Artista'}
                        </Text>
                    </View>

                    <View className="flex-row justify-center items-center gap-4 mb-8">
                        <TouchableOpacity className="bg-spotify-green px-6 py-2 rounded-full">
                            <Text className="text-black font-bold">Seguir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-spotify-green w-14 h-14 rounded-full items-center justify-center">
                            <Ionicons name="play" size={28} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="shuffle" size={28} color="#1DB954" />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text className="text-white text-xl font-bold px-4 mb-4">Álbumes</Text>
                {albums && albums.length > 0 ? (
                    <View className="px-4">
                        {albums.map((album) => (
                            <TouchableOpacity
                                key={album.id}
                                onPress={() => router.push(`/(app)/album/${album.id}`)}
                                className="flex-row items-center py-3"
                            >
                                {album.imagen ? (
                                    <Image source={getImageSource(album.imagen)} className="w-16 h-16 rounded mr-4" />
                                ) : (
                                    <View className="w-16 h-16 rounded bg-spotify-dark-surface items-center justify-center mr-4">
                                        <Ionicons name="disc" size={28} color="#2196F3" />
                                    </View>
                                )}
                                <View className="flex-1">
                                    <Text className="text-white text-base font-medium">{album.titulo}</Text>
                                    <Text className="text-spotify-light-gray text-sm">{album.anyo ?? 'Álbum'}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#535353" />
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <EmptyState icon="disc-outline" title="Sin álbumes" subtitle="Este artista no tiene álbumes" />
                )}
            </ScrollView>
        </View>
    );
}
