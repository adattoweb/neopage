import { create } from "zustand";

interface SelectedNameState {
    selectedName: string
    setSelectedName: (value: string) => void
}

export const useSelectedNameStore = create<SelectedNameState>((set) => ({
  selectedName: "",
  setSelectedName: (selectedName) => {
    set({ selectedName });
  },
}));