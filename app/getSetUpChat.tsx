import { Button } from '@/components/Button';
import PrivateMemoryBox from '@/components/PrivateMemoryBoxes';
import { joinWithAnd, lowercaseFirst, wait } from '@/HelperFunctions';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
    Animated, FlatList, Keyboard, KeyboardAvoidingView, Platform,
    SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View
} from 'react-native';
import { LoadingBubble } from '../components/chat/loadingBubble';
import MaxText from '../components/chat/max';
import YouText from '../components/chat/you';
import { needHelpWith } from '../ExportedArrays';
import { EPBText, EPMText } from '../StyledText';

interface ChatMessage {
    text: string;
    isUser: boolean;
    options?: string[];
    showPrivateMemoryBox?: boolean;
};

const Chat = () => {

    const [chatConversation, setChatConversation] = React.useState<ChatMessage[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [userName, setUserName] = React.useState<string>("");
    const [showInput, setShowInput] = React.useState(false);
    const [showButton, setShowButton] = React.useState(false);
    const [maxIsStreaming, setMaxIsStreaming] = React.useState(false);
    const [showAdviceOptions, setShowAdviceOptions] = React.useState(false);
    const [showContinueButton, setShowContinueButton] = React.useState(true);
    const [showFamilyOptions, setShowFamilyOptions] = React.useState(false);

    const [selectedOption, setSelectedOption] = React.useState<string[]>([]);

    const [privateMemoryBoxIsLocked, setPrivateMemoryBoxIsLocked] = React.useState(false);
    
    const keyboardOpacity = React.useRef(new Animated.Value(0)).current;
    const buttonOpacity = React.useRef(new Animated.Value(0)).current;
    const optionOpacities = React.useRef(needHelpWith.map(() => new Animated.Value(0))).current;
    const familyOptionsOpacity = React.useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();
    const inputRef = React.useRef<TextInput>(null);
    const flatListRef = React.useRef<any>(null);


    // HEADER NAVIGATION
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <EPBText style={{ fontSize: 18 }}>
                    Get set up
                </EPBText>
            ),
            headerLeft: () => (<View />),
            headerStyle: {
                backgroundColor: "black"
            },
            contentStyle: {
                borderWidth: 0.5,
                borderTopColor: "white"
            }
        });
    }, []);


    // SHOW FIRST MESSAGE AFTER 1.5 SECONDS
    React.useEffect(() => {
        // SHOW FIRST MESSAGE AFTER 1.5 SECONDS
        (async () => {
            await wait(2500);
            setMaxIsStreaming(true);
            setChatConversation([{ text: "What's up, I'm Max! What's your name?", isUser: false }]);
            setLoading(false);
        })();
    }, []);


    // HANDLE KEYBOARD SEND BUTTON
    const handleSend = async () => {
        if (userName.trim()) {
            // DISMISS KEYBOARD
            Keyboard.dismiss();
            
            // ADD USER'S NAME TO CHAT
            setChatConversation(prev => [...prev, { 
                text: userName.trim(),
                isUser: true
            }]);
            
            // SHOW LOADING STATE
            setLoading(true);
            
            // HIDE INPUT
            setShowInput(false);
            
            // AFTER 1.5 SECONDS, SHOW THE RESPONSE AND HIDE LOADING
            await wait(2500);     
            setChatConversation(prev => [...prev, { 
                text: "Nice to meet you, " + userName.trim() + "!" + 
                        "\n\nI was created by two guys who struggled with confidence in high school." + 
                        "\n\nNow, I'm here to be the big brother they wish they had.",
                isUser: false
            }]);
            setLoading(false);
            setUserName("");

            // WAIT FOR MAXTEXT TO FINISH STREAMING BEFORE SHOWING BUTTON
            setMaxIsStreaming(true);
            await wait(1000);

            setShowButton(true);
            // ANIMATE BUTTON IN
            Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();     
        };
    };


    const handleSoundsGood = async () => {
        setShowButton(false);

        // ADD USER'S TEXT - SOUNDS GOOD
        setChatConversation(prev => [...prev, { 
            text: "Sounds good",
            isUser: true
        }]);

        setLoading(true);
        
        await wait(3000);

        setChatConversation(prev => [
            ...prev,
            { 
                text: "Now tell me, what exactly do you need advice on?",
                isUser: false
            },
            {
                text: "",
                isUser: false,
                options: needHelpWith
            }
        ]);
        setLoading(false);
        setMaxIsStreaming(true);
    };


    const handleContinue = async () => {
        setShowContinueButton(false);

        const mappedOptions = selectedOption.map(opt => {
            if (opt === "Dating & relationships") return "dating";
            if (opt === "Getting people to like me") return "being likable";
            return lowercaseFirst(opt);
        });

        let helpText = "";
        if (selectedOption.length === needHelpWith.length) {
            helpText = "all the above";
        } else {
            helpText = joinWithAnd(mappedOptions);
        }

        setChatConversation(prev => [
            ...prev,
            { 
                text: "I need help with " + helpText,
                isUser: true
            }
        ]);

        setLoading(true);
        await wait(1500);

        setChatConversation(prev => [
            ...prev,
            { 
                text: "Got it—I'd focus on those. Are you open to talking about family too, or prefer not to?",
                isUser: false
            }
        ]);
        flatListRef.current?.scrollToEnd({ animated: true });
        setMaxIsStreaming(true);
        setLoading(false);
        flatListRef.current?.scrollToEnd({ animated: true });
    };


    // HANDLE OPEN TO FAMILY TALKS OPTION PRESS
    const handleFamilyOptionPress = async (open: boolean) => {
        flatListRef.current?.scrollToEnd({ animated: true });

        setChatConversation(prev => [
            ...prev,
            { 
                text: open ? "I'm open to it" : "Not right now",
                isUser: true
            }
        ]);

        setLoading(true);
        setShowFamilyOptions(false);

        await wait(1500);

        setChatConversation(prev => [
            ...prev,
            {
                text: "The more you share, the more I get you—and the better I can help",
                isUser: false
            },
            {
                text: "",
                isUser: false,
                showPrivateMemoryBox: true
            }
        ]);
        setMaxIsStreaming(true);
        setLoading(false);
        flatListRef.current?.scrollToEnd({ animated: true });
    };
    

    const animateOptions = React.useCallback(() => {
        // ANIMATE ALL ITEMS WITH STAGGER
        Animated.stagger(100, 
            optionOpacities.map(opacity => 
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 250,
                    useNativeDriver: true
                })
            )
        ).start(() => {
            // AFTER EACH ANIMATION IN THE STAGGER COMPLETES:
            flatListRef.current?.scrollToEnd({ animated: true });
        });
    }, [optionOpacities]);


    // ANIMATE OPTIONS WHEN ADVICE OPTIONS ARE SHOWN
    React.useEffect(() => {
        if (showAdviceOptions) {
            (async () => await wait(1000))();
            animateOptions();
        };
    }, [showAdviceOptions, animateOptions]);


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>

                <FlatList
                    ref={flatListRef}
                    data={chatConversation}
                    contentContainerStyle={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 140, backgroundColor: "blue" }} 
                    renderItem={({ item, index }) => {
                        if (item.showPrivateMemoryBox) {
                            return <PrivateMemoryBox privateMemoryBoxIsLocked={privateMemoryBoxIsLocked} />;
                        }
                        if (item.options) {
                            if (!showAdviceOptions) return null;
                            return (
                                <View style={{ marginBottom: 10 }}>
                                    {item.options.map((option, idx) => (
                                        <TouchableOpacity key={idx} onPress={() => {
                                            if (selectedOption.includes(option)) {
                                                setSelectedOption(selectedOption.filter(item => item !== option));
                                            } else {
                                                setSelectedOption([...selectedOption, option]);
                                            }
                                        }}>
                                            <Animated.View style={[styles.needHelpWithWrapper, { opacity: optionOpacities[idx] }]}>
                                                <EPMText style={{ fontSize: 16 }}>
                                                    {option}
                                                </EPMText>

                                                <Ionicons name={selectedOption.includes(option) ? "checkmark-circle-sharp" : 
                                                    "radio-button-off-outline"} size={24} color="white" />
                                            </Animated.View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            );
                        };

                        if (item.isUser) {
                            return <YouText text={item.text} />;
                        } else {
                            // ONLY PASS ONCOMPLETE TO THE FIRST MAX MESSAGE
                            const isFirstMax = index === 0 && !item.isUser && !item.options;
                            const isAdviceQuestion = item.text.includes("Now tell me, what exactly do you need advice on?");
                            const isFamilyQuestion = item.text.includes("Are you open to talking about family");
                            return (
                                <MaxText
                                    text={item.text}
                                    onComplete={isFirstMax ? () => {
                                        setMaxIsStreaming(false);
                                        setShowInput(true);
                                        Animated.timing(keyboardOpacity, {
                                            toValue: 1,
                                            duration: 1000,
                                            useNativeDriver: true
                                        }).start(() => {
                                            setTimeout(() => {
                                                inputRef?.current?.focus();
                                            }, 100);
                                        });
                                    } : isAdviceQuestion ? () => {
                                        setMaxIsStreaming(false);
                                        setShowAdviceOptions(true);
                                    } : isFamilyQuestion ? () => {
                                        setMaxIsStreaming(false);
                                        setShowFamilyOptions(true);
                                        Animated.timing(familyOptionsOpacity, {
                                            toValue: 1,
                                            duration: 500,
                                            useNativeDriver: true
                                        }).start();
                                    } : () => setMaxIsStreaming(false)}
                                />
                            );
                        }
                    }}
                    ListFooterComponent={loading ? <LoadingBubble /> : null}
                />

                {showInput && (
                    <Animated.View style={[styles.textInputContainer, { opacity: keyboardOpacity }]}>
                        <TextInput
                            ref={inputRef}
                            style={styles.textInput}
                            placeholder="Enter your name"
                            placeholderTextColor="#B0B0B0"
                            value={userName}
                            onChangeText={setUserName}
                            multiline={false}
                        />

                        <TouchableOpacity onPress={handleSend}>
                            <Ionicons 
                                name="send" 
                                size={24} 
                                color="#B0B0B0" 
                                style={{ marginLeft: 8 }} 
                            />
                        </TouchableOpacity>
                    </Animated.View>
                )}

                {showButton && !maxIsStreaming && (
                    <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
                        <Button 
                            onPress={handleSoundsGood}
                            style={{ marginHorizontal: 10, marginBottom: 10 }} 
                            label="Sounds good"
                        />
                    </Animated.View>
                )}

                {showAdviceOptions && selectedOption.length > 0 && showContinueButton && (
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={handleContinue}
                            style={{ marginHorizontal: 10 }} 
                            label="Continue"
                        />
                    </View>
                )}

                {showFamilyOptions && (
                    <Animated.View style={{ opacity: familyOptionsOpacity }}>
                        <View style={styles.buttonContainer}>
                            <Button 
                                onPress={() => handleFamilyOptionPress(true)}
                                style={{ marginHorizontal: 10, marginVertical: 10 }} 
                                label="I'm open to it"
                            />

                            <TouchableOpacity onPress={() => handleFamilyOptionPress(false)}>
                                <EPMText style={{ fontSize: 16, textAlign: "center", opacity: 0.8 }}>
                                    Skip
                                </EPMText>                     
                            </TouchableOpacity>                     
                        </View>
                    </Animated.View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },

    flatList: {
        paddingHorizontal: 5,
        backgroundColor: "red"
    },

    textInputContainer: {
        alignItems: "center",
        backgroundColor: '#232323',
        borderRadius: 50,
        paddingHorizontal: 16,
        paddingVertical: 6,
        minHeight: 55,
        maxHeight: 100,
        flexDirection: "row"
    },

    textInput: {
        flex: 1,
        color: 'white', 
        fontSize: 16, 
        paddingVertical: 8,
        fontFamily: "EPM",
        lineHeight: 20
    },

    needHelpWithWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10
    },

    buttonContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%"
    }
});