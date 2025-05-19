import { Image } from 'expo-image';
import React from 'react';

const Index = () => {
    return (
        <Image 
            source={require("@/assets/images/splash.png")}
            style={{ flex: 1, width: "100%", height: "100%" }} 
            contentFit="cover"
        />
    )
};

export default Index;