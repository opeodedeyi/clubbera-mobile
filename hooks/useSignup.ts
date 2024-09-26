import { useState } from 'react';
import { createUser } from '@/services/createUser';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'expo-router';
import { saveAuthToken } from '@/services/token';


export const useSignup = () => {
    const router = useRouter();
    const { setUser } = useUser();
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const isFullNameValid = (fullName: string) => {
        const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
        return fullNameRegex.test(fullName);
    }
    
    const isEmailValid = (email: string) => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = (password: string) => {
        const passwordRegex = /^.{8,}$/;
        return passwordRegex.test(password);
    };

    const isFormValid = fullName && email && password && isFullNameValid(fullName) && isEmailValid(email) && isPasswordValid(password);

    const handleSignup = async () => {
        if (isFormValid) {
            setIsLoading(true);
            try {
                const {token, success, message, user} = await createUser(fullName, email, password);

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
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        isFormValid,
        isLoading,
        handleSignup
    };
};