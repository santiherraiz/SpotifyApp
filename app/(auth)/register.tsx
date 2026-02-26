import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useRegister } from '../../presentation/hooks/useAuth';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const registerMutation = useRegister();

    const handleRegister = () => {
        if (!username.trim() || !email.trim() || !password || !fechaNacimiento.trim()) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        let formattedDate = fechaNacimiento.trim();
        const dateParts = formattedDate.split(/[-/]/);
        if (dateParts.length === 3 && dateParts[0].length <= 2) {
            formattedDate = `${dateParts[2]}-${dateParts[1].padStart(2, '0')}-${dateParts[0].padStart(2, '0')}`;
        }

        registerMutation.mutate(
            { username: username.trim(), email: email.trim(), password, fechaNacimiento: formattedDate },
            {
                onSuccess: () => {
                    Alert.alert('¡Éxito!', 'Cuenta creada correctamente', [
                        { text: 'Ir a Login', onPress: () => router.replace('/(auth)/login') },
                    ]);
                },
                onError: (error: any) => {
                    console.log('Register Error:', error.response?.data || error.message);
                    const detail = error.response?.data?.detail || error.response?.data?.message || '';
                    Alert.alert('Error', `No se pudo crear la cuenta. ${detail}`);
                },
            },
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-spotify-black"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="px-8">
                    {/* Cabecera */}
                    <View className="items-center mb-10">
                        <Ionicons name="musical-notes" size={56} color="#1DB954" />
                        <Text className="text-white text-3xl font-bold mt-3">Crear cuenta</Text>
                        <Text className="text-spotify-light-gray text-base mt-1">
                            Únete a Spotify gratis
                        </Text>
                    </View>

                    {/* Nombre de Usuario */}
                    <View className="mb-4">
                        <Text className="text-spotify-light-gray text-sm font-semibold mb-2 uppercase tracking-wider">
                            Usuario
                        </Text>
                        <TextInput
                            className="bg-spotify-dark-surface text-white text-base px-4 py-3.5 rounded-lg"
                            placeholder="Nombre de usuario"
                            placeholderTextColor="#535353"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Email */}
                    <View className="mb-4">
                        <Text className="text-spotify-light-gray text-sm font-semibold mb-2 uppercase tracking-wider">
                            Email
                        </Text>
                        <TextInput
                            className="bg-spotify-dark-surface text-white text-base px-4 py-3.5 rounded-lg"
                            placeholder="tu@email.com"
                            placeholderTextColor="#535353"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    {/* Fecha Nacimiento */}
                    <View className="mb-4">
                        <Text className="text-spotify-light-gray text-sm font-semibold mb-2 uppercase tracking-wider">
                            Fecha de nacimiento
                        </Text>
                        <TextInput
                            className="bg-spotify-dark-surface text-white text-base px-4 py-3.5 rounded-lg"
                            placeholder="AAAA-MM-DD"
                            placeholderTextColor="#535353"
                            value={fechaNacimiento}
                            onChangeText={setFechaNacimiento}
                        />
                    </View>

                    {/* Contraseña */}
                    <View className="mb-4">
                        <Text className="text-spotify-light-gray text-sm font-semibold mb-2 uppercase tracking-wider">
                            Contraseña
                        </Text>
                        <View className="flex-row items-center bg-spotify-dark-surface rounded-lg">
                            <TextInput
                                className="flex-1 text-white text-base px-4 py-3.5"
                                placeholder="Mínimo 6 caracteres"
                                placeholderTextColor="#535353"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                className="px-4"
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#B3B3B3"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirmar Contraseña */}
                    <View className="mb-8">
                        <Text className="text-spotify-light-gray text-sm font-semibold mb-2 uppercase tracking-wider">
                            Confirmar contraseña
                        </Text>
                        <TextInput
                            className="bg-spotify-dark-surface text-white text-base px-4 py-3.5 rounded-lg"
                            placeholder="Repite la contraseña"
                            placeholderTextColor="#535353"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                        />
                    </View>

                    {/* Botón de Registro */}
                    <TouchableOpacity
                        onPress={handleRegister}
                        disabled={registerMutation.isPending}
                        className={`py-4 rounded-full items-center ${registerMutation.isPending ? 'bg-spotify-green-dark opacity-70' : 'bg-spotify-green'
                            }`}
                    >
                        <Text className="text-black text-lg font-bold">
                            {registerMutation.isPending ? 'Creando cuenta...' : 'Registrarse'}
                        </Text>
                    </TouchableOpacity>

                    {/* Enlace a Inicio de Sesión */}
                    <View className="flex-row justify-center mt-6 mb-8">
                        <Text className="text-spotify-light-gray text-base">
                            ¿Ya tienes cuenta?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text className="text-spotify-green text-base font-bold underline">
                                Inicia sesión
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
