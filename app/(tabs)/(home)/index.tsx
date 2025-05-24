import { useUserProfileStore } from '@/store/userProfileStore';
import { Ionicons, Octicons } from '@expo/vector-icons';
import BottomSheetModal from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetModal';
import { Image } from "expo-image";
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React from "react";
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Feature from "../../../components/Feature";
import SettingsBottomSheet from "../../../components/settingsBottomSheet";
import { allFeatures, FeatureItem } from "../../../ExportedArrays";
// import Purchases from 'react-native-purchases';
// import { deviceInformation } from '@/HelperFunctions';
// import { isTestFlightBuild } from '@/config';
// import { callSuperwall } from '@/api/CallSuperwall';

const Home = () => {

    const params = useLocalSearchParams<Record<string, string>>();
    // const [isUser, setIsUser] = React.useState(true);

    const navigation = useNavigation();
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);

    const { userProfile } = useUserProfileStore();

    const exsistingUser = params?.brandNewUser === "true" && !userProfile?.begunOnboarding ? false : true;

    
    // HEADER NAVIGATION
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <TouchableOpacity style={{ opacity: exsistingUser ? 1 : 0.5 }} disabled={exsistingUser ? false : true} 
                    onPress={() => router.push("/chatHistory")}>
                    <Octicons name="history" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity style={{ opacity: exsistingUser ? 1 : 0.5 }} onPress={() => bottomSheetRef.current?.expand()}>
                    <Ionicons name="menu-sharp" size={30} color="white" />
                </TouchableOpacity>
            ),
            headerStyle: {
				backgroundColor: "black"
			},
            headerShadowVisible: false
        });
    }, []);


    // SHOW PAYWALL
    React.useEffect(() => {
        // const checkStatus = async () => {
        //     try {
        //         const customerInfo = await Purchases.getCustomerInfo();
        //         if (typeof customerInfo?.entitlements?.active?.["proaccess"] !== "undefined") {
        //             return;
        //         };

        //         if (!isTestFlightBuild) {
        //             if (deviceInformation.deviceId) {
        //                 callSuperwall(deviceInformation.deviceId);
        //             };
        //         };

        //     } catch (e) {}
        // };

        // if (exsistingUser) checkStatus();
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

    // console.log(allFeatures.splice(1, 1));
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
                    data={exsistingUser ? allFeatures.slice(1) : [allFeatures[0], ...allFeatures.slice(2)]}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={exsistingUser}
                    renderItem={({ item, index }: { item: FeatureItem; index: number }) => (
                        exsistingUser ? (
                            <Feature 
                                key={index} 
                                title={item.title}
                                icon={item.icon} 
                                params={item.params}
                            />
                        ) : (
                            <Feature 
                                key={index} 
                                title={item.title} 
                                active={item.title === "Get set up" ? true : false} 
                                icon={item.icon} 
                                params={item.params} 
                            />
                        )
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
};

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