import { AppText } from '@/Components/Utility/AppText';
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';


type ButtonSize = 'defaultSize' | 'normalSize' | 'buttonNoButtonSize' | 'fullWidthSize' | 'formHeaderSize' | 'tableButtonSize' | 'backSize';
type ButtonColoring = 'defaultColoring' | 'inverseColoring' | 'googleColoring' | 'buttonNoButtonColoring';

interface Styles {
    customButton: ViewStyle;
    backDierction: ViewStyle;
    socialLoginButton: ViewStyle | TextStyle;
    defaultColoring: ViewStyle;
    defaultColoringText: TextStyle;
    inverseColoring: ViewStyle;
    inverseColoringText: TextStyle;
    backColoring: ViewStyle;
    backColoringText: TextStyle;
    buttonNoButtonColoring: ViewStyle;
    buttonNoButtonColoringText: TextStyle;
    googleColoring: ViewStyle;
    googleColoringText: TextStyle;
    disabledColoring: ViewStyle;
    disabledColoringText: TextStyle;
    buttonNoButtonSize: TextStyle;
    defaultSize: ViewStyle | TextStyle;
    normalSize: ViewStyle | TextStyle;
    fullWidthSize: ViewStyle | TextStyle;
    formHeaderSize: ViewStyle | TextStyle;
    backSize: ViewStyle | TextStyle;
    tableButtonSize: ViewStyle | TextStyle;
}

interface CustomButtonProps {
    size?: ButtonSize;
    coloring?: ButtonColoring;
    onPress: () => void;
    showBackSVG?: boolean;
    showGoogleSVG?: boolean;
    children?: React.ReactNode;
    isDisabled?: boolean;
}

const createStyles = (colors: ThemeColors): Styles => ({
    customButton: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },

    backDierction: {
        height: 8,
        margin: 0,
        padding: 0,
    },

    socialLoginButton: {
        display: 'flex',
        height: 45,
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        fontSize: 16,
        fontWeight: '400',
        gap: 16,
    },

    defaultColoring: {
        backgroundColor: colors.mainColor,
    },

    defaultColoringText: {
        fontFamily: 'GTWalsheimProMedium',
        color: colors.colorWhite,
    },

    inverseColoring: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        backgroundColor: 'transparent',
    },

    inverseColoringText: {
        fontFamily: 'GTWalsheimProMedium',
        color: colors.textColor,
    },

    backColoring: {
        borderWidth: 1,
        borderColor: colors.borderColor,
        backgroundColor: 'transparent',
    },

    backColoringText: {
        fontFamily: 'GTWalsheimProRegular',
        fontWeight: '400',
        color: colors.textColor,
    },

    buttonNoButtonColoring: {
        backgroundColor: 'transparent',
    },

    buttonNoButtonColoringText: {
        fontFamily: 'GTWalsheimProRegular',
        fontWeight: '400',
        color: colors.textColor,
    },

    googleColoring: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.borderColor,
        backgroundColor: 'transparent',
    },

    googleColoringText: {
        fontFamily: 'GTWalsheimProMedium',
        color: colors.textColor,
    },

    disabledColoring: {
        backgroundColor: 'transparent',
    },

    disabledColoringText: {
        fontFamily: 'GTWalsheimProMedium',
        color: colors.textColor,
    },

    buttonNoButtonSize: {
        fontSize: 16,
        fontWeight: '400',
    },

    defaultSize: {
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 7,
        paddingHorizontal: 18,
        borderRadius: 100,
        gap: 10,
    },

    normalSize: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 21.6,
        paddingVertical: 9,
        paddingHorizontal: 28,
        borderRadius: 100,
    },

    fullWidthSize: {
        fontSize: 16,
        paddingVertical: 15,
        paddingHorizontal: 24,
        borderRadius: 100,
        width: '100%',
        gap: 16,
    },

    formHeaderSize: {
        display: 'flex',
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 100,
        fontSize: 15,
        fontWeight: '500',
    },

    backSize: {
        display: 'flex',
        paddingVertical: 10,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 8,
        fontWeight: '500',
    },
    
    tableButtonSize: {
        fontSize: 16,
        fontWeight: '500',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 100,
        height: 32,
        width: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
    },
});

const CustomButton: React.FC<CustomButtonProps> = ({
    size='defaultSize',
    coloring='defaultColoring',
    onPress,
    children,
    showBackSVG,
    showGoogleSVG,
    isDisabled 
}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    
    const handlePress = isDisabled ? () => {} : onPress;
    const buttonStyle = isDisabled ? styles.disabledColoring : styles[coloring as keyof Styles];
    const textStyle = isDisabled
        ? styles.disabledColoringText
        : styles[`${coloring}Text` as keyof Styles] as TextStyle;

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.customButton, styles[size] as any, buttonStyle]} disabled={isDisabled} >
            {showBackSVG && 
                <MaterialIcons name="arrow-back-ios" size={18} color={colors.textColor} />
            }

            {showGoogleSVG &&
                <AntDesign name="google" size={18} color={colors.textColor} />
            }
            <AppText style={textStyle}>{children}</AppText>
        </TouchableOpacity>
    );
};

export default CustomButton;