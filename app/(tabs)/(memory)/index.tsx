import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { EPMText, EPRText, EPSBText } from '../../../StyledText';
import { Image } from 'expo-image';
import { Button } from '../../../components/Button';
import { handleEnableFaceId } from '@/app/utils/faceIdAuth';

const privateMemoryData = [
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

    const [locked, setLocked] = React.useState(true);
    const [privateMemories, setPrivateMemories] = React.useState(privateMemoryData);

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


    // ALERT DELETE FROM PRIVATE MEMORY
    const alertDelete = (id: string) => {
        if (id === "9999") {
            Alert.alert("DANGER ZONE!!!", "Are you sure you want to delete all private memories?", [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => handleClearPrivateMemory() }
            ]);

            return;
        };
        
        Alert.alert("DANGER ZONE!!!", "Are you sure you want to delete this private memory?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteFromPrivateMemory(id) }
        ]);
    };


    // DELETE FROM PRIVATE MEMORY
    const deleteFromPrivateMemory = (id: string) => {
        setPrivateMemories(privateMemories.filter((item) => item.id !== id));
    };


    // HANDLE CLEAR PRIVATE MEMORY
    const handleClearPrivateMemory = () => {
        setPrivateMemories([]);
    };


    const handleUnlockWithFaceID = async () => {
        const result = await handleEnableFaceId();
        if (result.success) {
            setLocked(false);
        };
    };


    if (locked) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.lockWrapper}>
                    <Image 
                        source={require("@/assets/icons/lock.png")} 
                        style={{ width: 84, height: 84 }}
                        contentFit="cover"
                    />

                    <EPRText style={styles.lockText}>
                        Max remembers important things {'\n'} about you to understand you better.
                    </EPRText>
                </View>

                <View style={styles.buttonContainer1}>
                    <Button     
                        label="Unlock with Face ID" 
                        onPress={handleUnlockWithFaceID} 
                    />
                </View>
            </SafeAreaView>
        )
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {privateMemories.length > 0 ? (
                    <View style={styles.memoryContainer}>
                        {privateMemories.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <View style={styles.memoryItem}>
                                    <EPMText style={styles.memoryText}>
                                        {item.memory}
                                    </EPMText>
    
                                    <TouchableOpacity onPress={() => alertDelete(item.id)} style={styles.trashButton}>
                                        <EvilIcons name="trash" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
    
                                {index < privateMemories.length - 1 && (
                                    <View style={styles.divider} />
                                )}
                            </React.Fragment>
                        ))}
                    </View>
                ) : (
                    <View style={styles.noPrivateMemoriesContainer}>
                        <EPSBText style={styles.noPrivateMemoriesText}>
                            No private memories yet
                        </EPSBText>
                    </View>
                )}
            </ScrollView>

           <TouchableOpacity style={[styles.buttonContainer, { display: privateMemories.length > 0 ? "flex" : "none" } ]}
                onPress={() => alertDelete("9999")}>
                <EPRText color="#FF5252" style={styles.text}>
                    Clear Private Memory
                </EPRText>
           </TouchableOpacity>
        </SafeAreaView>
    )
};

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

    memoryItem: {
        position: 'relative',
        paddingRight: 15
    },

    trashButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: 2
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
    },

    noPrivateMemoriesContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    noPrivateMemoriesText: {
        fontSize: 20
    },

    lockWrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        top: -100
    },

    lockText: {
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
        marginHorizontal: 20
    },

    buttonContainer1: {
        position: "absolute",
        bottom: "20%", 
        width: "100%"
    }
});