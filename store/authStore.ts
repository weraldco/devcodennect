import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { UserType } from '@/utils/types';
import { create } from 'zustand';

type AuthStoreType = {
	user: UserType | null;
	setUser: (user: UserType | null) => Promise<void>;
	fetchUserData: () => Promise<null | void>;
	clearUser: () => Promise<void>;
};

export const useAuthStore = create<AuthStoreType>((set, get) => ({
	user: null,
	setUser: async (user: UserType | null) => {
		try {
			if (user) {
				set({ user: user });
			}
		} catch (error) {
			console.error('Unable  to set the user data');
		}
	},
	fetchUserData: async () => {
		const response = await axiosInstance.get(API_PATHS.AUTH.GETUSERINFO);
		if (response.data.user) {
			set({ user: response.data.user });
		}
	},
	clearUser: async () => {
		set({ user: null });
	},
}));
