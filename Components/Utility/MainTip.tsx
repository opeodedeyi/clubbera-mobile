import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@/Components/Utility/AppText';
import Svg, { Path } from 'react-native-svg';
import Colors from '@/constants/Colors';


interface MainTipProps {
    theme?: string;
    children: React.ReactNode;
}

const MainTip: React.FC<MainTipProps> = ({ theme="defaultTheme", children }) => {
    return (
        <View style={[styles.tipContainer, theme === "defaultTheme" ? styles.defaultTheme : styles.dangerTheme]}>
            <View style={styles.tipContainerImage}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <Path d="M7.99967 14.6667C11.6663 14.6667 14.6663 11.6667 14.6663 8.00004C14.6663 4.33337 11.6663 1.33337 7.99967 1.33337C4.33301 1.33337 1.33301 4.33337 1.33301 8.00004C1.33301 11.6667 4.33301 14.6667 7.99967 14.6667Z" stroke="#1E7B1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M8 5.33337V8.66671" stroke="#1E7B1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <Path d="M7.99609 10.6666H8.00208" stroke="#1E7B1D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </Svg>
            </View>
            <View style={styles.tipTextContainer}>
                <AppText style={theme === "defaultTheme" ? styles.defaultThemeText : styles.dangerThemeText}>{children}</AppText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tipContainer: {
        width: '100%',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        borderRadius: 8,
    },

    tipTextContainer: {
        flex: 1,
    },

    tipContainerImage: {
        width: 16,
        height: 16,
    },

    defaultTheme: {
        backgroundColor: Colors.mainColorTip,
    },

    defaultThemeText: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: -0.36,
        color: Colors.mainColorCard,
    },
    
    dangerTheme: {
        backgroundColor: Colors.mainColorTipDanger,
    },

    dangerThemeText: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16.2,
        letterSpacing: -0.36,
        color: Colors.mainColorTipDanger,
    },
});

export default MainTip;
