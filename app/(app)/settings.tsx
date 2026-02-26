import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useConfig, useUpdateConfig } from '../../presentation/hooks/useConfig';
import { LoadingScreen } from '../../presentation/components/LoadingScreen';

export default function SettingsScreen() {
    const router = useRouter();
    const { data: config, isLoading } = useConfig();
    const updateConfig = useUpdateConfig();

    if (isLoading) return <LoadingScreen />;

    const toggleSetting = (key: 'autoplay' | 'ajuste' | 'normalizacion') => {
        if (!config) return;
        updateConfig.mutate(
            { [key]: !config[key] },
            {
                onError: () => Alert.alert('Error', 'No se pudo actualizar la configuración'),
            },
        );
    };

    interface SettingRowProps {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
        value: boolean;
        onToggle: () => void;
    }

    const SettingRow = ({ icon, label, value, onToggle }: SettingRowProps) => (
        <View className="flex-row items-center justify-between py-4 px-4 border-b border-spotify-dark-highlight">
            <View className="flex-row items-center flex-1">
                <Ionicons name={icon} size={22} color="#B3B3B3" />
                <Text className="text-white text-base ml-3">{label}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{ false: '#535353', true: '#1DB954' }}
                thumbColor="white"
            />
        </View>
    );

    interface InfoRowProps {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
        value: string;
    }

    const InfoRow = ({ icon, label, value }: InfoRowProps) => (
        <View className="flex-row items-center justify-between py-4 px-4 border-b border-spotify-dark-highlight">
            <View className="flex-row items-center flex-1">
                <Ionicons name={icon} size={22} color="#B3B3B3" />
                <Text className="text-white text-base ml-3">{label}</Text>
            </View>
            <Text className="text-spotify-light-gray text-sm">{value}</Text>
        </View>
    );

    return (
        <View className="flex-1 bg-spotify-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Cabecera */}
                <View className="flex-row items-center pt-14 pb-4 px-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold ml-4">Configuración</Text>
                </View>

                {/* Ajustes de Reproducción */}
                <Text className="text-spotify-light-gray text-sm font-semibold px-4 pt-4 pb-2 uppercase tracking-wider">
                    Reproducción
                </Text>
                <SettingRow
                    icon="play-circle-outline"
                    label="Autoplay"
                    value={config?.autoplay ?? false}
                    onToggle={() => toggleSetting('autoplay')}
                />
                <SettingRow
                    icon="options-outline"
                    label="Ajuste de audio"
                    value={config?.ajuste ?? false}
                    onToggle={() => toggleSetting('ajuste')}
                />
                <SettingRow
                    icon="volume-medium-outline"
                    label="Normalización de volumen"
                    value={config?.normalizacion ?? false}
                    onToggle={() => toggleSetting('normalizacion')}
                />

                {/* Ajustes Generales */}
                <Text className="text-spotify-light-gray text-sm font-semibold px-4 pt-6 pb-2 uppercase tracking-wider">
                    General
                </Text>
                <InfoRow
                    icon="musical-note-outline"
                    label="Calidad de audio"
                    value={config?.calidad?.nombre ?? 'Normal'}
                />
                <InfoRow
                    icon="download-outline"
                    label="Tipo de descarga"
                    value={config?.tipoDescarga?.nombre ?? 'Normal'}
                />
                <InfoRow
                    icon="language-outline"
                    label="Idioma"
                    value={config?.idioma?.nombre ?? 'Español'}
                />
            </ScrollView>
        </View>
    );
}
