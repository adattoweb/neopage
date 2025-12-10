import { random } from "@/helpers/random"
import { quotes } from "@/helpers/quotes"
import styles from "./Quotes.module.css"
import { useContext, useState } from "react"
import { LanguageContext } from "@/context/contexts"

export default function Quotes(){
    const [rand] = useState(() => random(0, quotes.length - 1))
        const langContext = useContext(LanguageContext);
        if (!langContext) throw new Error("Context is null");
        
        const { lang } = langContext;
    return (
        <h2 className={styles.quote}>{lang === "en" ? quotes[rand].en : quotes[rand].ua}</h2>
    )
}