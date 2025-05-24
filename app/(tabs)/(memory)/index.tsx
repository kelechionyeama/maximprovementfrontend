import { memoryApi } from '@/api/MemoryApi';
import { wait } from '@/HelperFunctions';
import { handleEnableFaceId } from '@/utils/faceIdAuth';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from '../../../components/Button';
import { EPMText, EPRText, EPSBText } from '../../../StyledText';

interface PrivateMemory {
    id: string;
    memory: string;
};

const PrivateMemory = () => {

    const [loading, setLoading] = React.useState<boolean>(true);
    const [locked, setLocked] = React.useState(true);
    const [privateMemories, setPrivateMemories] = React.useState<PrivateMemory[]>([]);
    const [deletingId, setDeletingId] = React.useState<string | null>(null);

    const navigation = useNavigation();

    /// TODO: TRACK IN MIXPANEL WHEN MEMORY GETS UNLOCKED, AND WHEN MEMORY IS DELETED


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


    // LOCK MEMORY WHEN NAVIGATED AWAY
    // useFocusEffect(
    //     React.useCallback(() => {
    //         return () => {
    //             setLocked(true);
    //         };
    //     }, [])
    // );


    // ALERT DELETE FROM PRIVATE MEMORY
    const alertDelete = (id: string) => {
        if (id === "9999") {
            Alert.alert("DANGER ZONE!!!", "Are you sure you want to delete all private memories?", [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => handleClearPrivateMemory() }
            ]);

            return;
        };
        
        Alert.alert("Delete Memory", "Are you sure you want to delete this private memory?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteFromPrivateMemory(id) }
        ]);
    };


    // DELETE FROM PRIVATE MEMORY
    const deleteFromPrivateMemory = async (id: string) => {
        try {
            setDeletingId(id);
            await memoryApi({ memoryIdForDeletion: id }, "deleteMemory");
            await wait(1000);
            setPrivateMemories(privateMemories.filter((item) => item.id !== id));
            setDeletingId(null);
        } catch (error) {
            setDeletingId(null);
            await wait(2000);
            Alert.alert("Oops!", "We're working on a fix, please try again later.");
        }
    };


    // HANDLE CLEAR PRIVATE MEMORY
    const handleClearPrivateMemory = async () => {
        setLoading(true);

        try {
            await memoryApi({}, "deleteAllMemories");
            await wait(1000);

            setLoading(false);
            setPrivateMemories([]);
        } catch (error) {
            await wait(2000);
            setLoading(false);
            Alert.alert("Oops!", "We're working on a fix, please try again later.");
        }
    };


    // HANDLE UNLOCK WITH FACE ID
    const handleUnlockWithFaceID = async () => {
        const result = await handleEnableFaceId();

        if (result.success) {
            setLocked(false);

            try {
                const response = await memoryApi({}, "getMemories");
                if (response) {
                    const data = await response.json();

                    setPrivateMemories(data);
                    setLoading(false);
                };

            } catch (error) {
                console.log("error", error);
                await wait(3000);
				setLoading(false);
				Alert.alert("Oops!", "We're working on a fix, please try again later.");
            }
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
                {loading ? (
                    <ActivityIndicator size="small" style={{ top: "45%" }} color="white" />
                ) : (
                    privateMemories.length > 0 ? (
                        <View style={styles.memoryContainer}>
                            {privateMemories.map((item, index) => (
                                <React.Fragment key={item.id}>
                                    <View style={styles.memoryItem}>
                                        <EPMText style={styles.memoryText}>
                                            {item.memory}
                                        </EPMText>
        
                                        <TouchableOpacity onPress={() => alertDelete(item.id)} 
                                            style={styles.trashButton} disabled={deletingId === item.id}>
                                            {deletingId === item.id ? (
                                                <ActivityIndicator size="small" color="white" />
                                            ) : (
                                                <EvilIcons name="trash" size={24} color="white" />
                                            )}
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
                    )
                )}
            </ScrollView>

           <TouchableOpacity style={[styles.buttonContainer, { display: privateMemories.length > 0 && !loading ? "flex" : "none" } ]}
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