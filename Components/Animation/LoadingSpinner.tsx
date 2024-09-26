import { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

export default function LoadingSpinner({ height = 18, backgroundColor = '#ffffff' }) {
    const rotationAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(rotationAnim, {
                toValue: 1,
                duration: 2400,
                useNativeDriver: true,
                easing: Easing.linear,
            })
        );
    
        spinAnimation.start();
    
        return () => {
            spinAnimation.stop();
        };
    }, []);

    const rotate = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const lineHeights = [3, 3.5, 4, 4.5, 5, 4.5, 4, 3.5];

    return (
        <Animated.View style={[styles.spinner, { height, width: height, transform: [{ rotate }] }]}>
            {lineHeights.map((lineHeight, index) => (
                <View key={index} style={[ styles.container, { height, width: height, transform: [{ rotate: `${(360 / lineHeights.length) * index}deg` }] } ]}>
                    <View style={[ styles.line, { backgroundColor, height: lineHeight } ]}/>
                </View>
            ))}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    spinner: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    container: {
        position: 'absolute',
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    line: {
        width: 1.5,
        borderRadius: 1000,
    },
});
