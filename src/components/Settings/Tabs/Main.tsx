import styles from "../Settings.module.css"
import { NavBlock, NavInput, NavRange } from "./Constructor"
import Dropdown from "@/components/Dropdown/Dropdown"
import { useContext, useState } from "react"

import { LanguageContext, SettingsContext } from "@/context/contexts"

interface MainProps {
    display: string
    setDisplay: React.Dispatch<React.SetStateAction<string>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
}

export default function Main({ display, setDisplay, name, setName }:MainProps){

    const context = useContext(SettingsContext);
    const langContext = useContext(LanguageContext);
    if (!context || !langContext) throw new Error("Context is null");

    const { blur, setBlur, transparency, setTransparency, radius, setRadius} = context;
    const { lang, setLang } = langContext;

    const [theme, setTheme] = useState(localStorage.getItem("neopage-theme")!)
    const [quote, setQuote] = useState(localStorage.getItem("neopage-quote")!)
    const [searchEngine, setSearchEngine] = useState(localStorage.getItem("neopage-search-engine")!)
    function switchParametr(setter: React.Dispatch<React.SetStateAction<string>>, value: string, key: string, func?: (value: string) => void){ // додати перевірку!
        value = String(value)
        setter(value)
        localStorage.setItem(key, value)
        if(func){
            func(value)
        }
    }
    function changeTheme(theme: string){
        const isDark = theme === "dark"
        const root = document.getElementById("root")
        if(isDark) {
            root?.classList.add("dark")
        } else {
            root?.classList.remove("dark")
        }
    }

    return (
        <div className={styles.list} id="list">
            <NavBlock name={lang === "en" ? "Language" : "Мова"}>
                <Dropdown selected={lang} setSelected={(value: string) => switchParametr(setLang, value, "neopage-lang", setLang)} array={[["EN", "en"], ["UA", "ua"]]}/>
            </NavBlock>
            <NavBlock name={lang === "en" ? "Theme" : "Тема"}>
                <Dropdown selected={theme} setSelected={(value: string) => switchParametr(setTheme, value, "neopage-theme", changeTheme)} array={[[lang === "en" ? "Dark" : "Темна", "dark"], [lang === "en" ? "Light" : "Світла", "light"]]}/>
            </NavBlock>
            <NavBlock name={lang === "en" ? "Quotes" : "Цитати"}>
                <Dropdown selected={quote} setSelected={(value: string) => switchParametr(setQuote, value, "neopage-quote")} array={[[lang === "en" ? "Enabled" : "Уввімкнено", "true"], [lang === "en" ? "Disabled" : "Вимкнено", "false"]]}/>
            </NavBlock>
            <NavBlock name={lang === "en" ? "Search engine" : "Пошукова система"}>
                <Dropdown selected={searchEngine} setSelected={(value: string) => switchParametr(setSearchEngine, value, "neopage-search-engine")} array={[["Google", "google"], ["Bing", "bing"], ["DuckDuckGo", "duckduckgo"], ["Yahoo!", "yahoo"], ["Qwant", "qwant"]]} minWidth={window.innerWidth > 1000 ? 130 : 80}/>
            </NavBlock>
            <NavBlock name={lang === "en" ? "Display" : "Виводити"}>
                <Dropdown selected={display} setSelected={(value: string) => switchParametr(setDisplay, value, "neopage-display")} array={[[lang === "en" ? "Greetings" : "Привітання", "greetings"], [lang === "en" ? "Time" : "Час", "time"], [lang === "en" ? "Nothing" : "Нічого", "nothing"]]} minWidth={window.innerWidth > 1000 ? 130 : 80}/>
            </NavBlock>
            <NavBlock name={lang === "en" ? "Nickname" : "Нікнейм"}>
                <NavInput value={name} onChange={e => switchParametr(setName, e.target.value, "neopage-name")} maxLength={32}/>
            </NavBlock>
            <NavBlock name={lang === "en" ? "Background blur" : "Розмиття фону"}>
                <NavRange value={+blur} onChange={e => switchParametr(setBlur, e.target.value, "neopage-blur")} min={0} max={80}/>
            </NavBlock>
            <NavBlock name={lang === "en" ? "Background transparency" : "Прозорість фону"}>
                <NavRange value={+transparency} onChange={e => switchParametr(setTransparency, e.target.value, "neopage-transparency")} min={0} max={50}/>
            </NavBlock>
            <NavBlock name={lang === "en" ? "Border radius" : "Закруглення кордонів"}>
                <NavRange value={+radius} onChange={e => switchParametr(setRadius, e.target.value, "neopage-radius")} min={0} max={32}/>
            </NavBlock>
        </div>
    )
}