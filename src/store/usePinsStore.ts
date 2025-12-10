import type { PinObject } from "@/components/Settings/Tabs/Pinned";
import { readLocal } from "@/helpers/readLocal";
import { create } from "zustand";

interface PinsState {
    pins: PinObject[]
    setPins: (value: PinObject[]) => void
}

export const usePinsStore = create<PinsState>((set) => ({
  pins: readLocal("neopage-pins"),
  setPins: (pins) => {
    set({ pins });
  },
}));