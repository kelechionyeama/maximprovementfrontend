import { Image } from 'expo-image';
import React from "react";
import { Animated, StyleSheet, View } from 'react-native';
import { EPMText, EPRText, EPSBText } from '../StyledText';
import { useUserProfileStore } from '@/store/userProfileStore';
import { generateSummary, capitalizeFirst } from '@/HelperFunctions';

const PrivateMemoryBox = ({ privateMemoryBoxIsLocked }: { privateMemoryBoxIsLocked: boolean }) => {

    const firstOpacity = React.useRef(new Animated.Value(0)).current;
    const secondOpacity = React.useRef(new Animated.Value(0)).current;

    const { userProfile } = useUserProfileStore();


    // UNLOCK THE MEMORY BOX
    React.useEffect(() => {
        if (privateMemoryBoxIsLocked) return;

        setTimeout(() => {
            Animated.sequence([
                Animated.timing(firstOpacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true
                }),
                Animated.timing(secondOpacity, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: true
                }),
            ]).start();
        }, 1000);
    }, [privateMemoryBoxIsLocked]);


    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>       
                    <EPSBText style={{ fontSize: 20 }}>
                        MAX's Private Memory
                    </EPSBText>

                    <Image 
                        source={require("@/assets/icons/memory.svg")} 
                        style={{ width: 24, height: 24 }}
                        contentFit="contain"
                    />
                </View>

                {privateMemoryBoxIsLocked ? (
                    <Image 
                        source={require("@/assets/icons/lock.png")} 
                        style={{ width: 84, height: 84 }}
                        contentFit="cover"
                    />
                ) : (
                    <View>
                        <Animated.View style={{ opacity: firstOpacity }}>
                            <EPMText style={styles.memoryText}>
                                {generateSummary(userProfile?.firstName || "", userProfile?.problemsToSolve || [])}
                            </EPMText>
                        </Animated.View>

                        <Animated.View style={{ opacity: secondOpacity }}>
                            <EPMText style={styles.memoryText1}>
                                {capitalizeFirst(userProfile?.firstName || "")} is {userProfile?.openToFamilyTalks ? "open" : "not open"} to discussing family matters
                            </EPMText>
                        </Animated.View>
                    </View>
                )}
            </View>

            <EPRText style={[styles.text, { opacity: privateMemoryBoxIsLocked ? 1 : 0 }]}>   
                Unlock to access <EPSBText>MAX's</EPSBText> private memory
            </EPRText>
        </>
    )
};

export default PrivateMemoryBox;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        alignItems: "center",
        gap: 20,
        paddingVertical: 20
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    text: {
        fontSize: 16,
        textAlign: "center",
        opacity: 0.8,
        marginTop: 25
    },

    memoryText: {
        fontSize: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: "white",
        paddingBottom: 15,
        marginHorizontal: 15,
        marginTop: 10
    },

    memoryText1: {
        fontSize: 16,
        marginHorizontal: 15,
        marginTop: 20
    }
});