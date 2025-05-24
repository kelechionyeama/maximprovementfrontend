// import { Platform } from "react-native";
// import Superwall, {
//     PurchaseController,
//     PurchaseResult,
//     RestorationResult,
//     SubscriptionStatus,
//     PurchaseResultCancelled,
//     PurchaseResultFailed,
//     PurchaseResultPending,
//     PurchaseResultPurchased
// } from '@superwall/react-native-superwall';
// import Purchases, {
//     type CustomerInfo,
//     PRODUCT_CATEGORY,
//     type PurchasesStoreProduct,
//     type SubscriptionOption,
//     PURCHASES_ERROR_CODE,
//     type MakePurchaseResult
// } from "react-native-purchases";
// import { deviceInformation } from "@/HelperFunctions";

// export class RCPurchaseController extends PurchaseController {
//     private static instance: RCPurchaseController;
//     private initialized = false;

//     constructor() {
//         super();
//         if (RCPurchaseController.instance) {
//             return RCPurchaseController.instance;
//         };
//         RCPurchaseController.instance = this;
//         this.initialize();
//     };

//     private async initialize() {
//         if (this.initialized) return;
        
//         const deviceId = deviceInformation.deviceId;
//         Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
//         const apiKey = Platform.OS === "ios" ? "" : "";
//         Purchases.configure({ apiKey, appUserID: deviceId });
        
//         this.initialized = true;
//     };

//     syncSubscriptionStatus() {
//         Purchases.addCustomerInfoUpdateListener((customerInfo) => {
//             const entitlementIds = Object.keys(customerInfo.entitlements.active);

//             Superwall.shared.setSubscriptionStatus(
//                 entitlementIds.length === 0
//                 ? SubscriptionStatus.Inactive()
//                 : SubscriptionStatus.Active(entitlementIds)
//             );
//         });
//     };

//     async purchaseFromAppStore(productId: string): Promise<PurchaseResult> {
//         const products = await Promise.all([
//             Purchases.getProducts([productId], PRODUCT_CATEGORY.SUBSCRIPTION),
//             Purchases.getProducts([productId], PRODUCT_CATEGORY.NON_SUBSCRIPTION),
//         ]).then((results) => results.flat());

//         // ASSUMING AN EQUIVALENT FOR DART'S FIRSTORNULL IS NOT DIRECTLY AVAILABLE IN TYPESCRIPT,
//         // SO USING A SIMPLE CONDITIONAL CHECK
//         const storeProduct = products.length > 0 ? products[0] : null;

//         if (!storeProduct) {
//             return new PurchaseResultFailed("Failed to find store product for $productId");
//         };

//         return await this._purchaseStoreProduct(storeProduct);
//     };

//     async purchaseFromGooglePlay(productId: string, basePlanId?: string, offerId?: string): Promise<PurchaseResult> {
//         // FIND PRODUCTS MATCHING PRODUCTID FROM REVENUECAT
//         const products = await Promise.all([
//             Purchases.getProducts([productId], PRODUCT_CATEGORY.SUBSCRIPTION),
//             Purchases.getProducts([productId], PRODUCT_CATEGORY.NON_SUBSCRIPTION)
//         ]).then((results) => results.flat());

//         // CHOOSE THE PRODUCT WHICH MATCHES THE GIVEN BASE PLAN.
//         // IF NO BASE PLAN SET, SELECT FIRST PRODUCT OR FAIL.
//         const storeProductId = `${productId}:${basePlanId}`;

//         // INITIALIZE MATCHINGPRODUCT AS NULL EXPLICITLY
//         let matchingProduct: PurchasesStoreProduct | null = null;

//         // LOOP THROUGH EACH PRODUCT IN THE PRODUCTS ARRAY
//         for (const product of products) {
//             // CHECK IF THE CURRENT PRODUCT'S IDENTIFIER MATCHES THE GIVEN STORE PRODUCT ID
//             if (product.identifier === storeProductId) {
//                 // IF A MATCH IS FOUND, ASSIGN THIS PRODUCT TO MATCHING PRODUCT
//                 matchingProduct = product;
//                 // BREAK THE LOOP AS WE FOUND OUR MATCHING PRODUCT
//                 break;
//             };
//         };

//         let storeProduct: PurchasesStoreProduct | null =
//             matchingProduct ??
//             (products.length > 0 && typeof products[0] !== "undefined" ? products[0] : null);

//         // IF NO PRODUCT IS FOUND (EITHER MATCHING OR THE FIRST ONE), RETURN A FAILED PURCHASE RESULT.
//         if (storeProduct === null) {
//             return new PurchaseResultFailed("Product not found");
//         };

//         switch (storeProduct.productCategory) {
//             case PRODUCT_CATEGORY.SUBSCRIPTION:
//             const subscriptionOption = await this._fetchGooglePlaySubscriptionOption(
//                 storeProduct,
//                 basePlanId,
//                 offerId
//             );  

