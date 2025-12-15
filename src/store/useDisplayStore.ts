import { getLocal } from "@/helpers/getLocal";
import { create } from "zustand";

interface DisplayState {
    display: string
    setDisplay: (value: string) => void
}

export const useDisplayState = create<DisplayState>((set) => ({
    display: getLocal("neopage-display", "greetings"),
    setDisplay: (display) => {
        set({display})
    }
}))