import { apiRequest } from './api';

export const getLoggedInUser = async (): Promise<any> => {
    const { success, data, error } = await apiRequest('/user/auth/me', 'GET');
    
    if (success) {
        return data;
    } else {
        throw new Error(error);
    }
};
