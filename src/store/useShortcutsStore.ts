import { getLocal } from "@/helpers/getLocal"
import { create } from "zustand"

interface DisplayState {
    shortcuts: string
    setShortcuts: (value: string) => void
}

export const useShortcutsStore = create<DisplayState>(set => ({
    shortcuts: getLocal("neopage-shortcuts", "text"),
    setShortcuts: shortcuts => {
        set({ shortcuts })
    },
}))
