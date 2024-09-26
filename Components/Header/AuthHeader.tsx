import { View, ViewStyle } from 'react-native'
import CustomButton from '@/Components/Utility/CustomButton';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import React from 'react'

interface AuthHeaderProps {
    button?: string;
}

interface Styles {
    container: ViewStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    container: {
        height: 71,
        backgroundColor: colors.backgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
})

const AuthHeader: React.FC<AuthHeaderProps> = ({ button }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const navigation = useNavigation();

    const handlePress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            router.push("/")
        }
    };

    return (
        <View style={styles.container}>
            <CustomButton size="backSize" coloring="inverseColoring" onPress={handlePress} showBackSVG>
                {button ? button : null}
            </CustomButton>
        </View>
    )
}

export default AuthHeader