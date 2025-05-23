import { UserType } from '@/utils/types';
import { create } from 'zustand';

type AuthStoreType = {
	user: UserType | null;
	setUser: () => Promise<void>;
};

export const useAuthStore = create<AuthStoreType>((set, get) => ({
	user: null,
	setUser: async () => {},
}));
