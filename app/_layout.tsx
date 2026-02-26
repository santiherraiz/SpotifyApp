import React, { useEffect } from 'react';
import { Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '../presentation/stores/auth.store';
import { useThemeStore } from '../presentation/stores/theme.store';
import '../global.css';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 60 * 24,
        },
    },
});

function RootLayoutInner() {
    const checkStatus = useAuthStore((s) => s.checkStatus);
    const loadTheme = useThemeStore((s) => s.loadTheme);

    useEffect(() => {
        checkStatus();
        loadTheme();
    }, []);

    return (
        <>
            <StatusBar style="light" />
            <Slot />
        </>
    );
}

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
                <RootLayoutInner />
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}
