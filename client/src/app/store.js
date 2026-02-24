import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  businessId: null,
  setSession: ({ user, tokens, businessId }) => set({
    user,
    accessToken: tokens?.accessToken,
    refreshToken: tokens?.refreshToken,
    businessId
  }),
  logout: () => set({ user: null, accessToken: null, refreshToken: null, businessId: null })
}));
