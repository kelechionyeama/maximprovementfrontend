import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreenExpo from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Keep the splash screen visible while we fetch resources
SplashScreenExpo.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Epilogue: require('../assets/fonts/Epilogue-Regular.ttf'),
    EpilogueBold: require('../assets/fonts/Epilogue-Bold.ttf'),
    EpilogueMedium: require('../assets/fonts/Epilogue-Medium.ttf'),
    EpilogueSemiBold: require('../assets/fonts/Epilogue-SemiBold.ttf'),
    EpilogueRegular: require('../assets/fonts/Epilogue-Regular.ttf'),
    EpilogueLight: require('../assets/fonts/Epilogue-Light.ttf'),
    EpilogueThin: require('../assets/fonts/Epilogue-Thin.ttf'),
    EpilogueBlack: require('../assets/fonts/Epilogue-Black.ttf'),
    EpilogueExtraBold: require('../assets/fonts/Epilogue-ExtraBold.ttf'),
    EpilogueExtraLight: require('../assets/fonts/Epilogue-ExtraLight.ttf'),
    EpilogueMediumItalic: require('../assets/fonts/Epilogue-MediumItalic.ttf'),
    EpilogueBoldItalic: require('../assets/fonts/Epilogue-BoldItalic.ttf'),
    EpilogueSemiBoldItalic: require('../assets/fonts/Epilogue-SemiBoldItalic.ttf'),
    EpilogueLightItalic: require('../assets/fonts/Epilogue-LightItalic.ttf'),
    EpilogueThinItalic: require('../assets/fonts/Epilogue-ThinItalic.ttf'),
    EpilogueBlackItalic: require('../assets/fonts/Epilogue-BlackItalic.ttf'),
    EpilogueExtraBoldItalic: require('../assets/fonts/Epilogue-ExtraBoldItalic.ttf'),
    EpilogueExtraLightItalic: require('../assets/fonts/Epilogue-ExtraLightItalic.ttf'),
    DrukWideBold: require('../assets/fonts/DrukWideBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreenExpo.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Stack />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}