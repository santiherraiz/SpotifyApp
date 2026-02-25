import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getPlanAction,
    upgradePremiumAction,
    getPaymentsAction,
    getSubscriptionAction,
} from '../../core/actions/plan.actions';
import { useAuthStore } from '../stores/auth.store';

export const usePlan = () => {
    const user = useAuthStore((s) => s.user);
    return useQuery({
        queryKey: ['plan', user?.id],
        queryFn: () => getPlanAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useUpgradePremium = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);
    const setPremium = useAuthStore((s) => s.setPremium);

    return useMutation({
        mutationFn: () => upgradePremiumAction(user!.id),
        onSuccess: () => {
            setPremium(true);
            queryClient.invalidateQueries({ queryKey: ['plan'] });
        },
    });
};

export const usePayments = () => {
    const user = useAuthStore((s) => s.user);
    return useQuery({
        queryKey: ['payments', user?.id],
        queryFn: () => getPaymentsAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useSubscription = (subscriptionId: number) => {
    return useQuery({
        queryKey: ['subscription', subscriptionId],
        queryFn: () => getSubscriptionAction(subscriptionId),
        enabled: !!subscriptionId,
    });
};
