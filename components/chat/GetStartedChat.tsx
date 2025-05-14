import { wait } from '@/HelperFunctions';
import { StreamingText, UserChatBubble } from '@/components/chat/streamingText';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Animated, FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
// import { chatApi } from '@/api/ChatApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../Button';
import { EpilogueBlackText } from '../StyledText';
import ChatHeader from './ChatHeader';
import { LoadingBubble } from './LoadingBubble';

type ChatMessage = {
    text: string;
    isUser: boolean;
    isLoading?: boolean;
};

const LoadingMessage = () => {
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
            <View style={styles.container}>
                <LoadingBubble />
            </View>
        </View>
    );
};

const GetStartedChat = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const flatListRef = React.useRef<FlatList>(null);
    const inputRef = React.useRef<TextInput>(null);
    const [step, setStep] = React.useState(0);
    const [value, setValue] = React.useState('');
    const [name, setName] = React.useState("");
    const [greetingShown, setGreetingShown] = React.useState(false);
    const [archiveShown, setArchiveShown] = React.useState(false);
    const [showButton, setShowButton] = React.useState(false);

    const slideAnim = React.useRef(new Animated.Value(-300)).current;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const chatSlideAnim = React.useRef(new Animated.Value(-300)).current;
    const chatFadeAnim = React.useRef(new Animated.Value(0)).current;

    const MESSAGES = [
        {
            text: "What's up, I'm Max. Let's get you set up, what can I call you?",
            placeholder: "Enter your name",
            isUser: false,
        },
        {}, // Empty object for step 1 (greeting)
        {
            text: `Just ask me, "I never get invited to…" "How do I make this girl…."Whatever it is, I'll always give you my realest advice and I'd never bullshit you.`,
            placeholder: "Enter your preference",
            isUser: false,
        },
        {
            text: "The more we talk, the more I'll remember about you and use it to help in future chats.",
            isUser: false,
        },
        {
            text: "See you on the other side",
            isUser: false,
        }
    ];

    const getMessage = (step: number) => {
        if (step === 1) {
            return `Nice to meet you ${name}!I was created by two guys who used to struggle with confidence in high school - but figured things out along the way.Now, I'm here to be the big brother they wish they had - someone you can talk to about anything`;
        }
        return MESSAGES[step].text;
    };

    const [chatConversation, setChatConversation] = React.useState<ChatMessage[]>([]);

    // SCROLL TO END AFTER NEW MESSAGE
    const scrollToEnd = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    // Function to focus on text input after animation completes
    const onAnimComplete = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        setShowButton(true);
    };

    // Reset button visibility when step changes
    React.useEffect(() => {
        setShowButton(false);
    }, [step]);

    // BEGIN ANIMATIONS
    React.useEffect(() => {
        // HEADER ANIMATION
        const headerAnimation = Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]);

        // CHAT ANIMATION
        const chatAnimation = Animated.parallel([
            Animated.timing(chatSlideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(chatFadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
        ]);

        Animated.parallel([headerAnimation, chatAnimation]).start();
    }, []);

    // Handle initial loading state and first question
    React.useEffect(() => {
        // Add the first question
        setChatConversation([{ text: getMessage(0) ?? "", isUser: false, isLoading: true }]);

        const timer = setTimeout(() => {
            setChatConversation(prev => {
                const newMessages = [...prev];
                newMessages[0] = {
                    ...newMessages[0],
                    isLoading: false
                };
                return newMessages;
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Update chat after the user enters their name
    React.useEffect(() => {
        if (name && step === 1 && !greetingShown) {
            const greetingMessage: ChatMessage = { text: getMessage(1) ?? "", isUser: false, isLoading: true };
            setChatConversation(prev => [...prev, greetingMessage]);
            setGreetingShown(true);
            scrollToEnd();
            wait(2000).then(() => {
                setChatConversation(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        ...newMessages[newMessages.length - 1],
                        isLoading: false
                    };
                    return newMessages;
                });
            });
        }
    }, [name, step, greetingShown]);

    // IF USER NAVIGATED FROM A SUGGESTED MESSAGE
    React.useEffect(() => {
        if (params.question) {
            handleButtonPress(params.question as string);
        }
    }, [params.question]);

    const handleNameSubmit = async (message: string) => {
        if (!message.trim()) return;

        // Add user message
        setChatConversation(prev => [...prev, { text: message, isUser: true }]);
        scrollToEnd();

        await wait(200);
        inputRef.current?.blur();
        Keyboard.dismiss();

        // Store name and move to next step
        await AsyncStorage.setItem('userName1', message);
        setName(message);
        setStep(1);
        setValue("");
    };

    const handleButtonPress = async (buttonText: string) => {
        // Hide button immediately
        setShowButton(false);
        
        // Add user's button response
        setChatConversation(prev => [...prev, { text: buttonText, isUser: true }]);
        scrollToEnd();

        // Add next MAX message
        const nextStep = step + 1;
        setChatConversation(prev => [...prev, { text: getMessage(nextStep) ?? "", isUser: false, isLoading: true }]);
        scrollToEnd();

        await wait(2000);

        setChatConversation(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
                ...newMessages[newMessages.length - 1],
                isLoading: false
            };
            return newMessages;
        });

        setStep(nextStep);

        // If this was the last message, show archive message and navigate
        if (nextStep === 4) {
            await wait(2000);
            setArchiveShown(true);
            setChatConversation(prev => [...prev, { text: "Archiving this chat...", isUser: false }]);
            await wait(2000);
            router.replace("/");
        }
    };

    const renderInput = () => {
        if (step === 0) {
            return (
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            ref={inputRef}
                            placeholder="Enter your name"
                            style={styles.input}
                            placeholderTextColor="grey"
                            value={value}
                            onChangeText={(text) => setValue(text)}
                            submitBehavior="submit"
                            onSubmitEditing={() => handleNameSubmit(value)}
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => handleNameSubmit(value)}
                        >
                            <Ionicons name="send" size={32} color="#B0B0B0" />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }

        if (!showButton) return null;

        if (step === 1) {
            return <Button style={styles.textButton} label="Sounds good" onPress={() => handleButtonPress("Sounds good")} />;
        }

        if (step === 2) {
            return <Button style={styles.textButton} label="Okay" onPress={() => handleButtonPress("Okay")} />;
        }

        if (step === 3) {
            return <Button style={styles.textButton} label="Sounds good!" onPress={() => handleButtonPress("Sounds good!")} />;
        }

        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader title="Get Started" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <FlatList
                    ref={flatListRef}
                    data={chatConversation}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    renderItem={({ item }) => {
                        if (item.isUser) {
                            return <UserChatBubble text={item.text} />;
                        }

                        if (item.isLoading) {
                            return <LoadingMessage />;
                        }

                        return <StreamingText isChat={true} text={item.text} onAnimComplete={onAnimComplete} />;
                    }}
                    onContentSizeChange={scrollToEnd}
                />

                <Animated.View style={{ transform: [{ translateX: chatSlideAnim }], opacity: chatFadeAnim }}>
                    {renderInput()}
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default GetStartedChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingBottom: 70
    },

    title: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: "PPMoriSB",
        lineHeight: 22,
        flexWrap: 'wrap',
        flexShrink: 1
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        borderBottomWidth: 0.2,
        borderBottomColor: "gray",
        alignContent: "center",
        paddingBottom: 10
    },

    inputContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        marginBottom: 10
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: "grey",
        backgroundColor: "#1E1E1E",
        paddingHorizontal: 10
    },

    input: {
        flex: 1,
        padding: 15,
        fontSize: 16,
        fontFamily: 'Epilogue-Regular',
        maxHeight: 80,
        color: "#E0E0E0"
    },

    sendButton: {
        paddingRight: 10,
        paddingLeft: 5
    }, 

    textButton: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#1E1E1E',
        borderWidth: 2,
        borderColor: 'grey',
    }
});