import React, { useState } from 'react';
import { AppText } from '@/Components/Utility/AppText';
import { View, TouchableOpacity, ViewStyle, TextStyle, Platform, Modal } from 'react-native';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import CustomButton from '@/Components/Utility/CustomButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';

type DateInputProps = {
    label?: string | null;
    name: string;
    value: string | undefined;
    onChange: (value: string) => void;
};

interface Styles {
    dateInputContainer: ViewStyle;
    label: TextStyle;
    dateInputWrapper: ViewStyle;
    dateInputText: TextStyle;
    dateInputIcon: ViewStyle;
    modalContainer: ViewStyle;
    modalContent: ViewStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    dateInputContainer: {
        flexDirection: 'column',
    },

    label: {
        color: colors.textColor,
        fontSize: 15,
        fontWeight: '400',
        marginBottom: 8,
    },

    dateInputWrapper: {
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
        borderRadius: 8,
    },

    dateInputText: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: '400',
    },

    dateInputIcon: {
        position: 'absolute',
        right: 16,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    modalContent: {
        backgroundColor: colors.backgroundColor,
        paddingBottom: 24,
    },
});

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';

        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${day}/${year}`;
    };

    const parseDate = (dateString: string | undefined): Date => {
        if (!dateString) return new Date();
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return new Date(); // Fallback to current date if invalid
        }
        return date;
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const handleConfirm = (event: any, selectedDate?: Date) => {
        setDatePickerVisibility(false);

        if (selectedDate) {
            // Set time to midnight UTC
            const dateAtMidnight = new Date(Date.UTC(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                0, 0, 0, 0
            ));
      
            const isoString = dateAtMidnight.toISOString();
            onChange(isoString);
        }
    };

    return (
        <View style={styles.dateInputContainer}>
            {label && <AppText style={styles.label}>{label}</AppText>}

            <TouchableOpacity style={styles.dateInputWrapper} onPress={showDatePicker}>
                <AppText style={styles.dateInputText}>
                    {formatDate(value) || 'Select a date'}
                </AppText>
                <Feather style={styles.dateInputIcon} name="calendar" size={18} color={colors.textColor} />
            </TouchableOpacity>

            {isDatePickerVisible && (
                Platform.OS === 'ios' ? (
                    <Modal transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <RNDateTimePicker
                                    testID="dateTimePicker"
                                    value={parseDate(value)}
                                    mode="date"
                                    display='spinner'
                                    onChange={handleConfirm} />
                                
                                <CustomButton onPress={() => setDatePickerVisibility(false)} size="normalSize" coloring="defaultColoring">Done</CustomButton>
                            </View>
                        </View>
                    </Modal>
                ) : (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={parseDate(value)}
                        mode="date"
                        display='default'
                        onChange={handleConfirm} />
                )
            )}
            
        </View>
    );
};

export default DateInput;
