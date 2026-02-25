import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getConfigAction, updateConfigAction } from '../../core/actions/user.actions';
import { useAuthStore } from '../stores/auth.store';
import { Configuracion } from '../../infrastructure/interfaces/app.interfaces';

export const useConfig = () => {
    const user = useAuthStore((s) => s.user);

    return useQuery({
        queryKey: ['config', user?.id],
        queryFn: () => getConfigAction(user!.id),
        enabled: !!user?.id,
    });
};

export const useUpdateConfig = () => {
    const queryClient = useQueryClient();
    const user = useAuthStore((s) => s.user);

    return useMutation({
        mutationFn: (config: Partial<Configuracion>) =>
            updateConfigAction(user!.id, config),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['config', user?.id] });
        },
    });
};
