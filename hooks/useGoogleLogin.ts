import { useEffect, useState } from 'react';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const useGoogleLogin = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);

    const configureGoogleSignIn = async () => {
        // GoogleSignin.configure({
        //     webClientId: 'YOUR_WEB_CLIENT_ID',
        //     iosClientId: 'YOUR_IOS_CLIENT_ID',
        //     // androidClientId: 'YOUR_ANDROID_CLIENT_ID',
        // });
    };
    
    useEffect(() => {
        configureGoogleSignIn();
    });

    const loginWithGoogle = async () => {
        console.log('====================================');
        console.log('Google login initiated');
        console.log('====================================');
        try {
            // await GoogleSignin.hasPlayServices();
            // const { idToken } = await GoogleSignin.signIn();
            // setAccessToken(idToken);
            // console.log('Google login successful', idToken);
        } catch (error) {
            
        }
    };

    return {
        loginWithGoogle,
    };
};
