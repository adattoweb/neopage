import { random } from "@/helpers/random"
import { quotes } from "@/helpers/quotes"
import styles from "./Quotes.module.css"
import { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore";
import { useQuoteState } from "@/store/useQuoteStore";

export default function Quotes(){
    const lang = useLanguageStore(state => state.lang);
    const quote = useQuoteState(state => state.quote)
    const [rand] = useState(() => random(0, quotes.length - 1))
    if(quote !== "true") return null
    return (
        <h2 className={` ${styles.quote}`}>{lang === "en" ? quotes[rand].en : quotes[rand].ua}</h2>
    )
}