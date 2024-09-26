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
    createCardContainer: ViewStyle;
    createCardImage: ImageStyle;
    linearGradient: ViewStyle;
    createCardText: TextStyle;
    scrollViewContent: ViewStyle;
    debugText: TextStyle;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 215;
const CARD_MARGIN = 8;

const createStyles = (colors: ThemeColors): Styles => ({
    createCardsContainer: {
        height: 250,
    },
    createCardContainer: {
        width: CARD_WIDTH,
        height: 250,
        marginHorizontal: CARD_MARGIN,
        borderRadius: 8,
        overflow: 'hidden',
    },
    createCardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    linearGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    createCardText: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: 'white',
        fontFamily: 'GTWalsheimProMedium',
        fontSize: 16,
        fontWeight: '500',
    },
    scrollViewContent: {
        flexDirection: 'row',
    },
    debugText: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: 'red',
        fontSize: 12,
    },
});

const HorizontalDeck: React.FC = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [contentWidth, setContentWidth] = useState(0);

    const cards: CreateCard[] = [
        { id: 1, image: require('@/assets/homepage/running.jpg'), text: 'Athletics' },
        { id: 2, image: require('@/assets/homepage/basketballl.jpg'), text: 'Hoop lovers' },
        { id: 3, image: require('@/assets/homepage/chess.jpg'), text: 'Strategy Masters' },
        { id: 4, image: require('@/assets/homepage/creatives.jpg'), text: 'Creatives' },
        { id: 5, image: require('@/assets/homepage/football.jpg'), text: 'Goal Getters' },
        { id: 6, image: require('@/assets/homepage/reading.jpg'), text: 'Page Turners' },
        { id: 7, image: require('@/assets/homepage/womenInTech.jpg'), text: 'Tech Trailblazers' },
        { id: 8, image: require('@/assets/homepage/hiking.jpg'), text: 'Adventure Seekers' },
        { id: 9, image: require('@/assets/homepage/dancing.jpg'), text: 'Rhythm Nation' },
        { id: 10, image: require('@/assets/homepage/safe.jpg'), text: 'Safe Spaces' },
    ];

    useEffect(() => {
        const totalWidth = (CARD_WIDTH + CARD_MARGIN * 2) * cards.length;
        setContentWidth(totalWidth);
        console.log('Content width:', totalWidth);
    }, [cards.length]);

    const renderCard = (card: CreateCard, index: number) => (
        <View key={`${card.id}-${index}`} style={styles.createCardContainer}>
            <Image source={card.image} style={styles.createCardImage} />
            <LinearGradient
                colors={['rgba(0, 0, 0, 0.40)', 'rgba(0, 0, 0, 0.00)']}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.linearGradient}
            />
            <Text style={styles.createCardText}>{card.text}</Text>
            <Text style={styles.debugText}>{`Card ${index + 1}`}</Text>
        </View>
    );

    return (
        <View style={styles.createCardsContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollViewContent,
                    { width: contentWidth }
                ]}
            >
                {cards.map(renderCard)}
                {/* {cards.map(renderCard)} */}
            </ScrollView>
            <Text style={styles.debugText}>{`Screen Width: ${SCREEN_WIDTH}, Content Width: ${contentWidth}`}</Text>
        </View>
    );
};

export default HorizontalDeck;