import { create } from "zustand";

interface DisplayState {
    display: string
    setDisplay: (value: string) => void
}

export const useDisplayState = create<DisplayState>((set) => ({
    display: localStorage.getItem("neopage-display")!,
    setDisplay: (display) => {
        set({display})
    }
}))