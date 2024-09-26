import { useUser } from '@/context/UserContext';

export const useAuthStatus = () => {
    const { user } = useUser();
    return { isAuthenticated: Boolean(user) };
};
