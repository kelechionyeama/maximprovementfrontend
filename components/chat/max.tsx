import React from 'react';
import { StyleSheet } from 'react-native';
import { lightHaptic } from '../../HelperFunctions';
import { EPBText, EPMText } from '../../StyledText';

const MaxText = ({ text, onComplete }: { text: string, onComplete?: () => void }) => {

    const [displayedText, setDisplayedText] = React.useState("");
    const [isComplete, setIsComplete] = React.useState(false);

    // TYPING EFFECT
    React.useEffect(() => {
        let currentIndex = 0;
        setDisplayedText("");
        setIsComplete(false);

        const streamText = async () => {
            if (!text) return; // GUARD AGAINST UNDEFINED TEXT
            
            while (currentIndex < text.length) {
                const nextChar = text[currentIndex];

                if (nextChar) { // ONLY UPDATE IF WE HAVE A VALID CHARACTER
                    setDisplayedText(prev => prev + nextChar);
                    
                    // CHECK IF WE'VE REACHED A WORD BOUNDARY (SPACE OR END OF TEXT)
                    if (nextChar === " " || currentIndex === text.length - 1) {
                        lightHaptic();
                    };

                    // ADD PAUSE FOR NEWLINES
                    if (nextChar === "\n" || nextChar === "." || nextChar === ",") {
                        await new Promise(resolve => setTimeout(resolve, 150));
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 30));
                    };
                };

                currentIndex++;
            };
            setIsComplete(true);
            if (onComplete) onComplete();
        };

        streamText();

        // CLEANUP FUNCTION
        return () => {
            currentIndex = text.length; // STOP THE STREAMING
        };
    }, [text]);

    return (
        <>
            <EPBText style={styles.titleText}>
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
        color: "white",
        fontSize: 16,
        marginBottom: 20
    },

    cursor: {
        opacity: 0.5
    }
});