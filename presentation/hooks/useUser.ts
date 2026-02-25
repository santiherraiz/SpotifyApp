import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserAction, updateUserAction } from '../../core/actions/user.actions';
import { useAuthStore } from '../stores/auth.store';

export const useUser = (userId?: number) => {
    const storeUser = useAuthStore((s) => s.user);
    const id = userId ?? storeUser?.id;

    return useQuery({
        queryKey: ['user', id],
        queryFn: () => getUserAction(id!),
        enabled: !!id,
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const storeUser = useAuthStore((s) => s.user);
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: (data: Parameters<typeof updateUserAction>[1]) =>
            updateUserAction(storeUser!.id, data),
        onSuccess: (updatedUser) => {
            setUser(updatedUser);
            queryClient.invalidateQueries({ queryKey: ['user', storeUser?.id] });
        },
    });
};
