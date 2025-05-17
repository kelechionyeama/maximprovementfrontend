import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { EPMText } from "../../StyledText";

interface SuggestedRepliesProps {
    replies: string[];
    onQuestionPress: (title: string) => void;
};

const SuggestedReplies = ({ replies, onQuestionPress }: SuggestedRepliesProps) => {
    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {replies.map((reply) => (
                <Pressable 
                    key={reply} 
                    onPress={() => onQuestionPress(reply)} 
                    style={styles.questionContainer}
                >
                    <View style={styles.questionContent}>
                        <EPMText style={styles.questionTitle}>
                            {reply}
                        </EPMText>
                    </View>
                </Pressable>
            ))}
        </ScrollView>
    )
};

export default React.memo(SuggestedReplies);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        gap: 10
    },

    questionContainer: {
        borderWidth: 0.5,
        borderColor: "rgba(176, 176, 176, 0.4)",
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        justifyContent: "center",
        marginBottom: 10,
        maxWidth: 150
    },

    questionContent: {
        paddingHorizontal: 16,
        paddingVertical: 10
    },

    questionTitle: {
        fontSize: 14
    }
});