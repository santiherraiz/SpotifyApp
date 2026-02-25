import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCreatePlaylist } from '../../../presentation/hooks/usePlaylists';

export default function AddScreen() {
    const [titulo, setTitulo] = useState('');
    const createPlaylist = useCreatePlaylist();

    const handleCreate = () => {
        if (!titulo.trim()) {
            Alert.alert('Error', 'Introduce un nombre para la playlist');
            return;
        }

        createPlaylist.mutate(titulo.trim(), {
            onSuccess: () => {
                Alert.alert('¡Éxito!', 'Playlist creada correctamente');
                setTitulo('');
            },
            onError: () => {
                Alert.alert('Error', 'No se pudo crear la playlist');
            },
        });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-spotify-black"
        >
            <View className="flex-1 justify-center px-8">
                {/* Header */}
                <View className="items-center mb-10">
                    <View className="w-24 h-24 rounded-2xl bg-spotify-dark-surface items-center justify-center mb-4">
                        <Ionicons name="add" size={48} color="#1DB954" />
                    </View>
                    <Text className="text-white text-2xl font-bold">Nueva Playlist</Text>
                    <Text className="text-spotify-light-gray text-base mt-2 text-center">
                        Dale un nombre a tu nueva playlist
                    </Text>
                </View>

                {/* Input */}
                <View className="mb-8">
                    <TextInput
                        className="bg-spotify-dark-surface text-white text-lg px-5 py-4 rounded-xl text-center"
                        placeholder="Mi playlist favorita"
                        placeholderTextColor="#535353"
                        value={titulo}
                        onChangeText={setTitulo}
                        maxLength={50}
                        autoFocus
                    />
                    <Text className="text-spotify-medium-gray text-xs text-right mt-2">
                        {titulo.length}/50
                    </Text>
                </View>

                {/* Create Button */}
                <TouchableOpacity
                    onPress={handleCreate}
                    disabled={createPlaylist.isPending || !titulo.trim()}
                    className={`py-4 rounded-full items-center ${!titulo.trim() || createPlaylist.isPending
                            ? 'bg-spotify-dark-surface'
                            : 'bg-spotify-green'
                        }`}
                >
                    <Text
                        className={`text-lg font-bold ${!titulo.trim() ? 'text-spotify-medium-gray' : 'text-black'
                            }`}
                    >
                        {createPlaylist.isPending ? 'Creando...' : 'Crear playlist'}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
