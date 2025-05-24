import Superwall, { PaywallInfo, PaywallPresentationHandler } from "@superwall/react-native-superwall";
import { sendPaywallData } from "./PaywallApi";
import { db } from "../config";
import { doc, setDoc } from "firebase/firestore";   
import { RCPurchaseController } from "@/utils/purchaseController";
import { extractPrice } from "@/HelperFunctions";

export type PaywallResult =
  | {
      type: "purchased";
      productId: string;
    }
  | {
      type: "declined";
    }
  | {
      type: "restored";
    };

export const callSuperwall = async (deviceId: string) => {
    const handler = new PaywallPresentationHandler();

    handler.onPresent(async (paywallInfo) => {
        const price = extractPrice(paywallInfo.name);

        sendPaywallData({
            price,
            identifier: paywallInfo.identifier,
            name: paywallInfo.name,
            url: paywallInfo.url,
            productIds: paywallInfo.productIds,
            isFreeTrialAvailable: paywallInfo.isFreeTrialAvailable,
            featureGatingBehavior: paywallInfo.featureGatingBehavior,
            closeReason: paywallInfo.closeReason
        }, "present");

        await setDoc(doc(db, "users", deviceId), {
            paywallPrice: price
        }, { merge: true });
    });

    handler.onError((error) => {
        sendPaywallData({ error }, "error");
    });

    handler.onDismiss(async (paywallInfo: PaywallInfo, result: PaywallResult) => {
        const price = extractPrice(paywallInfo.name);

        if (result?.type === "purchased") {
            sendPaywallData({
                price,
                productId: result.productId,
                identifier: paywallInfo.identifier,
                name: paywallInfo.name,
                url: paywallInfo.url,
                productIds: paywallInfo.productIds,
                isFreeTrialAvailable: paywallInfo.isFreeTrialAvailable,
                featureGatingBehavior: paywallInfo.featureGatingBehavior,
                closeReason: paywallInfo.closeReason
            }, "purchased");

            await setDoc(doc(db, "users", deviceId), {
                wentThroughPaywallDate: new Date()
            }, { merge: true });  
        };
    
        sendPaywallData({
            price,
            identifier: paywallInfo.identifier,
            name: paywallInfo.name,
            url: paywallInfo.url,
            productIds: paywallInfo.productIds,
            isFreeTrialAvailable: paywallInfo.isFreeTrialAvailable,
            featureGatingBehavior: paywallInfo.featureGatingBehavior,
            closeReason: paywallInfo.closeReason
        }, "dismissed");
    });

    await Superwall.shared.register({
        placement: "onboardingComplete",
        params: new Map([["via", "onboardingComplete"]]),
        handler,
        feature: async () => {

            // SYNC SUBSCRIPTION STATUS
            const purchaseController = new RCPurchaseController();
            purchaseController.syncSubscriptionStatus();
        }
    });
};