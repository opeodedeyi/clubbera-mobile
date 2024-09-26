import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '@/Components/Utility/AppText';
import Colors from '@/constants/Colors';


interface BinaryOptionInputProps {
    children?: React.ReactNode;
    truthyPlaceholder: string;
    falseyPlaceholder: string;
    boolValue: boolean;
    setBoolValue: (value: boolean) => void;
}

const BinaryOptionInput: React.FC<BinaryOptionInputProps> = ({ children, truthyPlaceholder, falseyPlaceholder, boolValue, setBoolValue }) => {
    const handleTrueButtonClick = () => {
        setBoolValue(true);
    };

    const handleFalseButtonClick = () => {
        setBoolValue(false);
    };

    return (
        <View style={styles.container}>
            {children &&  <AppText style={styles.label}>{children}</AppText>}
            <View style={styles.binaryOptionInput}>
                <TouchableOpacity onPress={handleTrueButtonClick} style={[styles.btnOption, boolValue === true ? styles.btnOptionSelected : {}]} >
                    <AppText style={[styles.btnOptionText, boolValue === true ? styles.btnOptionSelectedText : {}]}>{truthyPlaceholder}</AppText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFalseButtonClick} style={[styles.btnOption, boolValue === false ? styles.btnOptionSelected : {}]} >
                    <AppText style={[styles.btnOptionText, boolValue === false ? styles.btnOptionSelectedText : {}]}>{falseyPlaceholder}</AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 500,
        gap: 12,
    },

    label: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: Colors.colorDarkTwo,
    },

    binaryOptionInput: {
        flexDirection: 'row',
        gap: 16,
    },

    btnOption: {
        flex: 1,
        height: 45,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.colorWhiteTwo,
        borderRadius: 8,
        borderStyle: 'solid',
    },

    btnOptionSelected: {
        backgroundColor: Colors.mainColorTip,
        borderWidth: 0,
        borderBlockColor: 'transparent',
    },
    
    btnOptionText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 21.6,
        letterSpacing: -0.32,
        color: Colors.colorTextInput,
    },

    btnOptionSelectedText: {
        color: Colors.mainColorCard,
    },
});

export default BinaryOptionInput;
