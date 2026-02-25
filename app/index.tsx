import React from 'react';
import { Redirect } from 'expo-router';
import { useAuthStore } from '../presentation/stores/auth.store';
import { LoadingScreen } from '../presentation/components/LoadingScreen';

export default function Index() {
    // Saltamos la verificación y vamos directo a la app
    return <Redirect href="/(app)/(tabs)/home" />;
}