//             if (subscriptionOption === null) {
//                 return new PurchaseResultFailed("Valid subscription option not found for product.");
//             };

//             return await this._purchaseSubscriptionOption(subscriptionOption);
//         case PRODUCT_CATEGORY.NON_SUBSCRIPTION:
//             return await this._purchaseStoreProduct(storeProduct)
//         default:
//                 return new PurchaseResultFailed("Unable to determine product category");
//         };
//     };

//     private async _purchaseStoreProduct(storeProduct: PurchasesStoreProduct): Promise<PurchaseResult> {
//         const performPurchase = async (): Promise<MakePurchaseResult> => {
//         // ATTEMPT TO PURCHASE PRODUCT
//         const makePurchaseResult = await Purchases.purchaseStoreProduct(storeProduct);
//             return makePurchaseResult;
//         };

//         return await this.handleSharedPurchase(performPurchase);
//     };

//     private async _fetchGooglePlaySubscriptionOption(
//         storeProduct: PurchasesStoreProduct,
//         basePlanId?: string,
//         offerId?: string
//     ): Promise<SubscriptionOption | null> {
//         const subscriptionOptions = storeProduct.subscriptionOptions

//         if (subscriptionOptions && subscriptionOptions.length > 0) {
//             // CONCATENATE BASE + OFFER ID
//             const subscriptionOptionId = this.buildSubscriptionOptionId(basePlanId, offerId)

//             // FIND FIRST SUBSCRIPTION OPTION THAT MATCHES THE SUBSCRIPTION OPTION ID OR USE THE DEFAULT OFFER
//             let subscriptionOption: SubscriptionOption | null = null

//             // SEARCH FOR THE SUBSCRIPTION OPTION WITH THE MATCHING ID
//             for (const option of subscriptionOptions) {
//                 if (option.id === subscriptionOptionId) {
//                     subscriptionOption = option;
//                     break;
//                 };
//             };

//             // IF NO MATCHING SUBSCRIPTION OPTION IS FOUND, USE THE DEFAULT OPTION
//             subscriptionOption = subscriptionOption ?? storeProduct.defaultOption;

//             // RETURN THE SUBSCRIPTION OPTION
//             return subscriptionOption;
//         };

//         return null;
//     };

//     private buildSubscriptionOptionId(basePlanId?: string, offerId?: string): string {
//         let result = "";

//         if (basePlanId !== null) {
//             result += basePlanId;
//         };

//         if (offerId !== null) {
//             if (basePlanId !== null) {
//                 result += ":";
//             };

//             result += offerId;
//         };

//         return result;
//     };

//     private async _purchaseSubscriptionOption(subscriptionOption: SubscriptionOption): Promise<PurchaseResult> {
//         // DEFINE THE ASYNC PERFORM PURCHASE FUNCTION
//         const performPurchase = async (): Promise<MakePurchaseResult> => {
//         // ATTEMPT TO PURCHASE PRODUCT
//         const purchaseResult = await Purchases.purchaseSubscriptionOption(subscriptionOption)
//             return purchaseResult;
//         };

//         const purchaseResult: PurchaseResult = await this.handleSharedPurchase(performPurchase);
//         return purchaseResult;
//     };

//     private async handleSharedPurchase(
//         performPurchase: () => Promise<MakePurchaseResult>
//     ): Promise<PurchaseResult> {
//         try {
//             // PERFORM THE PURCHASE USING THE FUNCTION PROVIDED
//             const makePurchaseResult = await performPurchase();

//             // HANDLE THE RESULTS
//             if (this.hasActiveEntitlementOrSubscription(makePurchaseResult.customerInfo)) {
//                 return new PurchaseResultPurchased();
//             } else {
//                 return new PurchaseResultFailed("No active subscriptions found.");
//             };
//         } catch (e: any) {
//             // CATCH BLOCK TO HANDLE EXCEPTIONS, ADJUSTED FOR TYPESCRIPT
//             if (e.userCancelled) {
//                 return new PurchaseResultCancelled();
//             };

//             if (e.code === PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR) {
//                 return new PurchaseResultPending();
//             };

//             return new PurchaseResultFailed(e.message);
//         };
//     };

//     async restorePurchases(): Promise<RestorationResult> {
//         try {
//             await Purchases.restorePurchases();
//             return RestorationResult.restored();
//         } catch (e: any) {
//             return RestorationResult.failed(e.message);
//         };
//     };

//     private hasActiveEntitlementOrSubscription(customerInfo: CustomerInfo): Boolean {
//         return (
//             customerInfo.activeSubscriptions.length > 0 &&
//             Object.keys(customerInfo.entitlements.active).length > 0
//         );
//     };
// };