import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../presentation/stores/auth.store';
import { usePlan, usePayments, useUpgradePremium } from '../../presentation/hooks/usePlans';
import { LoadingScreen } from '../../presentation/components/LoadingScreen';
import { EmptyState } from '../../presentation/components/EmptyState';

export default function SubscriptionsScreen() {
    const router = useRouter();
    const isPremium = useAuthStore((s) => s.isPremium);
    const { data: plan, isLoading: loadingPlan } = usePlan();
    const { data: payments, isLoading: loadingPayments } = usePayments();
    const upgradePremium = useUpgradePremium();

    if (loadingPlan || loadingPayments) return <LoadingScreen />;

    // If not premium, show upgrade option (though drawer should gate this)
    if (!isPremium) {
        return (
            <View className="flex-1 bg-spotify-black">
                <View className="flex-row items-center pt-14 pb-4 px-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold ml-4">Suscripciones</Text>
                </View>
                <EmptyState
                    icon="star-outline"
                    title="No eres Premium"
                    subtitle="Actualiza a Premium para acceder a funciones exclusivas"
                    actionLabel="Hacerse Premium"
                    onAction={() =>
                        upgradePremium.mutate(undefined, {
                            onSuccess: () => Alert.alert('¡Éxito!', 'Bienvenido a Premium'),
                            onError: () => Alert.alert('Error', 'No se pudo procesar'),
                        })
                    }
                />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-spotify-black">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center pt-14 pb-4 px-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={28} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold ml-4">Suscripciones</Text>
                </View>

                {/* Current Plan */}
                <View className="mx-4 p-5 rounded-2xl bg-spotify-dark-elevated border border-spotify-green mb-6">
                    <View className="flex-row items-center mb-3">
                        <Ionicons name="star" size={24} color="#1DB954" />
                        <Text className="text-spotify-green text-lg font-bold ml-2">Premium Activo</Text>
                    </View>
                    {plan?.fecha_renovacion && (
                        <Text className="text-spotify-light-gray text-sm">
                            Próxima renovación: {plan.fecha_renovacion}
                        </Text>
                    )}
                </View>

                {/* Payment History */}
                <Text className="text-white text-lg font-bold px-4 mb-3">Historial de pagos</Text>
                {payments && payments.length > 0 ? (
                    payments.map((payment: any, index: number) => (
                        <View
                            key={index}
                            className="flex-row items-center px-4 py-3 border-b border-spotify-dark-highlight"
                        >
                            <Ionicons name="receipt-outline" size={20} color="#B3B3B3" />
                            <View className="flex-1 ml-3">
                                <Text className="text-white text-base">
                                    Pago #{index + 1}
                                </Text>
                                <Text className="text-spotify-light-gray text-sm">
                                    {payment.fecha ?? 'Sin fecha'}
                                </Text>
                            </View>
                            <Text className="text-spotify-green text-base font-bold">
                                {payment.monto ?? 'N/A'}€
                            </Text>
                        </View>
                    ))
                ) : (
                    <View className="px-4 py-8 items-center">
                        <Text className="text-spotify-light-gray text-base">Sin pagos registrados</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
