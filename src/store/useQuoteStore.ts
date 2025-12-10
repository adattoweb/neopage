import { create } from "zustand";

interface QuoteState {
    quote: string
    setQuote: (value: string) => void
}

export const useQuoteState = create<QuoteState>((set) => ({
    quote: localStorage.getItem("neopage-quote")!,
    setQuote: (quote) => {
        set({ quote })
    }
}))