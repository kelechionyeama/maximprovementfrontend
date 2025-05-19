// import DeviceInfo from "react-native-device-info";
import { BASE_URL, appInfo, auth } from "@/config";

// EDIT USER PROFILE
export const getDefaultRepliesApi = async (payload: any = {}) => {
    try {
        // const deviceId = await DeviceInfo.getUniqueId();
		// const deviceBrand = DeviceInfo.getBrand();
        // const uid = payload.uid || auth.currentUser?.uid;
        const deviceId = "TEMPDEVICEID";
		const deviceBrand = "TEMPDEVICEBRAND";
        const uid = payload.uid;

        const response = await fetch(`${BASE_URL}/defaultquestions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                ...payload,
                deviceId,
                deviceBrand,
                appInfo,
                ...(uid && { uid })
            })
        });

        return response;
    } catch (e) {};
};