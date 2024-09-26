import { AppText } from '@/Components/Utility/AppText';
import { TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'

interface AuthHeaderProps {
    button?: string;
}

interface Styles {
    container: ViewStyle;
    backBtn: ViewStyle;
    backBtnText: TextStyle;
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
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },

    backBtn: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    backBtnText: {
        fontSize: 16,
        color: colors.textColor,
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
            <TouchableOpacity style={styles.backBtn} onPress={handlePress}>
                <MaterialIcons name="arrow-back-ios" size={18} color={colors.textColor} />
                <AppText style={styles.backBtnText}>Back</AppText>
            </TouchableOpacity>
        </View>
    )
}

export default AuthHeader