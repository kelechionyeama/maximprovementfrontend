import { Image } from 'expo-image';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useUserProfileStore } from '@/store/userProfileStore';

export default function TabsLayout() {

    const { userProfile } = useUserProfileStore();
    const isMemoryTabDisabled = userProfile?.begunOnboarding ? false : true;

    return (
        <Tabs screenOptions={{
            tabBarAllowFontScaling: false,
            tabBarStyle: {
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 18,
                backgroundColor: "black",
                borderTopWidth: 0,
                borderTopColor: '#BABABA',
                minHeight: 80
            },
            tabBarLabelStyle: {
               display: "none"
            },
            tabBarInactiveTintColor: '#BABABA'
        }}>
            <Tabs.Screen name="(home)" 
                options={{ 
                    headerShown: false,
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={require("@/assets/icons/chat.svg")} 
                            style={{ 
                                width: 30, 
                                height: 30,
                                opacity: focused ? 1 : 0.4,
                                tintColor: focused ? "white" : "#BABABA"
                            }} 
                        />
                    )
                }} 
            />
            
            <Tabs.Screen name="(memory)" 
                options={{ 
                    headerShown: false,
                    tabBarLabel: "Scan",
                    tabBarIcon: ({ focused }) => (
                        <Image 
                            source={require("@/assets/icons/memory.svg")} 
                            style={{ 
                                width: 30, 
                                height: 30,
                                opacity: focused ? 1 : 0.4,
                                tintColor: focused ? "white" : "#BABABA"
                            }} 
                        />
                    ),
                    tabBarButton: (props) => (
                        // @ts-ignore
                        <Pressable
                            {...props}
                            disabled={isMemoryTabDisabled}
                            style={[props.style, isMemoryTabDisabled && { opacity: 0.6 } ]}
                        >
                            {props.children}
                        </Pressable>
                    )
                }}
            />
        </Tabs>
    );
};