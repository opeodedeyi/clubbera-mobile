import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';
import CustomButton from '@/Components/Utility/CustomButton';

interface CreateHeaderProps {
    button?: string;
    progress?: number;
    onPress?: () => void;
}

interface StepCircleProps {
    progress?: number;
    targetNo?: number;
    children?: React.ReactNode;
}

interface ProgressLineProps {
    progress?: number;
    targetNo?: number;
}

interface Styles {
    overallContainer: ViewStyle;
    TopHeader: ViewStyle;
    BottomHeader: ViewStyle;
    customButton: ViewStyle;
    stepCircle: ViewStyle;
    stepCircleGreen: ViewStyle;
    stepCircleText: TextStyle;
    stepCircleGreenText: TextStyle;
    progressLine: ViewStyle;
    progressLineHalfColored: ViewStyle;
    progressLineFullColored: ViewStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    overallContainer: {
        backgroundColor: colors.backgroundColor,
        width: '100%',
    },

    TopHeader: {
        height: 72,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },

    BottomHeader: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        borderTopWidth: 1,
        borderTopColor: colors.borderColor,
        gap: 8,
    },

    customButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: 32,
        height: 32,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.borderColor,
        backgroundColor: colors.backgroundColor,
    },

    stepCircle: {
        width: 24,
        height: 24,
        borderRadius: 100,
        backgroundColor: colors.borderColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    stepCircleGreen: {
        width: 24,
        height: 24,
        borderRadius: 100,
        backgroundColor: colors.mainColorCard,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepCircleText: {
        fontFamily: 'GTWalsheimProMedium',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 18.9,
        letterSpacing: -0.42,
        color: colors.textColor,
    },
    stepCircleGreenText: {
        fontFamily: 'GTWalsheimProMedium',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 18.9,
        letterSpacing: -0.42,
        color: colors.colorWhite,
    },

    progressLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.borderColor,
        opacity: 0.8,
    },

    progressLineHalfColored: {
        height: "100%",
        width: "50%",
        backgroundColor: colors.mainColorCard,
        opacity: 0.8,
    },

    progressLineFullColored: {
        height: "100%",
        width: "100%",
        backgroundColor: colors.mainColorCard,
        opacity: 0.8,
    },
});

const StepCircle: React.FC<StepCircleProps> = ({ progress = 0, children, targetNo = 1 }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const circleStyle = progress > (targetNo-1) ? styles.stepCircleGreen : styles.stepCircle;
    const circleTextStyle = progress > (targetNo-1) ? styles.stepCircleGreenText : styles.stepCircleText;

    return (
        <View style={circleStyle}>
            <Text style={circleTextStyle}>{children}</Text>
        </View>
    );
};

const ProgressLine: React.FC<ProgressLineProps> = ({ progress = 0, targetNo = 1 }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const lineStyle = () => {
        if (progress === targetNo) {
            return styles.progressLineHalfColored;
        } else if (progress > targetNo) {
            return styles.progressLineFullColored;
        } else {
            return;
        }
    }

    return (
        <View style={styles.progressLine}>
            <View style={lineStyle()}></View>
        </View>
    );
};

const CreateHeader: React.FC<CreateHeaderProps> = ({ progress = 0, onPress = () => {} }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.overallContainer}>
            <View style={styles.TopHeader}>
                <CustomButton size="backSize" coloring="inverseColoring" onPress={onPress} showBackSVG>Back</CustomButton>
            </View>
            {progress > 0 && progress < 5 &&
                <View style={styles.BottomHeader}>
                    <StepCircle progress={progress} targetNo={1}>1</StepCircle>
                    <ProgressLine progress={progress} targetNo={1}/>
                    <StepCircle progress={progress} targetNo={2}>2</StepCircle>
                    <ProgressLine progress={progress} targetNo={2}/>
                    <StepCircle progress={progress} targetNo={3}>3</StepCircle>
                    <ProgressLine progress={progress} targetNo={3}/>
                    <StepCircle progress={progress} targetNo={4}>4</StepCircle>
                </View>
            }
        </View>
    )
}

export default CreateHeader;