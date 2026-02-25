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
            staleTime: 1000 * 60 * 5, // 5 minutes
        },
    },
});

function RootLayoutInner() {
    const checkAuth = useAuthStore((s) => s.checkAuth);
    const loadTheme = useThemeStore((s) => s.loadTheme);

    useEffect(() => {
        checkAuth();
        loadTheme();
    }, []);

    return (
        <>
            <StatusBar style="light" />
            <Slot />
        </>
    );
}

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <RootLayoutInner />
        </QueryClientProvider>
    );
}
