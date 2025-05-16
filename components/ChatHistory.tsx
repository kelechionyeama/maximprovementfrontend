import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { EPBText, EPRText } from '../StyledText';

const chatHistoryData = [
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
    const [isAuthenticating, setIsAuthenticating] = useState(false);

   

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <MaterialCommunityIcons name="chevron-left" size={32} color="#E0E0E0" />
                <EPBText style={styles.headerText}>Chat History</EPBText>
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.contentContainer}
                contentContainerStyle={{
                    paddingHorizontal: 10,
                }}
            >
                <View
                style={styles.memoryContainer}
                >
                {chatHistoryData.map((section) => (
                  <React.Fragment key={section.id}>
                    <EPBText style={styles.dateHeader}>
                      {section.date}
                    </EPBText>
                    
                    {section.chats.map((chat, chatIndex) => (
                      <View key={`${section.id}-chat-${chatIndex}`} style={styles.chatItem}>
                        <View style={styles.chatContent}>
                          <EPRText style={styles.chatTitle}>
                            {chat.title}
                          </EPRText>
                          
                            <EPRText style={styles.tagText}>
                              {chat.tag}
                            </EPRText>
                   
                        </View>
                      </View>
                    ))}
                    
                   
               
                  </React.Fragment>
                ))}


                </View>
            </ScrollView>
           <View style={styles.buttonContainer}>
            <EPRText style={styles.text}>
                Clear Chat History
            </EPRText>
           </View>
        </SafeAreaView>
    )
}

export default ChatHistory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 80
    },
    headerContainer: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        flexDirection: "row",
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E0E0E0',
        flex: 1,
        textAlign: "center",

    },
    contentContainer: {
        width: "100%",
        flex: 1, 
    },
    image: {
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 16,
        color: '#FF5252',
        textAlign: 'center',
        width: "100%",
        marginTop: 30, 
    },
    button: {
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#E0E0E0",
    },
    buttonContainer: {
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
    },
    memoryContainer: {
        width: "100%",
        // backgroundColor: "#1E1E1E",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        overflow: 'hidden', // Required for Android shadow to work properly
        borderRadius: 20,
        padding: 15,
    },
    memoryText: {
        color: "#E0E0E0",
        fontSize: 14,
        fontWeight: "500",
        // marginBottom: 10,
    },
    divider: {
        height: 0.5,
        backgroundColor: "#B0B0B0",
        marginVertical: 15,
        width: "98%",
        alignSelf: "center",
    },
    dateHeader: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#E0E0E0",
        marginBottom: 10,
        marginTop: 20,
    },

    chatItem: {
     padding: 14,
     borderWidth: 0.5,
     borderColor: "rgba(176, 176, 176, 0.4)", // #B0B0B0 with 10% opacity
     backgroundColor: "#1E1E1E",
     borderRadius: 20,
     marginBottom: 10,

    },
    chatContent: {
        justifyContent: "space-between"
    },
    chatTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#FFF",
    },
    tagContainer: {
        backgroundColor: "#2E2E2E",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    tagText: {
        fontSize: 14,
        color: "#B0B0B0",
        marginTop: 5,
    },
    sectionDivider: {
        height: 1,
        backgroundColor: "#2E2E2E",
        marginVertical: 10,
    },
    
})