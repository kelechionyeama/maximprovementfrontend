import { Image } from 'expo-image';
import { Tabs, useSegments } from 'expo-router';
import { Platform } from 'react-native';

export default function TabsLayout() {

    const segments = useSegments();

    return (
        <Tabs screenOptions={{
            tabBarAllowFontScaling: false,
            tabBarStyle: {
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 20,
                backgroundColor: Platform.OS === "ios" ? 'transparent' : '#000000',
                borderTopWidth: 0,
                borderTopColor: '#000000',
                minHeight: 90
            },
            tabBarLabelStyle: {
               display: "none"
            },
            tabBarActiveTintColor: '#E0E0E0',
            tabBarInactiveTintColor: '#B0B0B0',
            // tabBarBackground: () => (
            //     <BlurView
            //         tint="light"
            //         intensity={30}
            //         style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            //     />
            // )
        }}>
            <Tabs.Screen name="(chat)" 
                options={{ 
                    headerShown: false,
                    tabBarLabel: "Chat",
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={require("@/assets/images/icons/chat.svg")} 
                            style={{ 
                                width: 24, 
                                height: 24,
                                opacity: focused ? 1 : 0.4,
                                tintColor: focused ? "#E0E0E0" : "#B0B0B0"
                            }} 
                        />
                    )
                }} 
            />

            <Tabs.Screen name="(memory)" 
                options={{ 
                    headerShown: false,
                    tabBarLabel: "Memory",
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={require("@/assets/images/icons/memory.svg")} 
                            style={{ 
                                width: 24, 
                                height: 24,
                                opacity: focused ? 1 : 0.4,
                                tintColor: focused ? "#E0E0E0" : "#B0B0B0"
                            }} 
                        />
                    )
                }}
            />
        </Tabs>
    );
};