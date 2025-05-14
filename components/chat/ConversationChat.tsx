import { wait } from '@/HelperFunctions';
import { chatApi } from '@/api/ChatApi';
import { StreamingText, UserChatBubble } from '@/components/chat/streamingText';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Animated, FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const ConversationChat = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const flatListRef = React.useRef<FlatList>(null);
    const inputRef = React.useRef<TextInput>(null);
    const [value, setValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const slideAnim = React.useRef(new Animated.Value(-300)).current;
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const chatSlideAnim = React.useRef(new Animated.Value(-300)).current;
    const chatFadeAnim = React.useRef(new Animated.Value(0)).current;

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
    };

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
        setChatConversation([{ text: "What is on your mind?", isUser: false, isLoading: true }]);

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


    const handleMessageSubmit = async (message: string) => {
        if (!message.trim() || isLoading) return;

        setIsLoading(true);
        
        // Add user message
        setChatConversation(prev => [...prev, { text: message, isUser: true }]);
        scrollToEnd();

        await wait(200);
        inputRef.current?.blur();
        Keyboard.dismiss();
        setValue("");

        try {
            // Add loading state for MAX's response
            setChatConversation(prev => [...prev, { text: "", isUser: false, isLoading: true }]);
            scrollToEnd();

            // Get response from API
            const response = await chatApi.sendMessage(message);
            
            // Update the loading message with the actual response
            setChatConversation(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    text: response,
                    isUser: false,
                    isLoading: false
                };
                return newMessages;
            });
        } catch (error) {
            console.error('Error sending message:', error);
            // Handle error state
            setChatConversation(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                    text: "Sorry, I encountered an error. Please try again.",
                    isUser: false,
                    isLoading: false
                };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const renderInput = () => {
        return (
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        ref={inputRef}
                        placeholder="Type your message..."
                        style={styles.input}
                        placeholderTextColor="grey"
                        value={value}
                        onChangeText={(text) => setValue(text)}
                        submitBehavior="submit"
                        onSubmitEditing={() => handleMessageSubmit(value)}
                        editable={!isLoading}
                    />
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={() => handleMessageSubmit(value)}
                        disabled={isLoading}
                    >
                        <Ionicons name="send" size={32} color={isLoading ? "#666666" : "#B0B0B0"} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const getHeaderTitle = (arg: string ) => {
        if (arg === "askMeAnything") {
            return "Ask Me Anything";
        } else if (arg === "dating&Relationships") {
            return "Dating & Relationships";
        } else if (arg === "personalityTest") {
            return "Personality Test";
        } else if (arg === "howToBeLiked") {
            return "How to Be Liked";
        } else if (arg === "makingRealFriends") {
            return "Making Real Friends";
        } else if (arg === "influencingPeople") {
            return "Influencing People";
        } else if (arg === "controversialOpinions") {
            return "Controversial Opinions";
        } else if (arg === "findingMotivation") {
            return "Finding Motivation";
        } else if (arg === "styleUpgrade") {
            return "Style Upgrade";
        } else if (arg === "getFitFast") {
            return "Get Fit Fast";
        }
        return "Chat with MAX";
    }

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader title={getHeaderTitle(params.question as string)} />
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

export default ConversationChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingBottom: 70
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
    }
});