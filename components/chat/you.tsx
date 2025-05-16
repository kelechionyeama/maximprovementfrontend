import { StyleSheet } from 'react-native';
import React from 'react';
import { EPBText, EPMText } from '../../StyledText';

const YouText = ({ text }: { text: string }) => {
    return (
        <>
            <EPBText style={styles.titleText}>
                You:
            </EPBText>

            <EPMText style={styles.messageText}>
                {text}
            </EPMText>
        </>
    )
};

export default YouText;

const styles = StyleSheet.create({
    titleText: {
        color: "#B0B0B0",
        fontSize: 16
    },

    messageText: {
        color: "white",
        fontSize: 16,
        marginBottom: 20
    }
});