import { create } from "zustand";

interface isSettingsOpenState {
  isOpen: boolean
  setIsOpen: (value: boolean) => void;
}

export const useSettingsOpenStore = create<isSettingsOpenState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
}));