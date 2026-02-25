import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const MiniPlayer = () => {
    return (
        <View className="bg-spotify-dark-card border-t border-spotify-dark-highlight">
            <View className="flex-row items-center px-4 py-2">
                {/* Album Art */}
                <View className="w-10 h-10 rounded bg-spotify-dark-surface items-center justify-center mr-3">
                    <Ionicons name="musical-note" size={20} color="#1DB954" />
                </View>

                {/* Track Info */}
                <View className="flex-1">
                    <Text className="text-white text-sm font-medium" numberOfLines={1}>
                        Sin reproducción
                    </Text>
                    <Text className="text-spotify-light-gray text-xs" numberOfLines={1}>
                        Selecciona una canción
                    </Text>
                </View>

                {/* Controls (UI only) */}
                <TouchableOpacity className="mx-2" activeOpacity={0.7}>
                    <Ionicons name="heart-outline" size={22} color="#B3B3B3" />
                </TouchableOpacity>
                <TouchableOpacity className="mx-2" activeOpacity={0.7}>
                    <Ionicons name="play" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Progress bar placeholder */}
            <View className="h-0.5 bg-spotify-dark-highlight mx-4">
                <View className="h-0.5 bg-spotify-green w-1/3" />
            </View>
        </View>
    );
};
