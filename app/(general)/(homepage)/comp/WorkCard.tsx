import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppText } from '@/Components/Utility/AppText';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';


interface WorkCardProps {
    image: any;
    title: string;
    description: string;
}

interface Styles {
    workCardContainer: ViewStyle;
    workCardContent: ViewStyle;
    workCardImage: ImageStyle;
    workCardTitle: TextStyle;
    workCardDescription: ViewStyle;
    workCardDescriptionText: TextStyle;
    linearGradient: ViewStyle;
    normalNantes: TextStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    workCardContainer: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },

    workCardContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        padding: 24,
    },

    workCardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    workCardTitle: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 21.6,
        letterSpacing: -0.32,
        color: colors.colorWhite,
        zIndex: 2,
    },

    workCardDescription: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.mainColorCard,
        padding: 24,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    workCardDescriptionText: {
        fontSize: 15,
        fontWeight: '500',
        lineHeight: 18.9,
        letterSpacing: -0.28,
        color: colors.colorWhite,
    },

    linearGradient: {
        ...StyleSheet.absoluteFillObject,
    },

    normalNantes: {
        fontFamily: 'NantesRegular',
    },
});

const WorkCard: React.FC<WorkCardProps> = ({ image, title, description }) => {
    const { colors } = useTheme();
    const [showDescription, setShowDescription] = useState(false);
    const styles = StyleSheet.create(createStyles(colors));

    const renderStyledTitle = () => {
        const titleParts = title.split('&').map((part, index, array) => {
            // For all parts except the last, add the '&' back
            return (
                <Text key={index}>
                    {part}
                    {index < array.length - 1 ? (
                        <Text style={styles.normalNantes}>&</Text>
                    ) : null}
                </Text>
            );
        });

        return <AppText style={styles.workCardTitle}>{titleParts}</AppText>;
    };

    const handleCardClick = () => {
        setShowDescription(true);
        setTimeout(() => {
            setShowDescription(false);
        }, 2700);
    };

    return (
        <TouchableOpacity style={styles.workCardContainer} onPress={handleCardClick}>
            <Image source={image} style={styles.workCardImage} />
            {!showDescription && (
                <>
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.00)', 'rgba(0, 0, 0, 0.40)']}
                        style={styles.linearGradient}
                    />
                    <View style={styles.workCardContent}>
                        {renderStyledTitle()}
                    </View>
                </>
            )}
            {showDescription && (
                <View style={styles.workCardDescription}>
                    {renderStyledTitle()}
                    <AppText style={styles.workCardDescriptionText}>{description}</AppText>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default WorkCard;