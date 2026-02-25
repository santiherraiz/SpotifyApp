import React from 'react';
import { View, Text, FlatList } from 'react-native';

interface HorizontalListProps<T> {
    title: string;
    data: T[];
    renderItem: (item: T, index: number) => React.ReactElement;
    keyExtractor: (item: T) => string;
}

export function HorizontalList<T>({
    title,
    data,
    renderItem,
    keyExtractor,
}: HorizontalListProps<T>) {
    if (!data || data.length === 0) return null;

    return (
        <View className="mb-6">
            <Text className="text-white text-xl font-bold px-4 mb-3">{title}</Text>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={({ item, index }) => renderItem(item, index)}
                keyExtractor={keyExtractor}
            />
        </View>
    );
}
