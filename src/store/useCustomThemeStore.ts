import { create } from "zustand";

interface CustomState {
    link: string
    setLink: (value: string) => void
}

export const useCustomStore = create<CustomState>((set) => ({
    link: "",
    setLink: (link) => {
        set({link})
    }
}))