import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import { UserType } from '@/utils/types';
import { create } from 'zustand';

type UserStoreType = {
	users: UserType[] | null;
	user: UserType | null;
	fetchAllUser: () => Promise<void>;
	fetchUser: (id: number) => Promise<void>;
};

export const useUserStore = create<UserStoreType>((set, get) => ({
	users: null,
	user: null,
	fetchAllUser: async () => {},
	fetchUser: async (id) => {
		const response = await axiosInstance.get(API_PATHS.USER.GETUSER(id));
		if (!response.data.user) console.log('Error fetching User.');
		set({ user: response.data.user });
	},
}));
