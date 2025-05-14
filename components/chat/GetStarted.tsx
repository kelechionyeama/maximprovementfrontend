import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { EpilogueBoldText } from "../StyledText";
import { router } from "expo-router";
const GetStarted = () => {
    return (
        <View style={styles.contentContainer}>
         <Image  source={require("@/assets/images/logo.png")} style={styles.logo} contentFit="contain" />  

         <View style={styles.onboardingContainer}>
        <Pressable style={styles.onboardingItem} onPress={() => router.push("/(tabs)/(chat)/getStartedScreen")}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)','#212121', ]}
                locations={[0, 0.5, 1]}
                style={styles.gradientBorder}
            />
            <View style={styles.onboardingItemLeft}>
                <EpilogueBoldText lineHeight={true} style={{ fontSize: 24, lineHeight: 50 }}>
                👋
                </EpilogueBoldText>
            </View>
            <View style={styles.onboardingItemRight}>
           
                <EpilogueBoldText
                    style={{ fontSize: 16, color: "#FFF" }}
                >
                    Get Set up
                </EpilogueBoldText>
            </View>
        </Pressable>
           <View style={styles.onboardingItem}>
                <View style={styles.overlay} />
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0)','#212121', ]}
                    locations={[0.4, 1]}
                    style={styles.gradientBorder}
                />
                <View style={styles.otherItemLeft}>
                    <EpilogueBoldText lineHeight={true} style={{ fontSize: 24, lineHeight: 50 }}>
                    🎱
                    </EpilogueBoldText>
                </View>
                <View style={styles.onboardingItemRight}>
               
                    <EpilogueBoldText
                        style={{ fontSize: 16, color: "#E0E0E0" }}
                    >
                        Ask me anything
                    </EpilogueBoldText>
                </View>
            </View>

          <View style={styles.onboardingItem}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)','#212121', ]}
                locations={[0.4, 1]}
                style={styles.gradientBorder}
            />
            <View style={styles.otherItemLeft}>
                <EpilogueBoldText lineHeight={true} style={{ fontSize: 24, lineHeight: 50 }}>
                ♥️
                </EpilogueBoldText>
            </View>
            <View style={styles.onboardingItemRight}>
           
                <EpilogueBoldText
                    style={{ fontSize: 16, color: "#E0E0E0" }}
                >
                    Dating & Relationships
                </EpilogueBoldText>
            </View>
        </View>
        <View style={styles.onboardingItem}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)','#212121', ]}
                locations={[0.4, 1]}
                style={styles.gradientBorder}
            />
            <View style={styles.otherItemLeft}>
                <EpilogueBoldText lineHeight={true} style={{ fontSize: 24, lineHeight: 50 }}>
                🎭
                </EpilogueBoldText>
            </View>
            <View style={styles.onboardingItemRight}>
           
                <EpilogueBoldText
                    style={{ fontSize: 16, color: "#E0E0E0" }}
                >
                   Personality Test 
                </EpilogueBoldText>
            </View>
        </View>
        <View style={styles.onboardingItem}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)','#212121', ]}
                locations={[0.4, 1]}
                style={styles.gradientBorder}
            />
            <View style={styles.otherItemLeft}>
                <EpilogueBoldText lineHeight={true} style={{ fontSize: 24, lineHeight: 50 }}>
                😎
                </EpilogueBoldText>
            </View>
            <View style={styles.onboardingItemRight}>
           
                <EpilogueBoldText
                    style={{ fontSize: 16, color: "#E0E0E0" }}
                >
                    How to be liked
                </EpilogueBoldText>
            </View>
        </View>
         </View>

        </View>
    )
}

export default GetStarted;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
         width: "90%",
        alignSelf: "center",
        justifyContent: "flex-end",
        paddingBottom: 100
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
    }, 
    onboardingContainer: {
        // flex: 1
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