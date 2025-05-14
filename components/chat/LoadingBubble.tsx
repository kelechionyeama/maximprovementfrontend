import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';

export const LoadingBubble = () => {
    // Create three separate animated values for each dot
    const dot1Anim = React.useRef(new Animated.Value(0)).current;
    const dot2Anim = React.useRef(new Animated.Value(0)).current;
    const dot3Anim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        // Create staggered animation for the three dots
        const animateDots = () => {
            Animated.loop(
                Animated.stagger(150, [
                    // First dot animation
                    Animated.sequence([
                        Animated.timing(dot1Anim, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: true
                        }),
                        Animated.timing(dot1Anim, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                    ]),
                    // Second dot animation
                    Animated.sequence([
                        Animated.timing(dot2Anim, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: true
                        }),
                        Animated.timing(dot2Anim, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                    ]),
                    // Third dot animation
                    Animated.sequence([
                        Animated.timing(dot3Anim, {
                            toValue: 1,
                            duration: 300,
                            useNativeDriver: true
                        }),
                        Animated.timing(dot3Anim, {
                            toValue: 0,
                            duration: 300,
                            useNativeDriver: true
                        })
                    ])
                ])
            ).start();
        };

        animateDots();
    }, [dot1Anim, dot2Anim, dot3Anim]);

    // Map the animation values to translateY for bounce effect
    const dot1TranslateY = dot1Anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10]
    });

    const dot2TranslateY = dot2Anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10]
    });

    const dot3TranslateY = dot3Anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10]
    });

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[styles.dot, { transform: [{ translateY: dot1TranslateY }] }]} 
            />
            <Animated.View 
                style={[styles.dot, { transform: [{ translateY: dot2TranslateY }] }]} 
            />
            <Animated.View 
                style={[styles.dot, { transform: [{ translateY: dot3TranslateY }] }]} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginVertical: 4
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#333',
        marginRight: 4
    },
}); 