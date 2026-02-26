import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { useAuthStore } from '../../presentation/stores/auth.store';
import { ThemedTextInput } from '../../presentation/components/ThemedTextInput';
import { ThemedButton } from '../../presentation/components/ThemedButton';
import { ThemedLink } from '../../presentation/components/ThemedLink';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const status = useAuthStore((s) => s.status);
    const login = useAuthStore((s) => s.login);

    const isPosting = status === 'checking';

    if (status === 'authenticated') {
        return <Redirect href="/(app)/(tabs)/home" />;
    }

    const onLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor ingresa email y contraseña');
            return;
        }

        const response = await login(email, password);
        if (!response.ok) {
            Alert.alert('Error de autenticación', response.message || 'Credenciales incorrectas');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-spotify-black"
        >
            <View className="flex-1 justify-center px-8">
                <View className="items-center mb-10">
                    <Ionicons name="logo-nodejs" size={80} color="#1DB954" style={{ marginBottom: 20 }} />
                    <Text className="text-white text-3xl font-bold mb-2">Iniciar Sesión</Text>
                    <Text className="text-spotify-light-gray text-center">
                        Ingresa a tu cuenta para seguir escuchando
                    </Text>
                </View>

                <View className="w-full">
                    <ThemedTextInput
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <ThemedTextInput
                        placeholder="Contraseña"
                        secureTextEntry
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <ThemedButton
                        title="Ingresar"
                        onPress={onLogin}
                        loading={isPosting}
                        className="mt-4"
                    />

                    <ThemedLink
                        href="/(auth)/register"
                        text="¿No tienes cuenta?"
                        linkText="Regístrate aquí"
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
