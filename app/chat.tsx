import { StyleSheet, SafeAreaView, Platform, KeyboardAvoidingView, FlatList, TextInput, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EPBText, EPMText } from '../StyledText';
import { LoadingBubble } from '@/components/chat/loadingBubble';
import MaxText from '../components/chat/max';
import YouText from '../components/chat/you';

interface ChatMessage {
    text: string;
    isUser: boolean;
};

const Chat = () => {

    const [chatConversation, setChatConversation] = React.useState<ChatMessage[]>([]);
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const flatListRef = React.useRef<FlatList>(null);
    const inputRef = React.useRef<TextInput>(null);

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <EPBText style={{ color: "white", fontSize: 18 }}>
                    Get Set Up
                </EPBText>
            ),
            headerLeft: () => (
                <Ionicons name="chevron-back-outline" size={24} color="white" />
            ),
            headerStyle: {
                backgroundColor: "black"
            },
            contentStyle: {
				borderWidth: 0.5,
				borderTopColor: "white"
			}
        });
    }, []);


    const handleSend = () => {
        setChatConversation([...chatConversation, { text: message, isUser: true }]);
        setMessage("");
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
                    style={{ marginBottom: 140 }}
                    ListFooterComponent={loading ? <LoadingBubble /> : null}
                    renderItem={({ item, index }) => {
                        return item.isUser ? <YouText text={item.text} /> : <MaxText text={item.text} />;
                    }}
                />

                <View style={styles.textInputContainer}>
                    <TextInput
                        ref={inputRef}
                        style={styles.textInput}
                        placeholder="Enter your first name"
                        placeholderTextColor="#B0B0B0"
                        value={message}
                        onChangeText={setMessage}
                        multiline={false}
                    />

                    <TouchableOpacity onPress={handleSend}>
                        <Ionicons 
                            name="send" 
                            size={24} 
                            color="#B0B0B0" 
                            style={{ marginLeft: 8 }} 
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },

    flatList: {
        paddingHorizontal: 5,
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
        lineHeight: 20
    },

});