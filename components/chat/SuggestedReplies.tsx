import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { EPMText } from "../../StyledText";

interface SuggestedRepliesProps {
    replies: string[];
    onQuestionPress: (title: string) => void;
    display: boolean;
};

const SuggestedReplies = ({ replies, onQuestionPress, display }: SuggestedRepliesProps) => {
    if (!display) return null;

    return (
        <FlatList
            data={replies}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    onPress={() => onQuestionPress(item)} 
                    style={styles.questionContainer}
                >
                    <View style={styles.questionContent}>
                        <EPMText style={styles.questionTitle}>
                            {item}
                        </EPMText>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
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