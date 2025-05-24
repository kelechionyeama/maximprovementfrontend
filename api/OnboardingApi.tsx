import { BASE_URL, appInfo } from "@/config";
import { deviceInformation } from "@/HelperFunctions";

// EDIT USER PROFILE
export const sendOnboardingData = async (payload: any = {}, action: string) => {
    try {
        const deviceId = deviceInformation.deviceId;
        const deviceBrand = deviceInformation.deviceBrand;

        // const uid = payload.uid || auth.currentUser?.uid;
        const uid = "TEMPUID";

        const response = await fetch(`${BASE_URL}/onboarding/${action}`, {
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
        return { ok: false, data: e };
    };
};