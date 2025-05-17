import Octicons from '@expo/vector-icons/Octicons';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { EPRText, EPSBText, EPMText } from '../../../StyledText';

const privateMemories = [
  {
    id: '1',
    memory: 'Chike is interested in making new friends after moving to Sweden for his masters degree programme in biotechnology.'
  },
  {
    id: '2',
    memory: 'Chike is interested in making new friends after moving to Sweden for his masters degree programme in biotechnology.'
  },
  {
    id: '3',
    memory: 'Chike is interested in making new friends after moving to Sweden for his masters degree programme in biotechnology.'
  },
  {
    id: '4',
    memory: 'User is allergic to peanuts and has mentioned this several times when discussing food.'
  },
  {
    id: '5',
    memory: 'User enjoys hiking on weekends, particularly in national parks.'
  },
  {
    id: '6',
    memory: 'User shared they are learning to play the guitar and practicing daily.'
  },
  {
    id: '7',
    memory: 'User mentioned their sister is expecting a baby in December.'
  }
];

const PrivateMemory = () => {

    const navigation = useNavigation();

    // HEADER NAVIGATION
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (<EPSBText style={{ fontSize: 20 }}>Private Memory</EPSBText>),
            headerStyle: {
				backgroundColor: "black"
			},
            headerShadowVisible: false
        });
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.memoryContainer}>
                    {privateMemories.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <EPMText style={styles.memoryText}>
                                {item.memory}
                            </EPMText>

                            {index < privateMemories.length - 1 && (
                                <View style={styles.divider} />
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </ScrollView>

           <TouchableOpacity style={styles.buttonContainer}>
                <EPRText color="#FF5252" style={styles.text}>
                    Clear Private Memory
                </EPRText>
           </TouchableOpacity>
        </SafeAreaView>
    )
}

export default PrivateMemory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: 'space-between'
    },

    contentContainer: {
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 80,
        flex: 1
    },

    memoryContainer: {
        width: "100%",
        backgroundColor: "#1E1E1E",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 20,
        padding: 15
    },
    
    text: {
        fontSize: 16,
        textAlign: 'center'
    },
    
    buttonContainer: {
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        zIndex: 1,
        padding: 20,
        marginBottom: 35
    },

    memoryText: {
        fontSize: 14
    },
    
    divider: {
        height: 0.5,
        backgroundColor: "#B0B0B0",
        marginVertical: 15,
        width: "98%",
        alignSelf: "center"
    }
});