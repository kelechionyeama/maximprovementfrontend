import { Timestamp } from "firebase/firestore";

export interface ChatHistory {
    id: string;
    apiModel: string;
    appBuild: number;
    appVersion: string;
    promptTokens: number;
    completionTokens: number;
    cost: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deviceId: string;
    uid: string;
    feature: string;
    messageArray: {
        content: string;
        role: string;
        timestamp: string;
    }[];
    isDeleted: boolean;
    chatLength: number;
};