import { StyleSheet } from 'react-native';
import React from 'react';
import { EPBText, EPMText } from '../../StyledText';

const YouText = ({ text }: { text: string }) => {
    return (
        <>
            <EPBText color="#B0B0B0" style={styles.titleText}>
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
        fontSize: 16
    },

    messageText: {
        fontSize: 16,
        marginBottom: 20
    }
});