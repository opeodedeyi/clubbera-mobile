import React, { useState } from 'react';
import { AppText } from '@/Components/Utility/AppText';
import { View, TouchableOpacity, ViewStyle, TextStyle, Platform, Modal } from 'react-native';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import CustomButton from '@/Components/Utility/CustomButton';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';

type TimeInputProps = {
    label?: string | null;
    name: string;
    value: string | null;
    onChange: (value: string) => void;
};

interface Styles {
    dateInputContainer: ViewStyle;
    label: TextStyle;
    timeInputWrapper: ViewStyle;
    timeInputText: TextStyle;
    timeInputIcon: ViewStyle;
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

    timeInputWrapper: {
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

    timeInputText: {
        color: colors.textColor,
        fontSize: 16,
        fontWeight: '400',
    },

    timeInputIcon: {
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

const TimeInput: React.FC<TimeInputProps> = ({ label, name, value, onChange }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const formatTime = (timeString: string | null): string => {
        if (!timeString) return '';
        const [hoursStr, minutesStr] = timeString.split(':');
        let hours = parseInt(hoursStr, 10);
        const minutes = minutesStr.padStart(2, '0');

        if (isNaN(hours) || isNaN(parseInt(minutesStr, 10))) return '';

        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;
        const hoursString = hours.toString().padStart(2, '0');

        return `${hoursString}:${minutes} ${ampm}`;
    };

    const parseTime = (timeString: string | null): Date => {
        if (!timeString) return new Date();
        const [hoursStr, minutesStr] = timeString.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        if (isNaN(hours) || isNaN(minutes)) return new Date();

        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (event: any, selectedTime?: Date) => {
        if (Platform.OS === 'android') {
            hideTimePicker();
        }

        if (selectedTime) {
            const hours = selectedTime.getHours();
            const minutes = selectedTime.getMinutes();

            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            onChange(timeString);
        } else if (Platform.OS === 'ios') {
            hideTimePicker();
        }
    };

    return (
        <View style={styles.dateInputContainer}>
            {label && <AppText style={styles.label}>{label}</AppText>}

            <TouchableOpacity style={styles.timeInputWrapper} onPress={showTimePicker}>
                <AppText style={styles.timeInputText}>
                    {formatTime(value) || 'Select a time'}
                </AppText>
                <Feather style={styles.timeInputIcon} name="clock" size={18} color={colors.textColor} />
            </TouchableOpacity>

            {isTimePickerVisible && (
                Platform.OS === 'ios' ? (
                    <Modal transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <RNDateTimePicker
                                    testID="dateTimePicker"
                                    value={parseTime(value)}
                                    mode="time"
                                    display='spinner'
                                    onChange={handleConfirm}
                                    is24Hour={false} />
                                
                                <CustomButton onPress={hideTimePicker} size="normalSize" coloring="defaultColoring">Done</CustomButton>
                            </View>
                        </View>
                    </Modal>
                ) : (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={parseTime(value)}
                        mode="time"
                        display='default'
                        onChange={handleConfirm}
                        is24Hour={false} />
                )
            )}
            
        </View>
    );
};

export default TimeInput;
