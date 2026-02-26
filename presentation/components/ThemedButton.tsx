import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';

interface ThemedButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    disabled?: boolean;
}

export const ThemedButton = ({ title, loading, disabled, className = '', ...props }: ThemedButtonProps) => {
    return (
        <TouchableOpacity
            className={`w-full py-4 rounded-full items-center justify-center mb-4 ${disabled || loading ? 'bg-spotify-green/50' : 'bg-spotify-green'
                } ${className}`}
            activeOpacity={0.8}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color="#000" />
            ) : (
                <Text className="text-black font-bold text-lg">{title}</Text>
            )}
        </TouchableOpacity>
    );
};
