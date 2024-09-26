import { View, TextInput, ViewStyle, TextStyle } from 'react-native';
import { AppText } from '@/Components/Utility/AppText';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';


interface MainInputProps {
    placeholder?: string;
    label?: string;
    value: string;
    setValue: any;
};

interface Styles {
    container: ViewStyle;
    label: TextStyle;
    input: TextStyle;
};

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
        minHeight: 135,
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontFamily: 'GTWalsheimProRegular',
        fontWeight: '400',
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 8,
        fontSize: 16,
        lineHeight: 18.9,
        letterSpacing: -0.28,
        textAlignVertical: 'top',
    },
});

const MainInput: React.FC<MainInputProps> = ({ placeholder, label, value, setValue }) => {
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
                keyboardType='default'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                multiline={true}
            />
        </View>
    );
};

export default MainInput;