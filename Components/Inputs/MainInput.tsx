import { View, TextInput, ViewStyle, TextStyle } from 'react-native';
import { AppText } from '@/Components/Utility/AppText';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';


type KeyTypeOptions = 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
type AutoCompleteOptions = 'username' | 'email' | 'name' | 'tel' | 'street-address' | 'postal-code';
type AutoCapitalizeOptions = 'none' | 'sentences' | 'words' | 'characters';

interface MainInputProps {
    placeholder?: string;
    keyboardType?: KeyTypeOptions;
    label?: string;
    value: string;
    setValue: any;
    autoComplete?: AutoCompleteOptions;
    autoCapitalize?: AutoCapitalizeOptions;
}

interface Styles {
    container: ViewStyle;
    label: TextStyle;
    input: TextStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    container: {
        width: '100%',
        maxWidth: 500,
        gap: 8,
    },

    label: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.textColor,
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
        lineHeight: 18.9,
        letterSpacing: -0.28,
    },
});

const MainInput: React.FC<MainInputProps> = ({ placeholder, keyboardType, label, value, setValue, autoComplete, autoCapitalize }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [focused, setFocused] = useState(false);

    return (
        <View style={styles.container}>
            { label && <AppText style={styles.label}>{label}</AppText> }
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={(text) => setValue(text)}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                autoCapitalize={autoCapitalize}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </View>
    );
};

export default MainInput;