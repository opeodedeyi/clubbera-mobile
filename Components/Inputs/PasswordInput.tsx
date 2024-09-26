import { TouchableOpacity, View, TextStyle, TextInput, ViewStyle } from 'react-native';
import { Link } from 'expo-router';
import { AppText } from '@/Components/Utility/AppText';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';


interface PasswordInputProps {
    placeholder?: string;
    label?: string;
    value: string;
    setValue: any;
    forgotPassword?: boolean;
}

interface Styles {
    container: ViewStyle;
    labelContainer: ViewStyle;
    label: TextStyle;
    forgotLabel: TextStyle;
    inputContainer: ViewStyle;
    input: TextStyle;
    passwordEye: ViewStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    container: {
        width: '100%',
        maxWidth: 500,
        gap: 8,
    },

    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    label: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.textColor,
    },

    forgotLabel: {
        fontFamily: 'GTWalsheimProMedium',
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.textColor,
    },

    inputContainer: {
        width: '100%',
        position: 'relative',
    },

    input: {
        color: colors.textColor,
        height: 45,
        width: '100%',
        paddingVertical: 6,
        paddingHorizontal: 16,
        fontFamily: 'GTWalsheimProRegular',
        fontWeight: '400',
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 8,
        fontSize: 16,
    },

    passwordEye: {
        position: 'absolute',
        right: 16,
        top: 12,
    },
});

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, label, value, setValue, forgotPassword }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [focused, setFocused] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);

    const togglePasswordHide = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <View style={styles.container}>
            { label && <View style={styles.labelContainer}>
                <AppText style={styles.label}>{label}</AppText>
                { forgotPassword && <Link href="/forgotpassword" style={styles.forgotLabel}>Forgot password?</Link> }
            </View> }

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={(text) => {
                        const trimText = text.trim();
                        setValue(trimText);
                    }}
                    secureTextEntry={hidePassword}
                    autoCapitalize="none"
                    keyboardType='default'
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)} />

                <TouchableOpacity style={styles.passwordEye} onPress={togglePasswordHide}>
                    {   !hidePassword && <Feather name="eye" size={16} color={colors.placeholder} /> }
                    {   hidePassword && <Feather name="eye-off" size={16} color={colors.placeholder} /> }
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PasswordInput;