// import DeviceInfo from "react-native-device-info";
import { BASE_URL, appInfo, auth } from "@/config";

// EDIT USER PROFILE
export const chatHistoryApi = async (payload: any = {}, action: string = "get") => {
    try {
        // const deviceId = await DeviceInfo.getUniqueId();
		// const deviceBrand = DeviceInfo.getBrand();
        // const uid = payload.uid || auth.currentUser?.uid;
        const deviceId = "TEMPDEVICEID";
		const deviceBrand = "TEMPDEVICEBRAND";
        const uid = "TEMPUID";

        const response = await fetch(`${BASE_URL}/${action}/chathistory`, {
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