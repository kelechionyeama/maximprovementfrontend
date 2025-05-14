import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { EpilogueBoldText } from "../StyledText";

interface OptionProps {
    title: string;
    icon: any;
    params: string;
}

const Option = ({ title, icon, params }: OptionProps) => {
    return (
      <Pressable style={styles.onboardingItem} onPress={() => router.push({
        pathname: "/(tabs)/(chat)/conversationScreen",
        params: { question: params }
      })}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)','#212121', ]}
                locations={[0, 0.5, 1]}
                style={styles.gradientBorder}
            />
            <View style={styles.onboardingItemLeft}>
               <Image source={icon} style={styles.icon} contentFit="contain" />
            </View>
            <View style={styles.onboardingItemRight}>
           
                <EpilogueBoldText
                    style={{ fontSize: 16, color: "#FFF" }}
                >
                    {title}
                </EpilogueBoldText>
            </View>
        </Pressable>
    )
}

export default Option;

const styles = StyleSheet.create({
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
    icon: {
        width: 40,
        height: 40,
    }
})