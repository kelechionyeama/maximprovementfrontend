import { Stack } from 'expo-router';

const ChatLayout = () => {
    return (
		<Stack>
			<Stack.Screen name="index" options={{ gestureEnabled: false, headerShown: false }} />
            <Stack.Screen name="getStartedScreen" options={{ gestureEnabled: false, headerShown: false }} />
            <Stack.Screen name="conversationScreen" options={{ gestureEnabled: false, headerShown: false }} />
		</Stack>
    )
};

export default ChatLayout;