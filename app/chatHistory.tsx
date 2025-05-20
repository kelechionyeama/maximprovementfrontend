import React from 'react';
import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet,
	TouchableOpacity, View } from 'react-native';
import { chatHistoryApi } from '@/api/ChatHistoryApi';
import { chatHistoryMapping } from '@/ExportedArrays';
import { formatChatHistoryDate } from '@/HelperFunctions';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useNavigation } from 'expo-router';
import { EPBText, EPMText, EPRText, EPSBText } from '../StyledText';

interface Chat {
    title: string;
    tag: string;
	icon: any;
};

interface Section {
    date: string;
    id: string;
    chats: Chat[];
};

const ChatHistory = () => {

	const [unformattedChatHistory, setUnformattedChatHistory] = React.useState<any[]>([]);
	const [chatHistory, setChatHistory] = React.useState<Section[]>([]);
	const [loading, setLoading] = React.useState<boolean>(true);

    const navigation = useNavigation();

    // HEADER NAVIGATION
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (<View />),
            headerTitle: () => (<EPSBText style={{ fontSize: 20 }}>Chat History</EPSBText>),
            headerRight: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: "black"
            },
            headerShadowVisible: false
        });
    }, []);


	// GET CHAT HISTORY
	React.useEffect(() => {
		(async () => {
			try {
				const response = await chatHistoryApi({}, "get");		
				const data = await response?.json();
				if (!data || !Array.isArray(data)) {
					setLoading(false);
					return;
				};
	
				const sections = data.map((doc: any) => {
					return {
						date: formatChatHistoryDate(doc?.updatedAt),
						id: doc?.id,
						chats: [
							{
								title: doc?.messagesArray[2]?.content,
								tag: chatHistoryMapping[doc?.feature as keyof typeof chatHistoryMapping]?.title,
								icon: chatHistoryMapping[doc?.feature as keyof typeof chatHistoryMapping]?.icon
							}
						]
					};
				});

				setUnformattedChatHistory(data);
				setChatHistory(sections);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				Alert.alert("Oops!", "We're working on a fix, please try again later.");
			}
		})();
	}, []);


	// NAVIGATE TO CHAT
	const handleNavigate = (id: string) => {
		const chat = unformattedChatHistory.find((chat: any) => chat.id === id);

		const title = chatHistoryMapping[chat?.feature as keyof typeof chatHistoryMapping]?.title;
		const params = chat?.feature;
		const chatHistory = chat;

		const feature = { title, params, chatHistory }; 
		router.push({ pathname: "/chat", params: { feature: JSON.stringify(feature) } });
	};


    const renderSection = ({ item: section }: { item: Section }) => (
        <React.Fragment>
            <EPBText color="#B0B0B0" style={styles.dateHeader}>
                {section.date}
            </EPBText>
            
            {section.chats.map((chat: Chat) => (
                <TouchableOpacity onPress={() => handleNavigate(section.id)} key={section.id} style={styles.chatItem}>
                    <View style={styles.chatContent}>
                        <EPMText style={styles.chatTitle}>
                            {chat.title}
                        </EPMText>
						
						<View style={styles.row}>
							<EPRText color="#B0B0B0" style={styles.tagText}>
								{chat.tag}
							</EPRText>

							<Image source={chat.icon} style={styles.image} />
						</View>
                    </View>
                </TouchableOpacity>
            ))}             
        </React.Fragment>
    );


	// ALERT DELETE FROM PRIVATE MEMORY
	const alertClearChatHistory = () => {
        Alert.alert("DANGER ZONE!!!", "Are you sure you want to clear your chat history?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => clearChatHistory() }
        ]);
    };


	// CLEAR CHAT HISTORY
	const clearChatHistory = async () => {
		try {
			const response = await chatHistoryApi({}, "clear");
			const data = await response?.json();

			if (data?.success) {
				setChatHistory([]);
				setLoading(false);
			} else {
				Alert.alert("Oops!", "Something went wrong. Please try again later.");
			}
		} catch (error) {}
	};


    return (
        <SafeAreaView style={styles.container}>
			{loading ? (
				<ActivityIndicator size="small" style={{ top: "45%" }} color="white" />
			) : (
				chatHistory.length > 0 ? (
					<FlatList
						data={chatHistory}
						renderItem={renderSection}
						keyExtractor={item => item.id}
						contentContainerStyle={styles.contentContainer}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<View style={styles.noPrivateMemoriesContainer}>
						<EPRText style={styles.noPrivateMemoriesText}>
							No chat history yet.
						</EPRText>
					</View>
				)
			)}

            <TouchableOpacity style={styles.buttonContainer} onPress={alertClearChatHistory}>
                <EPRText color="#FF5252" style={styles.text}>
                    Clear Chat History
                </EPRText>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

export default ChatHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: 'space-between',
        paddingBottom: 80
    },

    contentContainer: {
        paddingHorizontal: 15,
        paddingTop: 20
    },

    text: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
		width: "100%"
    },

    buttonContainer: {
        width: "90%",
        alignSelf: "center",
        justifyContent: "center"
    },
	 
    dateHeader: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 20
    },

    chatItem: {
        padding: 14,
        borderWidth: 0.5,
        borderColor: "rgba(176, 176, 176, 0.4)",
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        marginBottom: 10
    },

    chatContent: {
        justifyContent: "space-between"
    },

    chatTitle: {
        fontSize: 16
    },

    tagText: {
        fontSize: 14,
        marginTop: 5
    },

	noPrivateMemoriesContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    noPrivateMemoriesText: {
        fontSize: 20
    },

	image: {
		width: 20,
		height: 20,
		marginTop: 5
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5
	}
});