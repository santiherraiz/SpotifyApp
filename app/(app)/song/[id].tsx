import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, Modal, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { LoadingScreen } from '../../../presentation/components/LoadingScreen';
import { spotifyApi } from '../../../core/api/spotifyApi';
import { mapCancion } from '../../../infrastructure/mappers/entity.mapper';
import { Cancion } from '../../../infrastructure/interfaces/app.interfaces';
import { getImageSource } from '../../../presentation/utils/imageAssets';
import { useUserPlaylists, useAddSongToPlaylistGeneric } from '../../../presentation/hooks/usePlaylists';

const { width } = Dimensions.get('window');

const getSongAction = async (id: number): Promise<Cancion> => {
    const { data } = await spotifyApi.get(`/canciones/${id}`);
    return mapCancion(data);
};

export default function SongPlayerScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { data: song, isLoading } = useQuery({
        queryKey: ['song', id],
        queryFn: () => getSongAction(Number(id)),
    });

    const [modalVisible, setModalVisible] = useState(false);
    const { data: myPlaylists } = useUserPlaylists();
    const addSongMutation = useAddSongToPlaylistGeneric();



    if (isLoading) return <LoadingScreen />;

    if (!song) {
        return (
            <SafeAreaView className="flex-1 bg-spotify-black justify-center items-center">
                <Text className="text-white text-lg">No se pudo cargar la canción</Text>
                <TouchableOpacity onPress={() => router.back()} className="mt-4 p-2" hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    <Text className="text-spotify-green tracking-wider uppercase font-bold text-sm">Volver</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView className="flex-1 bg-spotify-black">
            <View className="flex-row items-center justify-between px-4 pt-6 pb-2">
                <TouchableOpacity onPress={() => router.back()} className="p-2" hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    <Ionicons name="chevron-down" size={32} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-xs font-bold uppercase tracking-wider">
                    {song.album?.titulo ?? 'Reproduciendo'}
                </Text>
                <TouchableOpacity className="p-2" hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View className="flex-1 justify-center items-center px-6 mt-4">
                <Image
                    source={song.album?.imagen ? getImageSource(song.album.imagen) : require('../../../assets/images/albumes/imagen1.jpeg')}
                    style={{ width: width - 48, height: width - 48, borderRadius: 8 }}
                    resizeMode="cover"
                />
            </View>

            <View className="px-6 pb-12 pt-8">
                <View className="flex-row items-center justify-between mb-6">
                    <View className="flex-1">
                        <Text className="text-white text-2xl font-bold" numberOfLines={1}>
                            {song.titulo}
                        </Text>
                        <Text className="text-spotify-light-gray text-lg mt-1" numberOfLines={1}>
                            {song.album?.artista?.nombre ?? 'Artista desconocido'}
                        </Text>
                    </View>
                    <View className="flex-row gap-4">
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <Ionicons name="add-circle-outline" size={28} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="heart-outline" size={28} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mb-6">
                    <View className="h-1 bg-spotify-dark-highlight rounded-full w-full mb-2">
                        <View className="h-1 bg-white rounded-full w-0" />
                    </View>
                    <View className="flex-row justify-between">
                        <Text className="text-spotify-light-gray text-xs">0:00</Text>
                        <Text className="text-spotify-light-gray text-xs">{formatDuration(song.duracion)}</Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-between">
                    <TouchableOpacity>
                        <Ionicons name="shuffle" size={28} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-back" size={36} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="w-16 h-16 bg-white rounded-full items-center justify-center">
                        <Ionicons name="play" size={36} color="black" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="play-skip-forward" size={36} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="repeat" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-end bg-black/60">
                    <View className="bg-spotify-dark-surface rounded-t-3xl p-6 h-2/3">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-white text-xl font-bold">Añadir a playlist</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={28} color="white" />
                            </TouchableOpacity>
                        </View>

                        {(!myPlaylists || myPlaylists.length === 0) ? (
                            <View className="flex-1 justify-center items-center">
                                <Ionicons name="musical-notes-outline" size={48} color="#535353" />
                                <Text className="text-spotify-light-gray mt-4 text-center">
                                    Aún no tienes playlists. Crea una desde la pestaña "Añadir".
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                data={myPlaylists}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View className="flex-row items-center py-3 border-b border-spotify-black">
                                        <Image
                                            source={getImageSource(item.imagen)}
                                            className="w-12 h-12 rounded mr-4"
                                        />
                                        <View className="flex-1">
                                            <Text className="text-white text-base font-medium">{item.titulo}</Text>
                                            <Text className="text-spotify-light-gray text-sm">
                                                {item.numeroCanciones ?? 0} canciones
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            className="bg-spotify-green px-4 py-2 rounded-full"
                                            disabled={addSongMutation.isPending}
                                            onPress={() => {
                                                addSongMutation.mutate(
                                                    { playlistId: item.id, cancionId: Number(id) },
                                                    {
                                                        onSuccess: () => {
                                                            setModalVisible(false);
                                                            Alert.alert('¡Añadida!', `Canción añadida a ${item.titulo}`);
                                                        },
                                                        onError: () => {
                                                            Alert.alert('Error', 'No se pudo añadir la canción a la playlist');
                                                        }
                                                    }
                                                );
                                            }}
                                        >
                                            <Text className="text-black font-bold text-sm">
                                                {addSongMutation.isPending && addSongMutation.variables?.playlistId === item.id ? '...' : 'Añadir'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
