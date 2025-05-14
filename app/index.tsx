import { Image } from 'expo-image';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';

export default function Index() {
    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/(onboarding)');
        }, 2000); // Navigate after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Image 
                source={require("@/assets/images/splash.png")}
                style={{ flex: 1, width: "100%", height: "100%" }} 
                contentFit="contain"
            />

            <LottieView loop autoPlay style={{ width: 150, height: 150, position: "absolute", top: "70%", alignSelf: "center", zIndex: 1 }}
                source={require("@/assets/loaders/onboardingLoader.json")} />
        </>
    )
};