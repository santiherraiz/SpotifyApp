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
import { useLogin } from '../../presentation/hooks/useAuth';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const loginMutation = useLogin();

    const handleLogin = () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Error', 'Por favor, introduce usuario y contraseña');
            return;
        }

        loginMutation.mutate(
            { username: username.trim(), password },
            {
                onSuccess: (success) => {
                    if (success) {
                        router.replace('/(app)/(tabs)/home');
                    } else {
                        Alert.alert('Error', 'Credenciales incorrectas');
                    }
                },
                onError: () => {
                    Alert.alert('Error', 'No se pudo conectar con el servidor');
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
                    {/* Logo */}
                    <View className="items-center mb-12">
                        <Ionicons name="musical-notes" size={72} color="#1DB954" />
                        <Text className="text-white text-4xl font-bold mt-4">Spotify</Text>
                        <Text className="text-spotify-light-gray text-base mt-2">
                            Millones de canciones gratis
                        </Text>
                    </View>

                    {/* Form */}
                    <View className="mb-6">
                        <Text className="text-spotify-light-gray text-sm font-semibold mb-2 uppercase tracking-wider">
                            Usuario
                        </Text>
                        <TextInput
                            className="bg-spotify-dark-surface text-white text-base px-4 py-4 rounded-lg"
                            placeholder="Tu nombre de usuario"
                            placeholderTextColor="#535353"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View className="mb-8">
                        <Text className="text-spotify-light-gray text-sm font-semibold mb-2 uppercase tracking-wider">
                            Contraseña
                        </Text>
                        <View className="flex-row items-center bg-spotify-dark-surface rounded-lg">
                            <TextInput
                                className="flex-1 text-white text-base px-4 py-4"
                                placeholder="Tu contraseña"
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

                    {/* Login Button */}
                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loginMutation.isPending}
                        className={`py-4 rounded-full items-center ${loginMutation.isPending ? 'bg-spotify-green-dark opacity-70' : 'bg-spotify-green'
                            }`}
                    >
                        <Text className="text-black text-lg font-bold">
                            {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </Text>
                    </TouchableOpacity>

                    {/* Register Link */}
                    <View className="flex-row justify-center mt-8">
                        <Text className="text-spotify-light-gray text-base">
                            ¿No tienes cuenta?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                            <Text className="text-spotify-green text-base font-bold underline">
                                Regístrate
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
