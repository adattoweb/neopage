import { useLanguageStore } from "@/store/useLanguageStore";
import styles from "./DisplayBar.module.css"
import { useNameStore } from "@/store/useNameStore";

export default function HelloBar(){
    const lang = useLanguageStore(state => state.lang);
    const name = useNameStore(state => state.name)
    return (
        <h1 className={styles.hello}>{lang === "en" ? "Hi" : "Привіт"}, {name}</h1>
    )
}