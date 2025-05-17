import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

export default function RootLayout() {

	const [fontsLoaded] = useFonts({
		EPR: require('../assets/fonts/Epilogue-Regular.ttf'),
		EPM: require('../assets/fonts/Epilogue-Medium.ttf'),
		EPSB: require('../assets/fonts/Epilogue-SemiBold.ttf'),
		EPB: require('../assets/fonts/Epilogue-Bold.ttf')
	});

	if (!fontsLoaded) return null;

	return <RootLayoutNav />;
};

function RootLayoutNav() {
	return (
		<Stack>
			<Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="chat" options={{  }} />
			<Stack.Screen name="getSetUpChat" options={{ gestureEnabled: false }} />
			<Stack.Screen name="chatHistory" options={{ animation: "ios_from_left", gestureEnabled: false }} />
		</Stack>
	);
};