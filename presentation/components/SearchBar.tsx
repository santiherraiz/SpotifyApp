import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
    minChars?: number;
    delay?: number;
}

export const SearchBar = ({
    placeholder = 'Buscar canciones, artistas...',
    onSearch,
    minChars = 3,
    delay = 400,
}: SearchBarProps) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (query.length >= minChars) {
            const timer = setTimeout(() => onSearch(query), delay);
            return () => clearTimeout(timer);
        } else if (query.length === 0) {
            onSearch('');
        }
    }, [query]);

    return (
        <View className="flex-row items-center bg-spotify-dark-surface rounded-lg mx-4 px-3 py-2">
            <Ionicons name="search" size={20} color="#B3B3B3" />
            <TextInput
                className="flex-1 text-white text-base ml-2 py-1"
                placeholder={placeholder}
                placeholderTextColor="#B3B3B3"
                value={query}
                onChangeText={setQuery}
                autoCapitalize="none"
                autoCorrect={false}
            />
            {query.length > 0 && (
                <Ionicons
                    name="close-circle"
                    size={20}
                    color="#B3B3B3"
                    onPress={() => setQuery('')}
                />
            )}
        </View>
    );
};
