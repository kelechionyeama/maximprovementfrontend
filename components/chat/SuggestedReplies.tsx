import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { EPMText } from "../../StyledText";

interface SuggestedRepliesProps {
    replies: string[];
    onQuestionPress: (title: string) => void;
    display: boolean;
};

const SuggestedReplies = ({ replies, onQuestionPress, display }: SuggestedRepliesProps) => {
    return (
        <View style={[styles.container, { display: display ? "flex" : "none", zIndex: 1 }]}>
            {replies?.map((reply) => (
                <TouchableOpacity 
                    key={reply} 
                    onPress={() => onQuestionPress(reply)} 
                    style={styles.questionContainer}
                >
                    <View style={styles.questionContent}>
                        <EPMText style={styles.questionTitle}>
                            {reply}
                        </EPMText>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
};

export default React.memo(SuggestedReplies);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        gap: 10,
        zIndex: 1,
        flexDirection: "row"
    },

    questionContainer: {
        borderWidth: 0.5,
        borderColor: "rgba(176, 176, 176, 0.4)",
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        justifyContent: "center",
        marginBottom: 10
    },

    questionContent: {
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 230
    },

    questionTitle: {
        fontSize: 14,
        paddingHorizontal: 20
    }
});