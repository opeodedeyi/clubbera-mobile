import { apiRequest } from './api';

export const login = async (email: string, password: string): Promise<any> => {
    const { success, data, error } = await apiRequest('/user/login', 'POST', { email, password });
    
    if (success) {
        return data;
    } else {
        throw new Error(error);
    }
};