import { useContext } from "react";
import styles from "./DisplayBar.module.css"
import { LanguageContext } from "@/context/contexts";

interface BarProps {
    name: string
}

export default function HelloBar({ name }:BarProps){
    const langContext = useContext(LanguageContext);
    
    if(langContext === null) return

    const { lang } = langContext;
    return (
        <h1 className={styles.hello}>{lang === "en" ? "Hi" : "Привіт"}, {name}</h1>
    )
}