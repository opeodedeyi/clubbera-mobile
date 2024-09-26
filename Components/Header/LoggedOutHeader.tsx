import { View, ViewStyle } from 'react-native';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import Logo from '@/Components/Utility/Logo';
import CustomButton from '@/Components/Utility/CustomButton';
import { router } from 'expo-router';
import React from 'react';


interface Styles {
    container: ViewStyle;
    buttonContainer: ViewStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    container: {
        height: 60,
        backgroundColor: colors.backgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
})

const LoggedOutHeader: React.FC = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.container}>
            <Logo />

            <View style={styles.buttonContainer}>
                <CustomButton onPress={() => router.push("/login")} size="defaultSize" coloring="inverseColoring">Log in</CustomButton>
                <CustomButton onPress={() => router.push("/signup")} size="defaultSize" coloring="defaultColoring">Sign up</CustomButton>
            </View>
        </View>
    )
}

export default LoggedOutHeader