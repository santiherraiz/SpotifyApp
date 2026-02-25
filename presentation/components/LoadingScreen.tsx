import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingScreenProps {
    message?: string;
}

export const LoadingScreen = ({ message = 'Cargando...' }: LoadingScreenProps) => {
    return (
        <View className="flex-1 bg-spotify-black items-center justify-center">
            <ActivityIndicator size="large" color="#1DB954" />
            <Text className="text-spotify-light-gray mt-4 text-base">{message}</Text>
        </View>
    );
};
