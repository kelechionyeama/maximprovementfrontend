import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '@/ExportedTypes';

export interface UserProfileState {
    userProfile: UserProfile | null;
    setUserProfile: (userProfile: UserProfile) => void;
};

export const useUserProfileStore = create<UserProfileState>()(
    persist(
        (set) => ({
            userProfile: null,
            setUserProfile: (userProfile) => set({ userProfile })
        }),
        { name: 'user-profile-storage', storage: createJSONStorage(() => AsyncStorage) }
    )
);