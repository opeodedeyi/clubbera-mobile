import React, { createContext, useContext, useState } from 'react';


type UserContextType = {
    user: any;
    setUser: React.Dispatch<any>;
};

const UserContext = createContext<UserContextType | null>(null);

interface UserProviderProps {
    children: React.ReactNode;
    initialUser?: any;  // The type here should match the expected user object type
}

export const UserProvider: React.FC<UserProviderProps> = ({ children, initialUser=null }) => {
    const [user, setUser] = useState(initialUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
