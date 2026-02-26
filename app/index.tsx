import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../presentation/stores/auth.store';
import { LoadingScreen } from '../presentation/components/LoadingScreen';

export default function Index() {
    const status = useAuthStore((s) => s.status);

    if (status === 'checking') {
        return <LoadingScreen message="Validando sesión..." />;
    }

    if (status === 'authenticated') {
        return <Redirect href="/(app)/(tabs)/home" />;
    }

    return <Redirect href="/(auth)/login" />;
}

