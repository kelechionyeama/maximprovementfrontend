import { Image } from "expo-image";
import { useNavigation } from 'expo-router';
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View, TouchableOpacity } from "react-native";
import Feature from "../../../components/Feature";
import { allFeatures, FeatureItem } from "../../../ExportedArrays";
import SettingsBottomSheet from "../../../components/settingsBottomSheet";
import BottomSheetModal from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = () => {

    const navigation = useNavigation();
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);

    // HEADER NAVIGATION
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerRight: () => (
                <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
                    <Ionicons name="menu-sharp" size={30} color="white" />
                </TouchableOpacity>
            ),
            headerStyle: {
				backgroundColor: "black"
			},
            headerShadowVisible: false
        });
    }, []);

    
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const imageOpacity = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 0.15],
        extrapolate: "clamp"
    });

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        scrollY.setValue(offsetY);
    };

    const AnimatedImage = Animated.createAnimatedComponent(Image);

    return (
        <GestureHandlerRootView style={styles.contentContainer}>
            <View style={styles.backgroundContainer}>
                <AnimatedImage 
                    source={require("@/assets/images/logo.png")} 
                    style={[styles.backgroundImage, { opacity: imageOpacity }]}
                    contentFit="contain"
                />
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={allFeatures}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }: { item: FeatureItem; index: number }) => (
                        <Feature key={index} title={item.title} icon={item.icon} params={item.params} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => 
                        <View style={styles.listHeader} />
                    }
                    ListFooterComponent={() => 
                        <View style={styles.listFooter} />
                    }
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </View>

            <SettingsBottomSheet bottomSheetRef={bottomSheetRef} />
        </GestureHandlerRootView>
    )
}

export default Home;

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: "black"
    },

    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 0
    },

    backgroundImage: {
        width: 178.8*1.2,
        height: 108.4*1.2,
        top: "20%"
    },

    listContainer: {
        flex: 1,
        width: "100%",
        alignSelf: "center"
    },

    logo: {
        width: 200,
        height: 200,
        alignSelf: "center"
    }, 

    listHeader: {
        width: "100%",
        height: 300,
    },

    listFooter: {
        width: "100%",
        height: 100
    }
});