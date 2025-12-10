import { create } from "zustand";

interface Modals {
    isContextOpen: boolean
    isEditOpen: boolean
    isCreateOpen: boolean
    isThemeCreateOpen: boolean
    isThemeEditOpen: boolean
}

interface ModalsState {
  modals: Modals
  setModals: (value: Modals) => void;
}

export const useModalsStore = create<ModalsState>((set) => ({
  modals: {isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false},
  setModals: (modals) => {
    set({ modals });
  },
}));