import LottieView from 'lottie-react-native';
import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { EPBText } from '../../StyledText';

export const LoadingBubble = () => {

    const [showLottie, setShowLottie] = React.useState(false);
    const textOpacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(textOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setTimeout(() => setShowLottie(true), 500);
        });
    }, []);

    return (
        <>
            <Animated.View style={{ opacity: textOpacity }}>
                <EPBText style={styles.titleText}>
                    MAX:
                </EPBText>
            </Animated.View>

            {showLottie && (
                <LottieView
                    loop
                    autoPlay
                    style={styles.dot}
                    resizeMode="center"
                    source={require("@/assets/loaders/typing.json")}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    dot: {
        width: 13,
        height: 13,
        borderRadius: 100,
        overflow: "hidden",
        marginTop: 2
    },

    titleText: {
        color: "#B0B0B0",
        fontSize: 16
    },
}); 