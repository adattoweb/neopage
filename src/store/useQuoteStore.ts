import { getLocal } from "@/helpers/getLocal";
import { create } from "zustand";

interface QuoteState {
    quote: string
    setQuote: (value: string) => void
}

export const useQuoteState = create<QuoteState>((set) => ({
    quote: getLocal("neopage-quote", "true"),
    setQuote: (quote) => {
        set({ quote })
    }
}))