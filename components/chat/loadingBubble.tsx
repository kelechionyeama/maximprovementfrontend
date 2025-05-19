import LottieView from 'lottie-react-native';
import React from 'react';
import { Animated, StyleSheet, FlatList } from 'react-native';
import { EPBText } from '../../StyledText';

export const LoadingBubble = ({ flatListRef }: { flatListRef?: React.RefObject<FlatList> }) => {

    const [showLottie, setShowLottie] = React.useState(false);
    const textOpacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(textOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            flatListRef?.current?.scrollToEnd({ animated: true });
            setTimeout(() => setShowLottie(true), 500);
        });
    }, []);

    return (
        <>
            <Animated.View style={{ opacity: textOpacity }}>
                <EPBText color="#B0B0B0" style={styles.titleText}>
                    MAX:
                </EPBText>
            </Animated.View>

            <LottieView
                loop
                autoPlay
                style={[styles.dot, { opacity: showLottie ? 1 : 0 }]}
                resizeMode="center"
                source={require("@/assets/loaders/typing.json")}
            />
        </>
    );
};

const styles = StyleSheet.create({
    dot: {
        width: 13,
        height: 13,
        borderRadius: 100,
        overflow: "hidden",
        marginTop: 2,
        marginBottom: 10
    },

    titleText: {
        fontSize: 16
    }
}); 