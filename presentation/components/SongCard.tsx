import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Cancion } from '../../infrastructure/interfaces/app.interfaces';

import { getImageSource } from '../utils/imageAssets';

interface SongCardProps {
    song: Cancion;
    index?: number;
    onPress?: () => void;
    showAlbumArt?: boolean;
}

const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

import { useRouter } from 'expo-router';

export const SongCard = ({ song, index, onPress, showAlbumArt = true }: SongCardProps) => {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.push(`/(app)/song/${song.id}`);
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            className="flex-row items-center py-3 px-4"
            activeOpacity={0.7}
        >
            {index !== undefined && (
                <Text className="text-spotify-light-gray text-base w-8">{index + 1}</Text>
            )}
            {showAlbumArt && song.album?.imagen && (
                <Image
                    source={getImageSource(song.album.imagen)}
                    className="w-12 h-12 rounded mr-3"
                />
            )}
            <View className="flex-1">
                <Text className="text-white text-base" numberOfLines={1}>
                    {song.titulo}
                </Text>
                <Text className="text-spotify-light-gray text-sm" numberOfLines={1}>
                    {song.album?.artista?.nombre ?? 'Artista desconocido'}
                </Text>
            </View>
            <Text className="text-spotify-light-gray text-sm mr-3">
                {formatDuration(song.duracion)}
            </Text>
            <Ionicons name="ellipsis-vertical" size={18} color="#B3B3B3" />
        </TouchableOpacity>
    );
};
