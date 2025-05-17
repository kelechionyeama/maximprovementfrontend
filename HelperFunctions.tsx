import * as Haptics from "expo-haptics";
import { Linking } from "react-native";
import { appInfo } from "./config";
import * as StoreReview from "expo-store-review";
import { Platform } from "react-native";

// DELAY FOR A VARIABLE TIME
export function wait(timeout: number) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

// LIGHT HAPTIC FEEDBACK
export const lightHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

// LOWERCASE FIRST LETTER
export const lowercaseFirst = (str: string) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
};

// JOIN WITH AND
export const joinWithAnd = (arr: string[]) => {
    if (arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr[0] + " and " + arr[1];
    return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
};

// LEAVE RATING ON APP STORE OR PLAY STORE
export const leaveRating = async () => {
    try {
        if (await StoreReview.hasAction()) {
            await StoreReview.requestReview();
        } else {
            // FALLBACK TO DIRECT STORE LINKS IF STORE REVIEW IS NOT AVAILABLE
            const appStoreUrl = "https://apps.apple.com/us/app/clean-eats/id6741033862";
            const playStoreUrl = "market://details?id=com.kelechionyeama.cleaneats.app";
            
            // CHECK PLATFORM AND OPEN APPROPRIATE STORE
            if (Platform.OS === 'ios') {
                Linking.openURL(appStoreUrl);
            } else if (Platform.OS === 'android') {
                Linking.openURL(playStoreUrl).catch(() => {
                    // IF DIRECT MARKET LINK FAILS, TRY WEB URL
                    Linking.openURL("https://play.google.com/store/apps/details?id=com.kelechionyeama.cleaneats.app");
                });
            }
        }
    } catch (e) {}
};