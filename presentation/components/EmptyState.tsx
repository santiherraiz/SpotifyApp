import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState = ({
    icon = 'musical-notes-outline',
    title,
    subtitle,
    actionLabel,
    onAction,
}: EmptyStateProps) => {
    return (
        <View className="flex-1 items-center justify-center px-8 py-16">
            <Ionicons name={icon} size={64} color="#535353" />
            <Text className="text-white text-xl font-bold mt-4 text-center">{title}</Text>
            {subtitle && (
                <Text className="text-spotify-light-gray text-sm mt-2 text-center">{subtitle}</Text>
            )}
            {actionLabel && onAction && (
                <TouchableOpacity
                    onPress={onAction}
                    className="bg-spotify-green px-8 py-3 rounded-full mt-6"
                >
                    <Text className="text-black font-bold text-base">{actionLabel}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};
