import { Stack } from 'expo-router';

const OnboardingLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false }} />
        </Stack>
    )
};

export default OnboardingLayout;