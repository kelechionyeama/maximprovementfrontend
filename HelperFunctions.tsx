import { Dimensions, Linking, Alert } from 'react-native';
import * as StoreReview from "expo-store-review";
import { appInfo } from '@/config';
import * as Haptics from 'expo-haptics';
import { Timestamp } from '@firebase/firestore';
import { Platform } from 'react-native';


export const getCurrentTimestamp = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // CONVERT TO FIRESTORE TIMESTAMPS
    const startTimestamp = Timestamp.fromDate(startOfDay);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    return { startTimestamp, endTimestamp };
};

// REMOVE DUPLICATES FROM AN ARRAY
export const removeDuplicates = (arr: any[]) => {
    return [...new Set(arr)];
};


// ALERT MANDETORY UPDATE
export function alertMandetoryUpdate(appLink: string) {
    Alert.alert(
        "A new update is available!", 
        "Please update to the latest version, your update would be free.", [
        {
            text: "Update",
            style: "cancel",
            onPress: () => Linking.openURL(appLink)
        },
    ]);
};

// CONVERTS DATE TO STRING
export function formatISOToRegularTime(isoDate: string): string {
    // Create a Date object
    const date = new Date(isoDate);
  
    // Define formatting options
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true, // 12-hour clock format
    };
  
    // Format the date to a human-readable string
    return date.toLocaleString('en-US', options);
};

// DELAY FOR A VARIABLE TIME
export function wait(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

// LEAVE RATING ON APP STORE OR PLAY STORE
export const leaveRating = async () => {
    try {
        // Try using StoreReview API first (works on both iOS and Android)
        if (await StoreReview.hasAction()) {
            await StoreReview.requestReview();
        } else {
            // Fallback to direct store links if StoreReview is not available
            const appStoreUrl = "https://apps.apple.com/us/app/clean-eats/id6741033862";
            const playStoreUrl = "market://details?id=com.kelechionyeama.cleaneats.app";
            
            // Check platform and open appropriate store
            if (Platform.OS === 'ios') {
                Linking.openURL(appStoreUrl);
            } else if (Platform.OS === 'android') {
                Linking.openURL(playStoreUrl).catch(() => {
                    // If direct market link fails, try web URL
                    Linking.openURL("https://play.google.com/store/apps/details?id=com.kelechionyeama.cleaneats.app");
                });
            }
        }
    } catch (e) {
        console.log("Error opening store review:", e);
    }
};

// GET JUST TIME NOW I.E 12:15PM
export function getTimeNow(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { hour12: true, hour: "numeric", minute: "numeric", second: "numeric" };
    const formattedTime: string = now.toLocaleString("en-US", options);

    return formattedTime;
};

// GENERATE RANDOM STRING
export function broofa(): string {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 24; i++) {
        randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    };

    return randomString;
};

// TERMS OF SERVICE
export const termsOfService = () => {
    Linking.openURL("https://www.apple.com/legal/internet-services/itunes/dev/stdeula/");
};


// PRIVACY POLICY
export const privacyPolicy = () => {
    Linking.openURL("https://www.cleaneats.app/privacypolicy");
};

// SEND AN EMAIL TO US
export const contactUs = async (title: string, uid: string) => {
    const subject = title;
    const body = `\n\nId: ${uid}\n\n Version: ${appInfo.version} (${appInfo.build})`;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    Linking.openURL(`mailto:support@cleaneats.app?subject=${encodedSubject}&body=${encodedBody}`);
};

// CONVERT DOB TO AGE. 19th of January 2000 > 25 years old
export const calculateAge = (dob: number | undefined) => {
    if (!dob) return null;
        
    return new Date().getFullYear() - dob;
};


// LIGHT HAPTIC FEEDBACK
export const lightHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
};

// SUCCESS HAPTIC FEEDBACK
export const successHaptic = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
};

