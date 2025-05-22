import { chatApi } from '@/api/ChatApi';
import { Button } from '@/components/Button';
import ChatDate from '@/components/chat/chatDate';
import { LoadingBubble } from '@/components/chat/loadingBubble';
import SuggestedReplies from '@/components/chat/SuggestedReplies';
import { areAllMessagesFromToday, findFirstTodayMessageIndex, wait } from '@/HelperFunctions';
import { useDefaultRepliesStore } from '@/store/defaultReplies';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import {
    Animated, FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView,
    StyleSheet, TextInput, TouchableOpacity, View
} from 'react-native';
import MaxText from '../components/chat/max';
import YouText from '../components/chat/you';
import { EPBText } from '../StyledText';
import { isTestFlightBuild } from '@/config'; 

interface ChatMessage {
    text: string;
    isUser: boolean;
    stream?: boolean;
    timestamp?: string;
};

const Chat = () => {

    const [chatConversation, setChatConversation] = React.useState<ChatMessage[]>([]);
    const [value, setValue] = React.useState("");
    const [messageId, setMessageId] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [beginButton, setBeginButton] = React.useState(false);

    const keyboardOpacity = React.useRef(new Animated.Value(0)).current;
    const buttonOpacity = React.useRef(new Animated.Value(0)).current;
    const getFeature = useLocalSearchParams<{ feature: string }>();
    const feature = JSON.parse(getFeature.feature);

    const flatListRef = React.useRef<FlatList>(null);
    const inputRef = React.useRef<TextInput>(null);

    const navigation = useNavigation();

    const { defaultReplies } = useDefaultRepliesStore();
    const openingText = defaultReplies?.[feature?.params]?.openingText ?? "";
    const chatHistory = feature?.chatHistory;


    // HEADER NAVIGATION
    React.useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <View style={[styles.header, { paddingTop: isTestFlightBuild ? 50 : 70 }]}>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => router.back()}>
                        <Ionicons name="chevron-back-outline" size={24} color="white" />
                    </TouchableOpacity>

                    {isTestFlightBuild ? (
                        <Image source={require("@/assets/images/logo.png")} style={styles.logo} />
                    ) : (
                        <EPBText style={{ fontSize: 18 }}>
                            {feature.title}
                        </EPBText>
                    )}

                    <Ionicons name="chevron-back-outline" size={24} color="black" />
                </View>
              ),
              headerShadowVisible: false
        });
    }, []);


    // SHOW OPENING MESSAGE
    React.useEffect(() => {
        (async () => {
            // IF THIS IS A CHAT HISTORY, SHOW THE CHAT HISTORY
            if (chatHistory) {
                setLoading(false);

                const conversation = chatHistory?.messagesArray?.slice(1)?.map((message: any) => ({
                    text: message.content,
                    isUser: message.role === "user",
                    stream: false,
                    timestamp: message.timestamp
                })) || [];
                setChatConversation(conversation);
                
                Animated.timing(keyboardOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }).start();

                await wait(500);
                inputRef.current?.focus();

            } else { // IF NEW CHAT
                setChatConversation([{ text: openingText, isUser: false }]);
                setLoading(false);
            }
        })();
    }, [openingText]);

    
    // SCROLL TO END AFTER NEW MESSAGE
    const scrollToEnd = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };


    // HANDLE SENDING MESSAGE
    const handleSend = async (text?: string) => {
        if (feature?.params === "personalityTest") {
            setBeginButton(false);
        };

        const message = text?.trim() || value.trim();
        if (!message.trim()) return;

        value.trim()?.length > 0 && setValue("");
        setChatConversation((prev) => [...prev, { text: message, isUser: true, stream: true }]);

        scrollToEnd();
        setLoading(true);

        // SEND MESSAGE TO SERVER
        const response = await chatApi({
            message,
            messageId: chatHistory ? chatHistory?.id : messageId,
            feature: feature?.params,
            usedDefaultReplies: text && feature?.params !== "personalityTest" ? true : false
        });

        const responseData = await response?.json();

        setLoading(false);
        setChatConversation((prev) => [...prev, { text: responseData.data.message, isUser: false, stream: true }]);
        scrollToEnd();
        setMessageId(responseData.data.messageId);
    };


    // HANDLE MAX TEXT COMPLETION
    const getOnCompleteHandler = (item: ChatMessage, index: number) => {
        const lastMessage = chatConversation[chatConversation.length - 1];

        // ONLY SHOW THE KEYBOARD AFTER THE OPENING TEXT
        if (lastMessage?.text?.includes(openingText) && (feature?.params !== "personalityTest")) {
            return async () => {
                Animated.timing(keyboardOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }).start();

                await wait(300);
                inputRef.current?.focus();
            };
        };

        if (!chatHistory && (feature?.params === "personalityTest")) {
            if (chatConversation.length ===  1) {
                return () => {
                    Animated.timing(buttonOpacity, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }).start();
    
                    setBeginButton(true);
                };
            };

            if (chatConversation.length === 3) {
                return async () => {
                    Animated.timing(keyboardOpacity, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }).start();
    
                    await wait(300);
                    inputRef.current?.focus();
                };
            };
        };
    };

   
    // ADD KEYBOARD LISTENERS
    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow",
            () => {
                scrollToEnd();
            }
        );

        return () => keyboardDidShowListener.remove();
    }, []);


    // FIND THE FIRST MESSAGE IN CHAT CONVERSATION SENT TODAY
    const firstTodayIndex = findFirstTodayMessageIndex(chatConversation);

    // CHECK IF ALL MESSAGES ARE FROM TODAY
    const allMessagesAreToday = areAllMessagesFromToday(chatConversation);


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 0}>

                <FlatList
                    ref={flatListRef}
                    data={chatConversation}
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, paddingBottom: 10 }}
                    ListFooterComponent={loading ? <LoadingBubble /> : null}
                    onContentSizeChange={scrollToEnd}
                    onScrollBeginDrag={Keyboard.dismiss}
                    nestedScrollEnabled
                    renderItem={({ item, index }) => (
                        <>
                            {index === firstTodayIndex && !allMessagesAreToday && <ChatDate />}
                            
                            {item.isUser ? <YouText text={item.text} /> :
                                <MaxText text={item.text} stream={item.stream !== false}
                                    onComplete={getOnCompleteHandler(item, index)} />}
                        </>
                    )}
                />

                <Animated.View style={{ opacity: keyboardOpacity }}>
                    <SuggestedReplies 
                        replies={defaultReplies?.[feature?.params]?.quickReplies || []} 
                        onQuestionPress={(text) => handleSend(text)}
                        display={chatConversation.length > 1 || chatHistory ? false : true}
                    />

                    <View style={styles.textInputContainer}>
                        <TextInput
                            ref={inputRef}
                            style={styles.textInput}
                            placeholder="Ask me anything..."
                            placeholderTextColor="#B0B0B0"
                            value={value}
                            onChangeText={setValue}
                            multiline={true}
                        />

                        <TouchableOpacity onPress={() => handleSend()}>
                            <Ionicons 
                                name="send" 
                                size={24} 
                                color="#B0B0B0" 
                                style={{ marginLeft: 8 }} 
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* BEGIN BUTTON FOR PERSONALITY FEATURE */}
                {beginButton && (
                    <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
                        <Button 
                            onPress={() => handleSend("I'm ready")} 
                            label="Begin"
                        />
                    </Animated.View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },

    header: {
        height: 120,
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0.3,
        borderBottomColor: "white"
    },

	logo: {
		width: 178.8/2,
		height: 108.4/2,
		marginLeft: -15
	},

    flatList: {
        paddingHorizontal: 10,
        paddingTop: 10
    },

    textInputContainer: {
        alignItems: "center",
        backgroundColor: '#232323',
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 6,
        minHeight: 55,
        maxHeight: 100,
        flexDirection: "row"
    },

    textInput: {
        flex: 1,
        color: 'white', 
        fontSize: 16, 
        paddingVertical: 8,
        fontFamily: "EPM",
        lineHeight: 20,
        maxHeight: 100,
        paddingLeft: 5
    },

    buttonContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%"
    }
});