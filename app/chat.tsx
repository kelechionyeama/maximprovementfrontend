import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { useNavigation } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { EPBText, EPMText } from '../StyledText';

const Chat = () => {

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


    return (
        <SafeAreaView style={styles.container}>
            <EPBText style={{ color: "#B0B0B0", fontSize: 16 }}>
                MAX:
            </EPBText>

            <EPMText style={{ color: "white", fontSize: 16, marginTop: 3 }}>
                What's your name?
            </EPMText>
        </SafeAreaView>
    )
}

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },

    
});