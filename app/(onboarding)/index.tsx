import { Button } from '@/components/Button';
import { EpilogueRegularText } from '@/components/StyledText';
import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';


const Index = () => {
    return (
            <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <Image  source={require("@/assets/images/logo.png")} style={styles.logo} contentFit="contain" />  
            <View style={styles.onboardingContainer}>
                <View style={styles.onboardingItemLeft}>
                    <Image source={require("@/assets/images/onboarding-1.png")} style={styles.onboardingImage} contentFit="contain" />
                </View>
                
                <View style={styles.onboardingItemRight}>
                    <Image source={require("@/assets/images/onboarding-2.png")} style={styles.onboardingImage} contentFit="contain" />
                </View>
                
                <View style={styles.onboardingItemLeft}>
                    <Image source={require("@/assets/images/onboarding-3.png")} style={styles.onboardingImage} contentFit="contain" />
                </View>
                
                <View style={styles.onboardingItemRight}>
                    <Image source={require("@/assets/images/onboarding-4.png")} style={styles.onboardingImage} contentFit="contain" />
                </View>
            <Button textColor='#000' style={styles.button} label="Get Started" onPress={() => router.push("/(tabs)/(chat)")} />
                <View style={styles.bottomContainer}>
                    <EpilogueRegularText style={styles.bottomText}>
                       By clicking &quot;Continue&quot;, you agree to our <Link 
                       style={{ textDecorationLine: "underline" }}
                       href="https://example.com/terms">Terms & Conditions</Link> and <Link style={{ textDecorationLine: "underline" }} href="https://example.com/privacy">Privacy Policy</Link>
                    </EpilogueRegularText>
                </View>
            </View>
            </View>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000"
    },
    contentContainer: {
        flex: 1,
        width: "90%",
        alignSelf: "center",
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: "center",
        marginTop: 40
    },
    onboardingContainer: {
        flex: 1,
    },
    onboardingItemLeft: {
        height: 120,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    onboardingItemRight: {
        height: 100,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    onboardingImage: {
        width: "90%",
        height: "100%"
    }, 
    button: {
        width: "100%",
        marginTop: 20,
    },
    bottomContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        alignSelf: "center",
    },
    bottomText: {
        color: "#FFF",
        fontSize: 12,
        textAlign: "center",
    },
});



export default Index;