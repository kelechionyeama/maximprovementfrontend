import { getDefaultRepliesApi } from '@/api/DefaultReplies';
import { useDefaultRepliesStore } from '@/store/defaultReplies';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import React from 'react';
import { db, SUPERWALL_API_KEY } from '@/config';
import { onSnapshot, doc } from 'firebase/firestore';
import { deviceInformation } from '@/HelperFunctions';
import { UserProfile } from '@/ExportedTypes';
import { useUserProfileStore } from '@/store/userProfileStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Superwall, { SubscriptionStatus } from "@superwall/react-native-superwall";
// import { RCPurchaseController } from '@/utils/purchaseController';
// import Purchases from 'react-native-purchases';

export default function RootLayout() {

	const [hasActiveSubscription, setHasActiveSubscription] = React.useState("true");

	const [fontsLoaded] = useFonts({
		EPR: require('../assets/fonts/Epilogue-Regular.ttf'),
		EPM: require('../assets/fonts/Epilogue-Medium.ttf'),
		EPSB: require('../assets/fonts/Epilogue-SemiBold.ttf'),
		EPB: require('../assets/fonts/Epilogue-Bold.ttf')
	});

	// const purchaseController = new RCPurchaseController();

	const { setDefaultReplies } = useDefaultRepliesStore();
	const { setUserProfile } = useUserProfileStore();

	const userDoc = doc(db, "users", deviceInformation.deviceId);


	const getDefaults = async () => {
		try {
			const gottenResponse = await getDefaultRepliesApi();
			if (gottenResponse) {
				const response = await gottenResponse.json();
				return response;
			};

		} catch (e) {}
	};


	// LISTEN TO PURCHASES
	// React.useEffect(() => {
	// 	const unsubscribe = Purchases.addCustomerInfoUpdateListener((customerInfo) => {

	// 		const entitlementIds = Object.keys(customerInfo.entitlements.active);
			
	// 		if (entitlementIds.length === 0) {
	// 			setHasActiveSubscription("false");
	// 			Superwall.shared.setSubscriptionStatus(SubscriptionStatus.Inactive());
	// 		} else {
	// 			setHasActiveSubscription("true");
	// 			Superwall.shared.setSubscriptionStatus(SubscriptionStatus.Active(entitlementIds));
				
	// 		}
    //     });

	// 	return unsubscribe;
	// }, []);


	// PREPARE FOR USER NAVIGATION
	React.useEffect(() => {
		if (!fontsLoaded || hasActiveSubscription === "") return;
		
		const prepare = async () => {
			// Superwall.configure({
			// 	apiKey: SUPERWALL_API_KEY,
			// 	purchaseController
			// });

			// purchaseController.syncSubscriptionStatus();

			const response = await getDefaults();
			setDefaultReplies(response);

			const fetchStoredUser = await AsyncStorage.getItem("uid");
			if (true) { // REMEMBER TO CHANGE THIS TO FETCHED USER
				router.replace("/(tabs)/(home)");
			} else {
				router.replace("/(onboarding)");
			}
		};

		prepare();
	}, [fontsLoaded, hasActiveSubscription]);
	

	// LISTEN TO USER DOCUMENT
	React.useEffect(() => {
		const unsubscribe = onSnapshot(userDoc, async (doc) => {
			if (doc.exists()) {
				const userProfile = doc.data() as UserProfile;
				setUserProfile(userProfile);
			}
		});

		return () => unsubscribe();
	}, []);

	if (!fontsLoaded) return null;

	return <RootLayoutNav />;
};

function RootLayoutNav() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="chat" />
			<Stack.Screen name="getSetUpChat" options={{ gestureEnabled: false }} />
			<Stack.Screen name="chatHistory" options={{ animation: "ios_from_left", gestureEnabled: false }} />
		</Stack>
	);
};