import zustand from "zustand";

interface ProfileModalState {
  isOpen: boolean;
  close: () => void;
  open: () => void;
}

const useProfileModal = zustand<ProfileModalState>((set) => ({
  isOpen: false,

  close: () => set({ isOpen: false }),

  open: () => set({ isOpen: true }),
}));

export default useProfileModal;
