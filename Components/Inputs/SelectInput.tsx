import React, { useState } from 'react';
import { AppText } from '@/Components/Utility/AppText';
import { View, TouchableOpacity, Modal, FlatList, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';


type Option = {
    label: string;
    value: string;
};

type SelectInputProps = {
    label?: string;
    name: string;
    options: Option[];
    value: string | undefined;
    onChange: (value: string) => void;
    borderRadius?: number;
    minWidth?: number;
};

interface Styles {
    container: ViewStyle;
    label: TextStyle;
    selectWrapper: ViewStyle;
    selectText: TextStyle;
    icon: TextStyle;
    modalOverlay: ViewStyle;
    modalContainer: ViewStyle;
    modalContent: ViewStyle;
    option: ViewStyle;
    optionText: TextStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    container: {
        width: '100%',
        maxWidth: 500,
    },

    label: {
        fontSize: 15,
        color: colors.textColor,
        marginBottom: 8,
    },

    selectWrapper: {
        position: 'relative',
        width: '100%',
        height: 45,
        paddingVertical: 6,
        paddingLeft: 16,
        paddingRight: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: colors.borderColor,
    },

    selectText: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: '400',
    },

    icon: {
        position: 'absolute',
        right: 16,
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    modalContent: {
        backgroundColor: colors.backgroundColor,
        borderRadius: 8,
        maxHeight: '80%',
        borderWidth: 1,
        borderColor: colors.borderColor,
    },

    option: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },

    optionText: {
        fontSize: 16,
        color: colors.textColor,
    },
});

const SelectInput: React.FC<SelectInputProps> = ({ label, options, value, onChange, borderRadius = 8, minWidth = 0 }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [isModalVisible, setModalVisible] = useState(false);
    const selectedOption = options.find(option => option.value === value);

    const handleOptionSelect = (option: Option) => {
        setModalVisible(false);
        onChange(option.value);
    };

    return (
        <View style={styles.container}>
            {label && <AppText style={styles.label}>{label}</AppText>}

            <TouchableOpacity style={[ styles.selectWrapper, { borderRadius, minWidth } ]} onPress={() => setModalVisible(true)}>
                <AppText style={styles.selectText}> {selectedOption ? selectedOption.label : 'Select an option'} </AppText>
                <Feather name="chevron-down" size={18} style={styles.icon} color={colors.textColor} />
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)} >
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setModalVisible(false)} >
                
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.option} onPress={() => handleOptionSelect(item)}>
                                    <AppText style={styles.optionText}>{item.label}</AppText>
                                </TouchableOpacity> )}/>
                    </View>
                </View>

                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default SelectInput;