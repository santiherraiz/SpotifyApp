import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { Drawer } from 'react-native-drawer-layout';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../presentation/stores/auth.store';
import { MiniPlayer } from '../../presentation/components/MiniPlayer';

function DrawerContent() {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const isPremium = useAuthStore((s) => s.isPremium);
    const logout = useAuthStore((s) => s.logout);

    const menuItems = [
        { icon: 'person-outline' as const, label: 'Perfil', route: '/(app)/profile' },
        { icon: 'settings-outline' as const, label: 'Configuración', route: '/(app)/settings' },
        ...(isPremium
            ? [{ icon: 'star-outline' as const, label: 'Suscripciones', route: '/(app)/subscriptions' }]
            : []),
    ];

    return (
        <View className="flex-1 bg-spotify-dark-elevated pt-14 px-6">
            {/* User Info */}
            <View className="items-center mb-8 pb-6 border-b border-spotify-dark-highlight">
                <View className="w-20 h-20 rounded-full bg-spotify-dark-surface items-center justify-center mb-3">
                    <Ionicons name="person" size={40} color="#1DB954" />
                </View>
                <Text className="text-white text-xl font-bold">{user?.username ?? 'Usuario'}</Text>
                <Text className="text-spotify-light-gray text-sm mt-1">{user?.email ?? ''}</Text>
                {isPremium && (
                    <View className="bg-spotify-green px-3 py-1 rounded-full mt-2">
                        <Text className="text-black text-xs font-bold">PREMIUM</Text>
                    </View>
                )}
            </View>

            {/* Menu Items */}
            {menuItems.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => router.push(item.route as any)}
                    className="flex-row items-center py-4"
                    activeOpacity={0.7}
                >
                    <Ionicons name={item.icon} size={24} color="#B3B3B3" />
                    <Text className="text-white text-lg ml-4">{item.label}</Text>
                </TouchableOpacity>
            ))}

            {/* Logout */}
            <View className="flex-1" />
            <TouchableOpacity
                onPress={async () => {
                    await logout();
                    router.replace('/(auth)/login');
                }}
                className="flex-row items-center py-4 mb-8 border-t border-spotify-dark-highlight pt-6"
                activeOpacity={0.7}
            >
                <Ionicons name="log-out-outline" size={24} color="#E74C3C" />
                <Text className="text-red-400 text-lg ml-4">Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function AppLayout() {
    const [open, setOpen] = useState(false);

    return (
        <Drawer
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            drawerType="front"
            drawerPosition="left"
            drawerStyle={{ width: 300 }}
            renderDrawerContent={() => <DrawerContent />}
        >
            <View className="flex-1 bg-spotify-black">
                <Slot />
                <MiniPlayer />
            </View>
        </Drawer>
    );
}

