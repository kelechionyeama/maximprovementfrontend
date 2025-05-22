import { StyleSheet, View } from 'react-native';
import React from 'react';
import { EPMText } from '@/StyledText';

const ChatDate = () => {
    return (
        <View style={styles.container}>
            <View style={styles.divider} />

            <EPMText color="#B0B0B0" style={{ fontSize: 16 }}>
                Today
            </EPMText>

            <View style={styles.divider} />
        </View>
    )
};

export default ChatDate;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 20
    },

    divider: {
        borderWidth: .8,
        borderColor: "#B0B0B0",
        width: "40%",
        height: .8
    }
});