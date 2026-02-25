import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../presentation/stores/auth.store';
import { useUser, useUpdateUser } from '../../presentation/hooks/useUser';

export default function ProfileScreen() {
    const router = useRouter();
    const storeUser = useAuthStore((s) => s.user);
    const { data: user, refetch, isRefetching } = useUser();
    const updateUser = useUpdateUser();

    const [username, setUsername] = useState(storeUser?.username ?? '');
    const [email, setEmail] = useState(storeUser?.email ?? '');
    const [genero, setGenero] = useState(storeUser?.genero ?? '');
    const [pais, setPais] = useState(storeUser?.pais ?? '');
    const [codigoPostal, setCodigoPostal] = useState(storeUser?.codigoPostal ?? '');

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setEmail(user.email);
            setGenero(user.genero ?? '');
            setPais(user.pais ?? '');
            setCodigoPostal(user.codigoPostal ?? '');
        }
    }, [user]);

    const handleSave = () => {
        updateUser.mutate(
            { username: username.trim(), email: email.trim(), genero, pais, codigoPostal },
            {
                onSuccess: () => Alert.alert('Éxito', 'Perfil actualizado'),
                onError: () => Alert.alert('Error', 'No se pudo actualizar'),
            },
        );
    };

    interface FieldProps {
        label: string;
        value: string;
        onChangeText: (text: string) => void;
        editable?: boolean;
    }

    const Field = ({ label, value, onChangeText, editable = true }: FieldProps) => (
        <View className="mb-4">
            <Text className="text-spotify-light-gray text-sm font-semibold mb-1 uppercase tracking-wider">
                {label}
            </Text>
            <TextInput
                className={`text-white text-base px-4 py-3 rounded-lg ${editable ? 'bg-spotify-dark-surface' : 'bg-spotify-dark-highlight opacity-60'
                    }`}
                value={value}
                onChangeText={onChangeText}
                editable={editable}
                placeholderTextColor="#535353"
            />
        </View>
    );

    return (
        <View className="flex-1 bg-spotify-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center pt-14 pb-4 px-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold ml-4">Perfil</Text>
                    <View className="flex-1" />
                    <TouchableOpacity onPress={() => refetch()} className="mr-2">
                        <Ionicons
                            name="refresh"
                            size={24}
                            color={isRefetching ? '#1DB954' : '#B3B3B3'}
                        />
                    </TouchableOpacity>
                </View>

                {/* Avatar */}
                <View className="items-center my-6">
                    <View className="w-24 h-24 rounded-full bg-spotify-dark-surface items-center justify-center">
                        <Ionicons name="person" size={48} color="#1DB954" />
                    </View>
                    <Text className="text-white text-xl font-bold mt-3">{storeUser?.username}</Text>
                </View>

                {/* Form */}
                <View className="px-6">
                    <Field label="Usuario" value={username} onChangeText={setUsername} />
                    <Field label="Email" value={email} onChangeText={setEmail} />
                    <Field label="Género" value={genero} onChangeText={setGenero} />
                    <Field label="País" value={pais} onChangeText={setPais} />
                    <Field label="Código Postal" value={codigoPostal} onChangeText={setCodigoPostal} />
                    <Field
                        label="Fecha de nacimiento"
                        value={storeUser?.fechaNacimiento ?? ''}
                        onChangeText={() => { }}
                        editable={false}
                    />

                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={updateUser.isPending}
                        className={`py-4 rounded-full items-center mt-4 mb-8 ${updateUser.isPending ? 'bg-spotify-green-dark opacity-70' : 'bg-spotify-green'
                            }`}
                    >
                        <Text className="text-black text-lg font-bold">
                            {updateUser.isPending ? 'Guardando...' : 'Guardar cambios'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
