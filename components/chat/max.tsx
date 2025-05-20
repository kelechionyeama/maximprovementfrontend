import React from 'react';
import { StyleSheet } from 'react-native';
import { lightHaptic } from '../../HelperFunctions';
import { EPBText, EPMText } from '../../StyledText';

const MaxText = ({ text, onComplete, stream = true }: { text: string, onComplete?: () => void, stream?: boolean }) => {

    const [displayedText, setDisplayedText] = React.useState("");
    const [isComplete, setIsComplete] = React.useState(false);

    // TYPING EFFECT
    React.useEffect(() => {
        let currentIndex = 0;
        setDisplayedText("");
        setIsComplete(false);

        const streamText = async () => {
            if (!text) return;
            if (!stream) {
                setDisplayedText(text);
                setIsComplete(true);
                if (onComplete) onComplete();
                return;
            };

            while (currentIndex < text.length) {
                const nextChar = text[currentIndex];
                if (nextChar) {
                    setDisplayedText(prev => prev + nextChar);
                    if (nextChar === " " || currentIndex === text.length - 1) {
                        lightHaptic();
                    }
                    if (nextChar === "\n" || nextChar === "." || nextChar === ",") {
                        await new Promise(resolve => setTimeout(resolve, 150));
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 30));
                    }
                }
                currentIndex++;
            };

            setIsComplete(true);
            if (onComplete) onComplete();
        };

        streamText();

        // CLEANUP FUNCTION
        return () => {
            currentIndex = text?.length ?? 0;
        };
    }, [text, stream]);

    return (
        <>
            <EPBText color="#B0B0B0" style={styles.titleText}>
                MAX:
            </EPBText>

            <EPMText style={styles.messageText}>  
                {displayedText}
                {!isComplete && <EPMText style={styles.cursor}>|</EPMText>}
            </EPMText>
        </>
    )
};

export default MaxText;

const styles = StyleSheet.create({
    titleText: {
        color: "#B0B0B0",
        fontSize: 16
    },

    messageText: {
        fontSize: 16,
        marginBottom: 20
    },

    cursor: {
        opacity: 0.5
    }
});