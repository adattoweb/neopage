import { random } from "@/helpers/random"
import { quotes } from "@/helpers/quotes"
import styles from "./Quotes.module.css"
import { useState } from "react"
import { useLanguageStore } from "@/store/useLanguageStore";

export default function Quotes(){
    const lang = useLanguageStore(state => state.lang);
    const [rand] = useState(() => random(0, quotes.length - 1))
    return (
        <h2 className={styles.quote}>{lang === "en" ? quotes[rand].en : quotes[rand].ua}</h2>
    )
}