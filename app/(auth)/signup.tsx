import { View, ScrollView,TextStyle, ViewStyle } from 'react-native';
import { useSignup } from '@/hooks/useSignup';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';
import Logo from '@/Components/Utility/Logo';
import CustomButton from '@/Components/Utility/CustomButton';
import MainInput from '@/Components/Inputs/MainInput';
import PasswordInput from '@/Components/Inputs/PasswordInput';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
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
    orText: TextStyle;
    authFormItems: ViewStyle;
    links: ViewStyle;
    normalTitle: TextStyle;
    normalText: TextStyle;
    altText: TextStyle;
    linkStyle: TextStyle;
    altLinkStyle: TextStyle;
};

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
        paddingBottom: 100,
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
        fontSize: 14,
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

    altText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.textColor,
        textAlign: 'center',
    },

    linkStyle: {
        color: colors.mainColor,
        fontFamily: 'GTWalsheimProMedium',
        fontWeight: '500',
    },

    altLinkStyle: {
        color: colors.textColor,
        fontFamily: 'GTWalsheimProRegular',
        fontWeight: '400',
    }
});

const Signup: React.FC = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [page, setPage] = useState(1);
    const { fullName, setFullName, email, setEmail, password, setPassword,
        isFormValid, isLoading, handleSignup } = useSignup();
    const { loginWithGoogle } = useGoogleLogin();

    const handlePress = async () => {
        if (page === 1) {
            setPage(2);
        } else {
            await handleSignup();
            setPage(1);
        }
    };

    return (
        <View style={styles.fullFlex}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        {page === 1 ? (
                            <View style={styles.mainContent}>
                                <Logo clickable={false}/>
                                <View style={styles.textsCotainer}>
                                    <AppText style={styles.normalTitle}>Join the adventure</AppText>
                                    <AppText style={styles.normalText}>Sign up to connect with like-minded individuals and embark on exciting journeys together.</AppText>
                                </View>
                                <CustomButton onPress={loginWithGoogle} size="fullWidthSize" coloring="googleColoring" showGoogleSVG>Login with Google</CustomButton>
                                <View style={styles.orCotainer}>
                                    <View style={styles.orLine}></View>
                                    <AppText style={styles.orText}>or</AppText>
                                    <View style={styles.orLine}></View>
                                </View>
                                <View style={styles.authFormItems}>
                                    <MainInput placeholder="Enter full name" keyboardType="default" label="Full name" value={fullName} setValue={setFullName} autoComplete="name" />
                                    <MainInput placeholder="Enter email address" keyboardType="email-address" label="Email address" value={email} setValue={setEmail} autoComplete="email" autoCapitalize="none" />
                                    <PasswordInput placeholder="Enter password" label="Password" value={password} setValue={setPassword} />
                                </View>
                            </View>
                        ) : (
                            <View style={styles.mainContent}>
                                <View style={styles.textsCotainer}>
                                    <AppText style={styles.normalTitle}>Finish signing up</AppText>
                                    <AppText style={styles.normalText}>We just need a few information from you and your account will be all set up.</AppText>
                                </View>
                                <View style={styles.authFormItems}>

                                </View>
                            </View>
                        )}

                        <View style={styles.links}>
                            <CustomButton onPress={handlePress} size="fullWidthSize" coloring="defaultColoring" isDisabled={!isFormValid || isLoading}>{ page === 1 ? "Continue" : "Get started" }</CustomButton>
                            {page === 1 ? (
                                <AppText style={styles.normalText}>Already a member? <Link href="/login" style={styles.linkStyle}>Login</Link></AppText>
                            ) : (
                                <AppText style={styles.altText}>By signing up, you agree to <Link href="/" style={styles.altLinkStyle}>Terms of Service,</Link> <Link href="/" style={styles.altLinkStyle}>Privacy Policy,</Link> and <Link href="/" style={styles.altLinkStyle}>Cookie Policy.</Link></AppText>
                            )}
                            
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Signup