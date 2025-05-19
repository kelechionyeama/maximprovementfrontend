import { LoadingBubble } from '@/components/chat/loadingBubble';
import SuggestedReplies from '@/components/chat/SuggestedReplies';
import { wait } from '@/HelperFunctions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import { Animated, FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import MaxText from '../components/chat/max';
import YouText from '../components/chat/you';
import { EPBText } from '../StyledText';
import { chatApi } from '@/api/ChatApi';

interface ChatMessage {
    text: string;
    isUser: boolean;
};

const Chat = () => {

    const [chatConversation, setChatConversation] = React.useState<ChatMessage[]>([]);
    const [value, setValue] = React.useState("");
    const [messageId, setMessageId] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [maxIsStreaming, setMaxIsStreaming] = React.useState(false);

    const keyboardOpacity = React.useRef(new Animated.Value(0)).current;
    const getFeature = useLocalSearchParams<{ feature: string }>();
    const feature = JSON.parse(getFeature.feature);

    const openingText = feature?.defaultsReplies?.openingText;

    const flatListRef = React.useRef<FlatList>(null);
    const inputRef = React.useRef<TextInput>(null);

    const navigation = useNavigation();


    // HEADER NAVIGATION
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <EPBText style={{ fontSize: 18 }}>
                    {feature.title}
                </EPBText>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-back-outline" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: "black"
            },
            contentStyle: {
				borderWidth: 0.3,
				borderTopColor: "white"
			}
        });
    }, []);


    // SHOW OPENING MESSAGE
    React.useEffect(() => {
        (async () => {
            setMaxIsStreaming(true);
            setChatConversation([{ text: openingText, isUser: false }]);
            setLoading(false);
        })();
    }, []);

    
    // SCROLL TO END AFTER NEW MESSAGE
    const scrollToEnd = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };


    // HANDLE SENDING MESSAGE
    const handleSend = async (text?: string) => {
        const message = text || value;
        if (!message.trim()) return;

        // setMaxIsStreaming(false);
        setValue("");
        setChatConversation([...chatConversation, { text: message, isUser: true }]);

        // return;

        await wait(200);
        Keyboard.dismiss();
        scrollToEnd();

        setLoading(true);

        // SEND MESSAGE TO SERVER
        const response = await chatApi({
            message,
            messageId: messageId,
            feature: feature?.params
        });

        const responseData = await response?.json();

        // console.log("Response Data", responseData.data);
        // return;

        setLoading(false);
        setChatConversation((prev) => [...prev, { text: responseData.data.message, isUser: false }]);
        scrollToEnd();
        setMessageId(responseData.data.messageId);
    };


    // HANDLE MAX TEXT COMPLETION
    const getOnCompleteHandler = (item: ChatMessage, index: number) => {
        const streaming = index === 0 && !item.isUser;

        const lastMessage = chatConversation[chatConversation.length - 1];

        // ONLY SHOW THE KEYBOARD AFTER THE OPENING TEXT
        if (lastMessage.text.includes(openingText)) {
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


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>

                <FlatList
                    ref={flatListRef}
                    data={chatConversation}
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 50, paddingBottom: 10 }}
                    ListFooterComponent={loading ? <LoadingBubble /> : null}
                    onContentSizeChange={scrollToEnd}
                    renderItem={({ item, index }) => {
                        return item.isUser ? <YouText text={item.text} /> :
                            <MaxText text={item.text} onComplete={getOnCompleteHandler(item, index)} />;
                    }}
                />

                <Animated.View style={{ opacity: keyboardOpacity }}>
                    <SuggestedReplies 
                        replies={feature?.defaultsReplies?.quickReplies || []} 
                        onQuestionPress={(text) => handleSend(text)}
                        display={chatConversation.length > 1 ? false : true}
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

    flatList: {
        paddingHorizontal: 5,
        paddingTop: 10,
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
    }
});