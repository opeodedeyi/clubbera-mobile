import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { deleteToken } from '@/services/token';
import { SplashScreen, Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { UserProvider } from '@/context/UserContext';
import { getLoggedInUser } from '@/services/getUser';
import LoggedOutHeader from '../Components/Header/LoggedOutHeader';
import LoggedInHeader from '@/Components/Header/LoggedInHeader';
import AuthHeader from '@/Components/Header/AuthHeader';
import BackHeader from '@/Components/Header/BackHeader';
import { useFonts } from 'expo-font';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { StatusBar, View } from "react-native";
import { ThemeProvider, useTheme } from '../context/ThemeContext';


export default function RootLayout() {
    const [ user, setUser ] = useState(null);
    const [ isAuthReady, setIsAuthReady ] = useState(false);
    const [loaded, error] = useFonts({
        'GTWalsheimProRegular': require('../assets/fonts/GTWalsheimPro-Regular.ttf'),
        'GTWalsheimProMedium': require('../assets/fonts/GTWalsheimPro-Medium.ttf'),
        'GTWalsheimProLight': require('../assets/fonts/GTWalsheimPro-Light.ttf'),
        'NantesBoldItalic': require('../assets/fonts/Nantes-BoldItalic.ttf'),
        'NantesRegular': require('../assets/fonts/Nantes-Regular.ttf'),
    });

    const fetchUserDetails = async () => {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
            const { success, user } = await getLoggedInUser();
            if (success) {
                setUser(user);
            } else {
                deleteToken('userToken');
            }
        }
        setIsAuthReady(true);
    };

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (loaded && isAuthReady) {
            SplashScreen.hideAsync();
        }
    }, [loaded, isAuthReady]);

    if (!loaded || !isAuthReady) {
        return null;
    }

    return (
        <UserProvider initialUser={user}>
            <RootLayoutNav />
        </UserProvider>
    );
}

function RootLayoutNavContent() {
    const { colors, isDark } = useTheme();
    const { isAuthenticated } = useAuthStatus();

    console.log('isAuthenticated: ', isAuthenticated);

    const AuthenticatedStack = () => (
        <Stack screenOptions={{ contentStyle: { backgroundColor: colors.backgroundColor } }}>
            <Stack.Screen name="(general)/(homepage)/index" options={{ header: () => <LoggedInHeader /> }} />
            <Stack.Screen name="(general)/profile" options={{ header: () => <LoggedInHeader /> }} />
            <Stack.Screen name="(general)/editprofile" options={{ header: () => <BackHeader /> }} />
            <Stack.Screen name="creategroup" options={{ headerShown: false }} />
            <Stack.Screen name="group/[uniqueURL]" options={{ header: () => <LoggedInHeader /> }} />
        </Stack>
    );

    const UnauthenticatedStack = () => (
        <Stack screenOptions={{ contentStyle: { backgroundColor: colors.backgroundColor } }}>
            <Stack.Screen name="(general)/(homepage)/index" options={{ header: () => <LoggedOutHeader /> }} />
            <Stack.Screen name="(auth)/login" options={{ header: () => <AuthHeader button="Back" /> }} />
            <Stack.Screen name="(auth)/signup" options={{ header: () => <AuthHeader button="Back" /> }} />
            <Stack.Screen name="(auth)/forgotpassword" options={{ header: () => <AuthHeader button="Back" /> }} />
        </Stack>
    );

    return (
        <SafeAreaProvider style={{ backgroundColor: colors.backgroundColor }}>
            <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
                <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor="transparent" translucent />
                
                <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
                    {isAuthenticated ? <AuthenticatedStack /> : <UnauthenticatedStack />}
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    );
}

function RootLayoutNav() {
    return (
        <ThemeProvider>
            <RootLayoutNavContent />
        </ThemeProvider>
    );
}
