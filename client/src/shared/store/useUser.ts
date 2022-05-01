import zustand from "zustand";

interface UserState {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useUser = zustand<UserState>((set) => ({
  isAuthenticated: null,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
}));

export default useUser;
