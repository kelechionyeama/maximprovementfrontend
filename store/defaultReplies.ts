import { create } from 'zustand';

interface DefaultRepliesState {
    defaultReplies: any[]; // You can type this more strictly if you know the shape
    setDefaultReplies: (replies: any[]) => void;
};

export const useDefaultRepliesStore = create<DefaultRepliesState>((set) => ({
    defaultReplies: [],
    setDefaultReplies: (replies) => set({ defaultReplies: replies })
}));