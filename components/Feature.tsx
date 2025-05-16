import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { EPBText } from '../StyledText';

interface OptionProps {
    title: string;
    icon: any;
    params: string;
    active?: boolean;
};

const ICON_SIZES = {
    large: { width: 55, height: 55 },
    medium: { width: 40, height: 40 },
    small: { width: 32, height: 32 }
};

const ICON_SIZE_MAP = {
    askMeAnything: "large",
    makingRealFriends: "large",
    findingMotivation: "large",
    getFitFast: "medium",
    howToBeLiked: "medium",
    influencingPeople: "medium",
    styleUpgrade: "medium"
} as const;

const Feature = ({ title, icon, params, active = true}: OptionProps) => {
    const iconSize = ICON_SIZE_MAP[params as keyof typeof ICON_SIZE_MAP] || "small";
    
    return (
		<Pressable
			disabled={!active}
			style={styles.onboardingItem} 
			onPress={() => router.push("/getSetUpChat")}
			//   onPress={() => router.push({
			//     pathname: "getSetUpChat",
			//     params: { question: params }
			//   })}
		>
            <View style={styles.onboardingItemLeft}>
               <Image 
			   		source={icon} 
					style={ICON_SIZES[iconSize]}
					contentFit="contain"
				/>
            </View>

            <View style={styles.onboardingItemRight}>
				<LinearGradient
					colors={active ? ['#000000','#212121' ] : ['#000000','#0d0d0d' ]}
					locations={[0.1, 0.8]}
					style={styles.gradientBorder}
				/>

                <EPBText style={{ fontSize: 16, color: active ? "#E0E0E0" : "#5a5a5a" }}>
                    {title}
                </EPBText>
            </View>
        </Pressable>
    )
};

export default Feature;

const styles = StyleSheet.create({
    onboardingItem: {
        height: 75,
        width: "90%",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
        marginTop: 20, 
		alignSelf: "center"
    },

    gradientBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    onboardingItemLeft: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525",
        height: "100%",
        width: "20%"
    },

    onboardingItemRight: {
        height: "100%",
        width: "80%",
        paddingHorizontal: 20,
        justifyContent: "center"
    }
});