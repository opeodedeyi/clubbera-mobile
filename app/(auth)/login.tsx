import { View, ViewStyle, TextStyle, ScrollView } from 'react-native';
import { useLogin } from '@/hooks/useLogin';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';
import Logo from '@/Components/Utility/Logo';
import CustomButton from '@/Components/Utility/CustomButton';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import MainInput from '@/Components/Inputs/MainInput';
import PasswordInput from '@/Components/Inputs/PasswordInput';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { AppText } from '@/Components/Utility/AppText';


interface Styles {
    fullFlex: ViewStyle;
    container: ViewStyle;
    mainContainer: ViewStyle;
    mainContent: ViewStyle;
    textsCotainer: ViewStyle;
    orCotainer: ViewStyle;
    orLine: ViewStyle;
    orText: ViewStyle | TextStyle;
    authFormItems: ViewStyle;
    links: ViewStyle;
    normalTitle: ViewStyle | TextStyle;
    normalText: ViewStyle | TextStyle;
    linkStyle: ViewStyle | TextStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    fullFlex: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },

    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 150,
        gap: 28,
    },

    mainContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 40,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 8,
        paddingVertical: 32,
        paddingHorizontal: 24,
    },

    mainContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 24,
    },

    textsCotainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 8,
    },

    orCotainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 24,
    },

    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.borderColor,
        opacity: 0.8,
    },

    orText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.textColor,
    },

    authFormItems: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 24,
    },

    links: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },

    normalTitle: {
        fontFamily: 'GTWalsheimProMedium',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 22.5,
        letterSpacing: -0.36,
        color: colors.textColorSecondary,
    },

    normalText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.textColor,
    },

    linkStyle: {
        color: colors.mainColor,
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
    }
})

const Login: React.FC = (): React.ReactElement => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { email, setEmail, password, setPassword, isFormValid, isLoading, handleLogin } = useLogin();
    const { loginWithGoogle } = useGoogleLogin();

    return (
        <View style={styles.fullFlex}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.mainContent}>
                            <Logo clickable={false}/>
                            <View style={styles.textsCotainer}>
                                <AppText style={styles.normalTitle}>Welcome back</AppText>
                                <AppText style={styles.normalText}>Ready to reconnect with friends? Login to resume discovery of  new experiences together.</AppText>
                            </View>
                            <CustomButton onPress={loginWithGoogle} size="fullWidthSize" coloring="googleColoring" showGoogleSVG>Login with Google</CustomButton>
                            <View style={styles.orCotainer}>
                                <View style={styles.orLine}></View>
                                <AppText style={styles.orText}>or</AppText>
                                <View style={styles.orLine}></View>
                            </View>
                            <View style={styles.authFormItems}>
                                <MainInput placeholder="Enter email address" keyboardType="email-address" label="Email address" value={email} setValue={setEmail} autoComplete="email" autoCapitalize="none" />
                                <PasswordInput placeholder="Enter password" label="Password" value={password} setValue={setPassword} forgotPassword/>
                            </View>
                        </View>

                        <View style={styles.links}>
                            <CustomButton onPress={handleLogin} size="fullWidthSize" coloring="defaultColoring" isDisabled={!isFormValid || isLoading}>Login</CustomButton>
                            <AppText style={styles.normalText}>Not a member yet? <Link href="/signup" style={styles.linkStyle}>Sign up now</Link></AppText>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Login;
