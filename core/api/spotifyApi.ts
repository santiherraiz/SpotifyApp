import axios from 'axios';
import { SecureStorageAdapter } from '../../infrastructure/storage/secureStorage';

const API_BASE_URL = 'http://10.0.2.2:8082';

export const spotifyApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

spotifyApi.interceptors.request.use(
    async (config) => {
        const token = await SecureStorageAdapter.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

spotifyApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            await SecureStorageAdapter.removeItem('auth_token');
            const { useAuthStore } = require('../../presentation/stores/auth.store');
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    },
);

export const setApiBaseUrl = (url: string) => {
    spotifyApi.defaults.baseURL = url;
};
