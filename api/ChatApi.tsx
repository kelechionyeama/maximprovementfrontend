import { BASE_URL, appInfo } from "@/config";
import { deviceInformation } from "@/HelperFunctions";

// EDIT USER PROFILE
export const chatApi = async (payload: any = {}) => {
    try {
        const deviceId = deviceInformation.deviceId;
        const deviceBrand = deviceInformation.deviceBrand;

        // const uid = payload.uid || auth.currentUser?.uid;
        const uid = "TEMPUID";

        const response = await fetch(`${BASE_URL}/askmax`, {
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