import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getImageSource } from '../utils/imageAssets';

interface PosterCardProps {
    title: string;
    subtitle?: string;
    imageUrl?: any;
    onPress?: () => void;
    size?: 'small' | 'medium' | 'large';
    rounded?: boolean;
}

const sizeMap = {
    small: 'w-32 h-32',
    medium: 'w-40 h-40',
    large: 'w-48 h-48',
};

export const PosterCard = ({
    title,
    subtitle,
    imageUrl,
    onPress,
    size = 'medium',
    rounded = false,
}: PosterCardProps) => {
    const source = getImageSource(imageUrl);

    return (
        <TouchableOpacity onPress={onPress} className="mr-4" activeOpacity={0.7}>
            {source ? (
                <Image
                    source={source}
                    className={`${sizeMap[size]} ${rounded ? 'rounded-full' : 'rounded-lg'}`}
                />
            ) : (
                <View
                    className={`${sizeMap[size]} ${rounded ? 'rounded-full' : 'rounded-lg'} bg-spotify-dark-surface items-center justify-center`}
                >
                    <Ionicons
                        name={rounded ? 'person' : (title.toLowerCase().includes('podcast') ? 'mic' : 'disc')}
                        size={40}
                        color={rounded ? '#FF9800' : (title.toLowerCase().includes('podcast') ? '#E91E63' : '#2196F3')}
                    />
                </View>
            )}
            <Text className="text-white text-sm font-medium mt-2 w-40" numberOfLines={1}>
                {title}
            </Text>
            {subtitle && (
                <Text className="text-spotify-light-gray text-xs mt-0.5 w-40" numberOfLines={1}>
                    {subtitle}
                </Text>
            )}
        </TouchableOpacity>
    );
};
