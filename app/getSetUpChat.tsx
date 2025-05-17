import { Button } from '@/components/Button';
import OptionsSelector from '@/components/OptionsSelector';
import PrivateMemoryBox from '@/components/PrivateMemoryBoxes';
import { joinWithAnd, lowercaseFirst, leaveRating, wait } from '@/HelperFunctions';
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
import { handleEnableFaceId } from '@/app/utils/faceIdAuth';

interface ChatMessage {
    text: string;
    isUser: boolean;
    options?: string[];
    showPrivateMemoryBox?: boolean;
};

const GetSetUpChat = () => {

    const [chatConversation, setChatConversation] = React.useState<ChatMessage[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [userName, setUserName] = React.useState<string>("");
    const [showInput, setShowInput] = React.useState(false);
    const [showButton, setShowButton] = React.useState(false);
    const [maxIsStreaming, setMaxIsStreaming] = React.useState(false);
    const [showAdviceOptions, setShowAdviceOptions] = React.useState(false);
    const [showContinueButton, setShowContinueButton] = React.useState(true);
    const [showFamilyOptions, setShowFamilyOptions] = React.useState(false);
    const [showPrivateMemoryBox, setShowPrivateMemoryBox] = React.useState(false);

    const [selectedOption, setSelectedOption] = React.useState<string[]>([]);

    const [privateMemoryBoxIsLocked, setPrivateMemoryBoxIsLocked] = React.useState(true);
    const [showUnlockButton, setShowUnlockButton] = React.useState(false);
    const [showContinueAfterPrivateMemoryBox, setShowContinueAfterPrivateMemoryBox] = React.useState(false);
    const [showRate5StarsButton, setShowRate5StarsButton] = React.useState(false);
    const [showInnerRate5StarsButton, setShowInnerRate5StarsButton] = React.useState(true);
    
    const keyboardOpacity = React.useRef(new Animated.Value(0)).current;
    const buttonOpacity = React.useRef(new Animated.Value(0)).current;
    const optionOpacities = React.useRef(needHelpWith.map(() => new Animated.Value(0))).current;
    const familyOptionsOpacity = React.useRef(new Animated.Value(0)).current;
    const privateMemoryBoxOpacity = React.useRef(new Animated.Value(0)).current;

    const navigation = useNavigation();
    const inputRef = React.useRef<TextInput>(null);
    const flatListRef = React.useRef<any>(null);

    const text1 = "What's up, I'm Max! What's your name?";
    const text2 = "Nice to meet you, " + userName.trim() + "!" + 
                        "\n\nI was created by two guys who struggled with confidence in high school." + 
                        "\n\nNow, I'm here to be the big brother they wish they had.";
    const text3 = "Now tell me, what do you need help with?";
    const text4 = "Got it—I'd focus on " + (selectedOption.length > 1 ? "those" : "that") + ". Are you open to talking about family matters too, or prefer not to?";
    const text5 = "As we keep talking, I'll store stuff I know about you in my private memory.";
    const text6 = "One last thing, " + userName.trim() + "—mind giving me 5 stars so others can find me?";
    const text7 = "See you on the other side, " + userName.trim() + "\n\nArchiving this chat...";


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
                borderWidth: 0.3,
                borderTopColor: "white"
            }
        });
    }, []);


    // SHOW FIRST MESSAGE AFTER 1.5 SECONDS
    React.useEffect(() => {
        (async () => {
            await wait(1500);
            setMaxIsStreaming(true);
            setChatConversation([{ text: text1, isUser: false }]);
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

            // HIDE INPUT
            setShowInput(false);
            
            // SHOW LOADING STATE
            await wait(500);  
            setLoading(true);
            
            // AFTER 1.5 SECONDS, SHOW THE RESPONSE AND HIDE LOADING
            await wait(2500);     
            setChatConversation(prev => [...prev, { 
                text: text2,
                isUser: false
            }]);
            setLoading(false);

            // WAIT FOR MAXTEXT TO FINISH STREAMING BEFORE SHOWING BUTTON
            setMaxIsStreaming(true);
            setShowButton(true);

            await wait(1000);
            // ANIMATE SOUNDS GOOD BUTTON IN
            Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            }).start();     
        };
    };


    // HANDLE SOUNDS GOOD BUTTON PRESS
    const handleSoundsGood = async () => {
        setShowButton(false);

        // ADD USER'S TEXT - SOUNDS GOOD
        setChatConversation(prev => [...prev, { 
            text: "Sounds good",
            isUser: true
        }]);

        await wait(1000);

        setLoading(true);       
        await wait(2500);

        setChatConversation(prev => [
            ...prev,
            { 
                text: text3,
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


    // HANDLE CONTINUE BUTTON AFTER ADVICE OPTIONS ARE SELECTED
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

        setChatConversation(prev => [...prev,
            { 
                text: "I need help with " + helpText,
                isUser: true
            }
        ]);

        await wait(200);
        flatListRef.current?.scrollToEnd({ animated: true });

        setLoading(true);
        await wait(200);
        flatListRef.current?.scrollToEnd({ animated: true });

        await wait(1500);

        setChatConversation(prev => [...prev,
            { 
                text: text4,
                isUser: false
            }
        ]);

        await wait(200);
        flatListRef.current?.scrollToEnd({ animated: true });

        setMaxIsStreaming(true);
        setLoading(false);
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

        await wait(100);
        flatListRef.current?.scrollToEnd({ animated: true });

        setShowFamilyOptions(false);
        setLoading(true);
 
        await wait(1500);

        setChatConversation(prev => [
            ...prev,
            {
                text: text5,
                isUser: false
            },
            {
                text: "",
                isUser: false,
                showPrivateMemoryBox: true
            }
        ]);

        await wait(200);
        flatListRef.current?.scrollToEnd({ animated: true });

        setMaxIsStreaming(true);
        setLoading(false);
    };


    // HANDLE UNLOCK WITH FACE ID
    const handleUnlockWithFaceID = async () => {
        const result = await handleEnableFaceId();
        if (result.success) {
            setPrivateMemoryBoxIsLocked(false);
            setShowUnlockButton(false);

            await wait(3000);
            setShowContinueAfterPrivateMemoryBox(true);
        };
    };


    // HANDLE CONTINUE AFTER VIEWING PRIVATE MEMORY BOX
    const handleContinueAfterPrivateMemoryBox = async () => {
        setLoading(true);
        await wait(200);
        flatListRef.current?.scrollToEnd({ animated: true });

        setShowContinueAfterPrivateMemoryBox(false);

        setChatConversation(prev => [...prev,
            { 
                text: text6,
                isUser: false
            }
        ]);

        await wait(200);
        flatListRef.current?.scrollToEnd({ animated: true });

        setMaxIsStreaming(true);
        setLoading(false);
    };


    // HANDLE RATE 5 STARS BUTTON PRESS
    const handleRate5Stars = async () => {
        await leaveRating();
        await wait(2000);
        setShowInnerRate5StarsButton(false);
    };


    const handleIHaveRated = async () => {
        setShowRate5StarsButton(false);

        setLoading(true);
        await wait(200);
        flatListRef.current?.scrollToEnd({ animated: true });

        setChatConversation(prev => [...prev,
            { 
                text: text7,
                isUser: false
            }
        ]);

        await wait(200);
        flatListRef.current?.scrollToEnd({ animated: true });

        setMaxIsStreaming(true);
        setLoading(false);
    };


    // ANIMATE IN ADVICE OPTIONS
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

    /**
     * Handles completion of the first Max message:
     * - Stops streaming animation
     * - Shows the name input field
     * - Animates the keyboard input into view
     * - Focuses the input field
     */
    const handleFirstMaxComplete = () => {
        setMaxIsStreaming(false);
        setShowInput(true);
        Animated.timing(keyboardOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start(async () => {
            await wait(100);
            inputRef?.current?.focus();
        });
    };

    /**
     * Handles completion of the advice question:
     * - Stops streaming animation
     * - Shows the advice options selector
     */
    const handleAdviceQuestionComplete = () => {
        setMaxIsStreaming(false);

        setShowAdviceOptions(true);
    };

    /**
     * Handles completion of the family question:
     * - Stops streaming animation
     * - Shows the family options
     * - Animates the family options into view
     */
    const handleFamilyQuestionComplete = async () => {
        setMaxIsStreaming(false);

        await wait(100);
        flatListRef.current?.scrollToEnd({ animated: true });

        setShowFamilyOptions(true);
        Animated.timing(familyOptionsOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    };

    /**
     * Default completion handler:
     * - Simply stops the streaming animation
     */
    const handleDefaultComplete = async () => {
        setMaxIsStreaming(false);
        await wait(100);
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    /**
     * Determines which completion handler to use based on the message type:
     * - First Max message: Shows name input
     * - Advice question: Shows advice options
     * - Family question: Shows family options
     * - Default: Just stops streaming
     */
    const getOnCompleteHandler = (item: ChatMessage, index: number) => {
        const isFirstMax = index === 0 && !item.isUser && !item.options;
        const isAdviceQuestion = item.text.includes("Now tell me, what do you need help with?");
        const isFamilyQuestion = item.text.includes("Are you open to talking about family");

        if (isFirstMax) return handleFirstMaxComplete;
        if (isAdviceQuestion) return handleAdviceQuestionComplete;
        if (isFamilyQuestion) return handleFamilyQuestionComplete;
        return handleDefaultComplete;
    };


    // ONLY SHOW THE BOX WHEN MAX IS STREAMING CHANGES TO FALSE AFTER THE FAMILY MESSAGE
    React.useEffect(() => {
        (async () => {
            if (!maxIsStreaming && chatConversation.length > 0) {
                const lastMessage = chatConversation[chatConversation.length - 1];

                // SHOW PRIVATE MEMORY BOX
                if (lastMessage.showPrivateMemoryBox) {
                    await wait(100);
                    flatListRef.current?.scrollToEnd({ animated: true });

                    await wait(1000);

                    setShowPrivateMemoryBox(true);

                    Animated.timing(privateMemoryBoxOpacity, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }).start();

                    await wait(100);
                    flatListRef.current?.scrollToEnd({ animated: true });

                    setShowUnlockButton(true);
                };

                // SHOW RATE 5 STARS BUTTON
                if (lastMessage.text.includes("One last thing")) {
                    await wait(100);
                    flatListRef.current?.scrollToEnd({ animated: true });

                    await wait(1000);

                    setShowRate5StarsButton(true);
                };
            };
        })();
    }, [maxIsStreaming]);


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
                    style={{ marginBottom: 140 }}
                    ListFooterComponent={loading ? <LoadingBubble /> : null}
                    renderItem={({ item, index }) => {
                        if (item.showPrivateMemoryBox) {
                            if (!showPrivateMemoryBox) return null;

                            return (
                                <Animated.View style={{ opacity: privateMemoryBoxOpacity }}>
                                    <PrivateMemoryBox privateMemoryBoxIsLocked={privateMemoryBoxIsLocked} />
                                </Animated.View>
                            );
                        };
                        
                        if (item.options) {
                            if (!showAdviceOptions) return null;

                            return (
                                <OptionsSelector
                                    options={item.options}
                                    selectedOptions={selectedOption}
                                    onOptionSelect={(option) => {
                                        if (selectedOption.includes(option)) {
                                            setSelectedOption(selectedOption.filter(item => item !== option));
                                        } else {
                                            setSelectedOption([...selectedOption, option]);
                                        }
                                    }}
                                    optionOpacities={optionOpacities}
                                />
                            );
                        };

                        if (item.isUser) {
                            return <YouText text={item.text} />;
                        } else {
                            return <MaxText text={item.text} onComplete={getOnCompleteHandler(item, index)} />;
                        }
                    }}
                />

                {/* KEYBOARD INPUT */}
                {showInput && (
                    <Animated.View style={[styles.textInputContainer, { opacity: keyboardOpacity }]}>
                        <TextInput
                            ref={inputRef}
                            style={styles.textInput}
                            placeholder="Enter your first name"
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

                {/* SOUNDS GOOD BUTTON */}
                {showButton && !maxIsStreaming && (
                    <Animated.View style={[styles.buttonContainer, { opacity: buttonOpacity }]}>
                        <Button 
                            onPress={handleSoundsGood}
                            style={{ marginHorizontal: 10 }} 
                            label="Sounds good"
                        />
                    </Animated.View>
                )}

                {/* CONTINUE BUTTON */}
                {showAdviceOptions && selectedOption.length > 0 && showContinueButton && (
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={handleContinue}
                            style={{ marginHorizontal: 10 }} 
                            label="Continue"
                        />
                    </View>
                )}

                {/* INCLUDE FAMILY CONVERSATION BUTTON */}
                {showFamilyOptions && (
                    <Animated.View style={{ opacity: familyOptionsOpacity }}>
                        <View style={styles.buttonContainer}>
                            <Button 
                                onPress={() => handleFamilyOptionPress(true)}
                                style={{ marginHorizontal: 10, marginVertical: 10 }} 
                                label="I'm open to it"
                            />

                            <TouchableOpacity onPress={() => handleFamilyOptionPress(false)}>
                                <EPMText style={styles.skipText}>
                                    Skip
                                </EPMText>                     
                            </TouchableOpacity>                     
                        </View>
                    </Animated.View>
                )}

                {/* UNLOCK WITH FACE ID BUTTON */}
                {showUnlockButton && (
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={handleUnlockWithFaceID}
                            style={{ marginHorizontal: 10 }} 
                            label="Unlock with Face ID"
                        />
                    </View>
                )}

                {/* CONTINUE BUTTON AFTER VIEWING PRIVATE MEMORY BOX */}
                {showContinueAfterPrivateMemoryBox && (
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={handleContinueAfterPrivateMemoryBox}
                            style={{ marginHorizontal: 10 }} 
                            label="Continue"
                        />
                    </View>
                )}

                {/* RATE 5 STARS BUTTON */}
                {showRate5StarsButton && (
                    <View style={styles.buttonContainer}>
                        <Button 
                            onPress={handleRate5Stars}
                            style={{ marginHorizontal: 10, display: showInnerRate5StarsButton ? "flex" : "none" }} 
                            label="Rate 5 stars"
                            icon="star"
                        />

                        <TouchableOpacity onPress={handleIHaveRated}>
                            <EPMText style={[styles.skipText, { display: showInnerRate5StarsButton ? "none" : "flex" }]}>
                                I have rated
                            </EPMText>                     
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

export default GetSetUpChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },

    flatList: {
        paddingHorizontal: 5,
        paddingTop: 10
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
    },

    skipText: {
        fontSize: 16,
        textAlign: "center",
        opacity: 0.8
    }
});