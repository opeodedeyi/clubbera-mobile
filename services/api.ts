import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const DEFAULT_TIMEOUT = 10000;

interface ApiResponse {
    success: boolean;
    data?: any;
    error?: string;
};

export const apiRequest = async (endpoint: string, method: string, body?: object, timeout: number = DEFAULT_TIMEOUT): Promise<ApiResponse> => {
    const token = await SecureStore.getItemAsync('userToken');

    const fetchPromise = fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `${token}` } : {})
        },
        body: body ? JSON.stringify(body) : undefined
    }) as Promise<Response>;

    const timeoutPromise = new Promise<Response>((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout'));
        }, timeout);
    });

    try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        }
        
        return { success: false, error: data.message };
    } catch (error) {
        if (error instanceof TypeError && error.message.includes('Network request failed')) {
            return { success: false, error: 'Network request failed. Please check your internet connection.' };
        }
        return { success: false, error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
};
