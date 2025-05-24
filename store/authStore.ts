import { UserType } from '@/utils/types';
import { create } from 'zustand';

type AuthStoreType = {
	user: UserType | null;
	setUser: (user: UserType | null) => Promise<void>;
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
}));
