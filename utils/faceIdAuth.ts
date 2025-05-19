import * as LocalAuthentication from 'expo-local-authentication';
import { Alert, Platform } from 'react-native';

export async function handleEnableFaceId() {
    try {
        // CHECK IF HARDWARE SUPPORTS BIOMETRIC
        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (!compatible) {
            Alert.alert("Incompatible Device", "Your device does not support Face ID or Touch ID");
            return { success: false, error: "Incompatible device" };
        };

        // CHECK IF BIOMETRIC IS ENROLLED
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
            Alert.alert(
                "Biometric Not Set Up",
                Platform.OS === "ios" 
                    ? "Please set up Face ID on your device first." 
                    : "Please set up biometric authentication on your device first."
            );
            return { success: false, error: "Biometric not set up" };
        };

        // AUTHENTICATE WITH BIOMETRICS
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate to enable Private Memory",
            fallbackLabel: "Use passcode"
        });

        if (result.success) {
            return { success: true };
        } else {
            return { success: false, error: "Authentication failed" };
        }
    } catch (error) {
        return { success: false, error: "Authentication error" };
    }
}; 