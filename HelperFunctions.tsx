import * as Haptics from "expo-haptics";
import * as StoreReview from "expo-store-review";
import { Linking, Platform } from "react-native";
import { appInfo } from "./config";
import DeviceInfo from "react-native-device-info";

export const deviceInformation = {
    // deviceId: await DeviceInfo.getUniqueId(),
    // deviceBrand: await DeviceInfo.getBrand()
    deviceId: "TEMPDEVICEID",
    deviceBrand: "TEMPDEVICEBRAND"
};

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

// CONVERT FIREBASE DATE TO CHAT HISTORY DATE
export const formatChatHistoryDate = (timestamp: any): string => {
    let date: Date;

    // IF IT'S A FIRESTORE TIMESTAMP OBJECT
    if (timestamp && typeof timestamp.toDate === "function") {
        date = timestamp.toDate();
    }
    // IF IT'S A PLAIN OBJECT WITH _SECONDS (FROM FIRESTORE REST/SERIALIZED)
    else if (timestamp && typeof timestamp._seconds === "number") {
        date = new Date(timestamp._seconds * 1000);
    }
    // IF IT'S ALREADY A JS DATE
    else if (timestamp instanceof Date) {
        date = timestamp;
    }
    // FALLBACK: TRY TO PARSE AS DATE STRING
    else {
        date = new Date(timestamp);
    }

    const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "2-digit",
        day: "2-digit"
    };

    const formatted = date.toLocaleDateString("en-US", options);
    return formatted.replace(/,?\\s?\\d{4}/, "").replace(",", "");
};

// FIND THE FIRST MESSAGE IN CHAT CONVERSATION SENT TODAY
export const findFirstTodayMessageIndex = (chatConversation: { timestamp?: string }[]): number => {
    const today = new Date();
    return chatConversation.findIndex(msg => {
        if (!msg.timestamp) return false;
        
        const msgDate = new Date(msg.timestamp);
        return (
            msgDate.getDate() === today.getDate() &&
            msgDate.getMonth() === today.getMonth() &&
            msgDate.getFullYear() === today.getFullYear()
        );
    });
};

// CHECK IF ALL MESSAGES ARE FROM TODAY
export const areAllMessagesFromToday = (chatConversation: { timestamp?: string }[]): boolean => {
    const today = new Date();
    return chatConversation.length > 0 && chatConversation.every(msg => {
        if (!msg.timestamp) return false;

        const msgDate = new Date(msg.timestamp);
        return (
            msgDate.getDate() === today.getDate() &&
            msgDate.getMonth() === today.getMonth() &&
            msgDate.getFullYear() === today.getFullYear()
        );
    });
};

// EXTRACT PRICE FROM STRING FOR SUPERWALL
export const extractPrice = (input: string): number | null => {
    const validPrices = [
        2.99, 6.99, 9.99, 19.99, 39.99, 49.99, 50, 59.99, 79.99
    ];
  
    // CREATE A REGEX THAT MATCHES ALL VALID PRICES (ESCAPED FOR DECIMAL)
    const priceRegex = new RegExp(validPrices
        ?.map(price => price.toString()?.replace('.', '\\.'))
        ?.join('|'));
  
    const match = input?.match(priceRegex);
    
    if (match) {
        return parseFloat(match[0]);
    };
  
    return null;
};

// GENERATE SUMMARY FOR PRIVATE MEMORY BOX
export function generateSummary(name: string, selections: string[]) {
    const topicsMap: Record<string, string> = {
        "Exploring my personality": "exploring his personality",
        "Making friends": "making friends",
        "Getting people to like me": "getting liked",
        "Dating & relationships": "dating",
        "Influencing people": "influencing people",
        "Finding motivation": "finding motivation",
        "Upgrading my style": "upgrading his style",
        "Getting fit fast": "getting fit"
    };
  
    const transformed = selections.map(item => topicsMap[item]);
  
    if (transformed.length === 0) return `${capitalizeFirst(name)} hasn't selected any topics yet.`;
  
    if (transformed.length === 1) return `${capitalizeFirst(name)} needs advice on ${transformed[0]}.`;
  
    const last = transformed.pop();
    return `${capitalizeFirst(name)} needs advice on ${transformed.join(", ")} and ${last}.`;
};  

// CAPITALIZE FIRST LETTER
export const capitalizeFirst = (str: string): string => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
};  