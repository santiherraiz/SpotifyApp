import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth.store';
import { registerAction } from '../../core/actions/auth.actions';

export const useLogin = () => {
    const login = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: ({ username, password }: { username: string; password: string }) =>
            login(username, password),
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: ({
            username,
            email,
            password,
            fechaNacimiento,
        }: {
            username: string;
            email: string;
            password: string;
            fechaNacimiento: string;
        }) => registerAction({ username, email, password, fechaNacimiento }),
    });
};
