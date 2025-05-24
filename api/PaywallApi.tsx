import { deviceInformation } from "@/HelperFunctions";
import { appInfo, BASE_URL } from "../config";

export const sendPaywallData = async (payload: any = {}, endpoint: string) => {
    try {
        const deviceId = deviceInformation.deviceId;
        const deviceBrand = deviceInformation.deviceBrand;

        // const uid = payload.uid || auth.currentUser?.uid;
        const uid = "TEMPUID";

        const response = await fetch(`${BASE_URL}/paywall/${endpoint}`, {
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

        return { ok: response.ok, data: await response.json() };
    } catch (e) {
        return { ok: false, error: e };
    }
};