import { apiRequest } from './api';

export const createUser = async (fullName:string, email: string, password: string): Promise<any> => {
    const { success, data, error } = await apiRequest('/user/signup', 'POST', { fullName, email, password });
    
    if (success) {
        console.log('====================================');
        console.log('User created successfully - ', data);
        console.log('====================================');
        return data;
    } else {
        console.log('User not created - ', data);
        throw new Error(error);
    }
};