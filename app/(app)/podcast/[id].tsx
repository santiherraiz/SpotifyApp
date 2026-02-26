import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePodcastDetail, usePodcastChapters } from '../../../presentation/hooks/useCatalog';
import { LoadingScreen } from '../../../presentation/components/LoadingScreen';
import { EmptyState } from '../../../presentation/components/EmptyState';
import { getImageSource } from '../../../presentation/utils/imageAssets';

const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function PodcastDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const podcastId = Number(id);

    const { data: podcast, isLoading: loadingPodcast } = usePodcastDetail(podcastId);
    const { data: chapters, isLoading: loadingChapters } = usePodcastChapters(podcastId);

    if (loadingPodcast || loadingChapters) return <LoadingScreen />;

    return (
        <View className="flex-1 bg-spotify-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="pt-14 pb-6 px-4">
                    <TouchableOpacity onPress={() => router.back()} className="mb-4">
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>

                    <View className="items-center mb-6">
                        {podcast?.imagen ? (
                            <Image
                                source={getImageSource(podcast.imagen)}
                                className="w-48 h-48 rounded-xl mb-4"
                            />
                        ) : (
                            <View className="w-48 h-48 rounded-xl bg-spotify-dark-surface items-center justify-center mb-4">
                                <Ionicons name="mic" size={64} color="#E91E63" />
                            </View>
                        )}
                        <Text className="text-white text-2xl font-bold text-center">
                            {podcast?.titulo ?? 'Podcast'}
                        </Text>
                        {podcast?.descripcion && (
                            <Text className="text-spotify-light-gray text-sm mt-2 text-center px-4">
                                {podcast.descripcion}
                            </Text>
                        )}
                        {podcast?.anyo && (
                            <Text className="text-spotify-medium-gray text-sm mt-1">{podcast.anyo}</Text>
                        )}
                    </View>

                    <View className="flex-row justify-center items-center gap-4 mb-6">
                        <TouchableOpacity className="bg-spotify-green px-6 py-2 rounded-full">
                            <Text className="text-black font-bold">Seguir</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text className="text-white text-xl font-bold px-4 mb-4">Capítulos</Text>
                {chapters && chapters.length > 0 ? (
                    chapters.map((chapter, index) => (
                        <TouchableOpacity
                            key={chapter.id}
                            className="px-4 py-4 border-b border-spotify-dark-highlight"
                            activeOpacity={0.7}
                        >
                            <Text className="text-white text-base font-medium" numberOfLines={2}>
                                {chapter.titulo}
                            </Text>
                            {chapter.descripcion && (
                                <Text className="text-spotify-light-gray text-sm mt-1" numberOfLines={2}>
                                    {chapter.descripcion}
                                </Text>
                            )}
                            <View className="flex-row items-center mt-2 gap-4">
                                <Text className="text-spotify-medium-gray text-xs">{chapter.fecha}</Text>
                                <Text className="text-spotify-medium-gray text-xs">
                                    {formatDuration(chapter.duracion)}
                                </Text>
                                <Text className="text-spotify-medium-gray text-xs">
                                    {chapter.numeroReproducciones} reproducciones
                                </Text>
                            </View>
                            <View className="flex-row items-center mt-3 gap-4">
                                <TouchableOpacity className="bg-spotify-dark-surface px-4 py-1.5 rounded-full">
                                    <Ionicons name="play" size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <EmptyState icon="mic-outline" title="Sin capítulos" subtitle="Este podcast no tiene capítulos" />
                )}
            </ScrollView>
        </View>
    );
}
