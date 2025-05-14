import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import { Animated, Easing, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import Option from "./option";


const options = [
  {
    title: "Ask Me Anything",
    icon: require("@/assets/images/poolball.svg"),
    params: "askMeAnything"
  },
  {
    title: "Dating & Relationships",
    icon: require("@/assets/images/heart.svg"),
    params: "datingRelationships"
  },
  {
    title: "Personality Test",
    icon: require("@/assets/images/mask.svg"),
    params: "personalityTest"
  },
  {
    title: "How to be Liked",
    icon: require("@/assets/images/eyeglasses.svg"),
    params: "howToBeLiked"
  },
  {
    title: "Making Real Friends",
    icon: require("@/assets/images/fistbump.svg"),
    params: "makingRealFriends"
  },
  {
    title: "Influencing People",
    icon: require("@/assets/images/poolball.svg"),
    params: "influencingPeople"
  },
  {
    title: "Controversial Opinions",
    icon: require("@/assets/images/poolball.svg"),
    params: "controversialOpinions"
  },
  {
    title: "Finding Motivation",
    icon: require("@/assets/images/bangles.svg"),
    params: "findingMotivation"
  },
  {
    title: "Style Upgrade",
    icon: require("@/assets/images/sunglasses.png"),
    params: "styleUpgrade"
  }, 
  {
    title: "Get fit fast",
    icon: require("@/assets/images/fit.svg"),
    params: "getFitFast"
  }
];


const Home = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const headerHeight = useRef(new Animated.Value(40)).current;
    const listHeight = useRef(new Animated.Value(60)).current;

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        
        if (offsetY > 0 && !hasScrolled) {
            // We're scrolling down and haven't expanded yet
            setHasScrolled(true);
            Animated.parallel([
                Animated.timing(headerHeight, {
                    toValue: 20,
                    duration: 500,
                    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                    useNativeDriver: false,
                }),
                Animated.timing(listHeight, {
                    toValue: 80,
                    duration: 500,
                    easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                    useNativeDriver: false,
                })
            ]).start();
        }
    };

    return (
        <View style={styles.contentContainer}>
            <Animated.View style={[styles.headerContainer, { height: headerHeight.interpolate({
                inputRange: [20, 40],
                outputRange: ['20%', '40%']
            })}]}>
                <Image source={require("@/assets/images/logo.png")} style={styles.logo} contentFit="contain" />  
            </Animated.View>

            <Animated.View style={[styles.onboardingContainer, { height: listHeight.interpolate({
                inputRange: [60, 80],
                outputRange: ['60%', '80%']
            })}]}>
                <FlatList
                    data={options}
                    renderItem={({ item, index }) => (
                        <Option key={index} title={item.title} icon={item.icon} params={item.params} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </Animated.View>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: "90%",
        alignSelf: "center",
    },
    headerContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 1,
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
    }, 
    onboardingContainer: {
        width: "100%",
        paddingTop: 50,
        paddingBottom: 100,
    },
    onboardingItem: {
        height: 70,
        width: "100%",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
        marginTop: 20, 
        position: "relative",
    },
    gradientBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 20,
    },
    onboardingItemLeft: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525",
        height: "100%",
        width: "20%",
    },
    otherItemLeft: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#181818",
        height: "100%",
        width: "20%",
    },
    onboardingItemRight: {
        height: "100%",
        width: "80%",
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: 20,
    }
})