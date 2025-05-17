import { Feather } from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { EPBText, EPMText, EPRText, EPSBText } from '../StyledText';

interface Chat {
    title: string;
    tag: string;
};

interface Section {
    date: string;
    id: string;
    chats: Chat[];
};

const chatHistoryData: Section[] = [
  {
    date: "Fri 09/05",
    id: "today-1",
    chats: [
      {
        title: "What is the best way to get people to like me?",
        tag: "How to be liked 😎"
      },
      {
        title: "What is the best feeling ever?",
        tag: "Ask me anything 🎱"
      }
    ]
  },
  {
    date: "Thu 08/05",
    id: "yesterday-1",
    chats: [
       {
        title: "What is the best way to get people to like me?",
        tag: "Ask me anything 🎱"
      },
      {
        title: "What is the best way to get people to like me?",
        tag: "Ask me anything 🎱"
      },
      {
        title: "What is the best way to get people to like me?",
        tag: "Ask me anything 🎱"
      }
    ]
  },
  {
    date: "Wed 07/05",
    id: "lastweek-1",
    chats: [
      {
        title: "What is the best way to get people to like me?",
        tag: "Ask me anything 🎱"
      },
      {
        title: "What is the best way to get people to like me?",
        tag: "Ask me anything 🎱"
      },
      {
        title: "What is the best way to get people to like me?",
        tag: "Ask me anything 🎱"
      }
    ]
  },
  {
    date: "Tue 06/05", 
    id: "lastmonth-1",
    chats: [
      {
        title: "What is the best way to get people to like me?",
        tag: "Ask me anything 🎱"
      },
      {
        title: "What is the best way to get people to like me?",
        tag: "Ask me anything 🎱"
      }
    ]
  }
];

const ChatHistory = () => {
    
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


    const renderSection = ({ item: section }: { item: Section }) => (
        <React.Fragment>
            <EPBText color="#B0B0B0" style={styles.dateHeader}>
                {section.date}
            </EPBText>
            
            {section.chats.map((chat: Chat, chatIndex: number) => (
                <View key={`${section.id}-chat-${chatIndex}`} style={styles.chatItem}>
                    <View style={styles.chatContent}>
                        <EPMText style={styles.chatTitle}>
                            {chat.title}
                        </EPMText>
                    
                        <EPRText color="#B0B0B0" style={styles.tagText}>
                            {chat.tag}
                        </EPRText>
                    </View>
                </View>
            ))}             
        </React.Fragment>
    );


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={chatHistoryData}
                renderItem={renderSection}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.buttonContainer}>
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
        width: "100%",
        marginTop: 30
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
    }
});