import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'dark' | 'light';

interface ThemeState {
    mode: ThemeMode;
    toggleTheme: () => void;
    loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>()((set, get) => ({
    mode: 'dark',

    toggleTheme: async () => {
        const newMode = get().mode === 'dark' ? 'light' : 'dark';
        set({ mode: newMode });
        await AsyncStorage.setItem('theme_mode', newMode);
    },

    loadTheme: async () => {
        const stored = await AsyncStorage.getItem('theme_mode');
        if (stored === 'light' || stored === 'dark') {
            set({ mode: stored });
        }
    },
}));
