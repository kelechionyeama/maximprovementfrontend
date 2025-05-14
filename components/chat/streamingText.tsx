import { wait } from '@/HelperFunctions';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Animated, Keyboard, StyleSheet, View } from 'react-native';
import { EpilogueBlackText, EpilogueRegularText } from '../StyledText';

type Props = {
    text: string;
    onAnimComplete?: () => void;
    isChat?: boolean;
};

// eslint-disable-next-line react/display-name
const StreamingText = React.memo(({ text, isChat, onAnimComplete }: Props) => {
    const words = React.useRef(text?.split(' ')).current;
    const animatedValues = React.useRef(words?.map(() => new Animated.Value(0))).current;
    const timeoutRefs = React.useRef<NodeJS.Timeout[]>([]);

    React.useEffect(() => {
        // Start animation sequence
        words?.forEach((_, index) => {
            const timeout = setTimeout(() => {
                Animated.timing(animatedValues[index], {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }).start();

                if (index === words.length - 1) {
                    const hapticTimeout = setTimeout(async () => {
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        await wait(500);
                        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        Keyboard.dismiss();
                        setTimeout(() => {
                            onAnimComplete?.();
                        }, 300);
                    }, 300);

                    timeoutRefs.current.push(hapticTimeout);
                }
            }, index * 100);

            timeoutRefs.current.push(timeout);
        });

        return () => {
            timeoutRefs.current?.forEach(clearTimeout);
            timeoutRefs.current = [];
            animatedValues?.forEach(val => val.setValue(0));
        };
    }, [text]);

    return (
        <View
            style={{
                marginTop: 10,
                width: '90%',
                alignSelf: 'center'
            }}
        >
            <EpilogueBlackText style={{ color: "#E0E0E0", opacity: 0.8 }}>
                MAX:
            </EpilogueBlackText>
            <View style={[styles.container]}>
                {words?.map((word, index) => (
                    <Animated.Text
                        key={`${word}-${index}`}
                        style={[styles.text, { opacity: animatedValues[index] }]}
                    >
                        {word}{' '}
                    </Animated.Text>
                ))}
            </View>
        </View>
    );
});

const UserChatBubble = React.memo(({ text }: Props) => {
    return (
        <View
            style={{
                marginTop: 10,
                width: '90%',
                alignSelf: 'center'
            }}
        >
            <EpilogueBlackText style={{ color: "#E0E0E0", opacity: 0.8 }}>
                You:
            </EpilogueBlackText>
            <View style={[styles.container]}>
                <EpilogueRegularText lineHeight={true} style={styles.chatText}>
                    {text}
                </EpilogueRegularText>
            </View>
        </View>
    );
});

UserChatBubble.displayName = 'UserChatBubble';

export { StreamingText, UserChatBubble };

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    chatContainer: {
        width: '80%',
        marginLeft: 20,
        marginTop: 20
    },

    defaultContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    text: {
        color: "#E0E0E0",
        fontFamily: 'Epilogue-Bold',
        fontSize: 16,
        lineHeight: 22
    },

    chatBubble: {
        backgroundColor: '#F5F5F5',
        alignSelf: 'flex-end',
        borderRadius: 25,
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginRight: 20,
        maxWidth: '80%'
    },

    chatText: {
        fontSize: 16,
        color: "#E0E0E0"
    }
});
