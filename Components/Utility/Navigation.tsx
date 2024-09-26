import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ViewStyle, TextStyle, ImageStyle, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeColors } from '@/constants/Theme';
import { useTheme } from '@/context/ThemeContext';

interface CreateCard {
    id: number;
    image: any;
    text: string;
}

interface Styles {
    createCardsContainer: ViewStyle;
}

const createStyles = (colors: ThemeColors): Styles => ({
    createCardsContainer: {
        height: 250,
    },
});

const HorizontalDeck: React.FC = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.createCardsContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    styles.createCardsContainer
                ]}
            >
            </ScrollView>
        </View>
    );
};

export default HorizontalDeck;