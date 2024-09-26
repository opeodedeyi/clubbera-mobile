import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@/Components/Utility/AppText';
import Colors from '@/constants/Colors';


interface CustomTagProps {
    selected?: string;
    onPress?: () => void;
    children: React.ReactNode;
}

const CustomTag: React.FC<CustomTagProps> = ({ selected = "isNotSelected", onPress, children }) => {
    return (
        <TouchableOpacity style={[styles.customTag, selected === "isSelected" ? styles.isSelected : styles.isNotSelected]} onPress={onPress}>
            <AppText style={selected === "isSelected" ? styles.isSelectedText : styles.isNotSelectedText}>{children}</AppText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    customTag: {
        flexDirection: 'row',
        height: 32,
        paddingHorizontal: 19,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },

    isSelected: {
        backgroundColor: Colors.mainColorTip,
    },

    isSelectedText: {
        color: Colors.mainColorCard,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.42,
    },
    
    isNotSelected: {
        borderWidth: 1.2,
        borderColor: Colors.colorWhiteTwo,
        backgroundColor: 'transparent',
    },

    isNotSelectedText: {
        color: Colors.colorDarkOne,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.42,
    },
});

export default CustomTag