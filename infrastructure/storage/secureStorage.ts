import * as SecureStore from 'expo-secure-store';

export class SecureStorageAdapter {
    static async setItem(key: string, value: string): Promise<void> {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error(`Error saving ${key} to SecureStore`, error);
            throw new Error(`Failed to save ${key}`);
        }
    }

    static async getItem(key: string): Promise<string | null> {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.error(`Error getting ${key} from SecureStore`, error);
            return null;
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error(`Error removing ${key} from SecureStore`, error);
            throw new Error(`Failed to remove ${key}`);
        }
    }
}
