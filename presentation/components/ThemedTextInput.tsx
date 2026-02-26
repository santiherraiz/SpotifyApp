import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

interface ThemedTextInputProps extends TextInputProps {
    error?: string;
}

export const ThemedTextInput = forwardRef<TextInput, ThemedTextInputProps>(
    ({ error, className = '', ...props }, ref) => {
        return (
            <View className={`w-full mb-4 ${className}`}>
                <TextInput
                    ref={ref}
                    className={`bg-spotify-dark-surface text-white px-4 py-4 rounded-md border text-base ${error ? 'border-red-500' : 'border-transparent focus:border-spotify-green'
                        }`}
                    placeholderTextColor="#B3B3B3"
                    {...props}
                />
                {error ? (
                    <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>
                ) : null}
            </View>
        );
    }
);
