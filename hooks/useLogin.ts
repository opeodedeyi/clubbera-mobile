import { useState } from 'react';
import { login } from '@/services/login';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { saveAuthToken } from '@/services/token';


export const useLogin = () => {
    const router = useRouter();
    const { setUser } = useUser();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const isEmailValid = (email: string) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password: string) => {
        const passwordRegex = /^.{8,}$/;
        return passwordRegex.test(password);
    };

    const isFormValid = email && password && isEmailValid(email) && isPasswordValid(password);

    const handleLogin = async () => {
        if (isFormValid) {
            setIsLoading(true);
            try {
                const {token, success, message, user} = await login(email, password);

                if (success) {
                    await saveAuthToken(token);
                    setUser(user);
                    router.replace('/')
                } else {
                    setError(message);
                }
            } catch (error) {
                console.error('Login failed:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.log('Form is not valid');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        isFormValid,
        isLoading,
        handleLogin
    };
};