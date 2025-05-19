import { getDefaultRepliesApi } from '@/api/DefaultReplies';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {

	const [hasActiveSubscription, setHasActiveSubscription] = React.useState("");
	const [isUser, setIsUser] = React.useState(false);

	const [fontsLoaded] = useFonts({
		EPR: require('../assets/fonts/Epilogue-Regular.ttf'),
		EPM: require('../assets/fonts/Epilogue-Medium.ttf'),
		EPSB: require('../assets/fonts/Epilogue-SemiBold.ttf'),
		EPB: require('../assets/fonts/Epilogue-Bold.ttf')
	});


	const getDefaults = async () => {
		try {
			const gottenResponse = await getDefaultRepliesApi();
			if (gottenResponse) {
				const response = await gottenResponse.json();
				return response;
			};

		} catch (e) {

		}
	};


	// PREPARE FOR USER NAVIGATION
	React.useEffect(() => {
		if (!fontsLoaded) return;

		(async () => {
			const response = await getDefaults();

			router.replace({
				pathname: "/(tabs)/(home)",
				params: {
					feature: JSON.stringify(response)
				}
			});
		})()
	}, [fontsLoaded]);


	if (!fontsLoaded) return null;

	return <RootLayoutNav />;
};

function RootLayoutNav() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="chat" options={{  }} />
			<Stack.Screen name="getSetUpChat" options={{ gestureEnabled: false }} />
			<Stack.Screen name="chatHistory" options={{ animation: "ios_from_left", gestureEnabled: false }} />
		</Stack>
	);
};