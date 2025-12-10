import { useContext, useState } from "react"
import styles from "./Settings.module.css"

import NavItem from "./NavItem"
import NavProvider from "./NavProvider"

import { motion } from "framer-motion"
import type { PinObject } from "./Tabs/Pinned"
import { LanguageContext } from "@/context/contexts"

interface SettingsProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    pins: PinObject[]
    setSelectedName: React.Dispatch<React.SetStateAction<string>>
    display: string
    setDisplay: React.Dispatch<React.SetStateAction<string>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    themes: string[]
    setThemes: React.Dispatch<React.SetStateAction<string[]>>
}

export interface NavItemObject {
    text: string
    select: string
}

export interface SelectedObject {
    name: string
    index: number
}

export default function Settings({ isOpen, setIsOpen, pins, setSelectedName, display, setDisplay, name, setName, themes, setThemes }:SettingsProps){
    const [selected, setSelected] = useState<SelectedObject>({name: "global", index: 0})

    const langContext = useContext(LanguageContext);
    if (!langContext) throw new Error("Context is null");
    
    const { lang } = langContext;

    const navArray: NavItemObject[] = [
        {
          text: lang === "en" ? "General" : "Загальне",
          select: "global"
        },
        {
          text: lang === "en" ? "Preset themes" : "Готові теми",
          select: "themes_done"
        },
        {
          text: lang === "en" ? "Custom themes" : "Власні теми",
          select: "themes_custom"
        },
        {
          text: lang === "en" ? "Pinned tabs" : "Закріпленні вкладки",
          select: "pinned"
        },
        {
          text: lang === "en" ? "Information" : "Інформація",
          select: "information"
        },
      ]
      

    function closeSettings(){
        setIsOpen(false)
    }

    if(!isOpen) return
    return (
        <motion.div className={styles.settings} id="settings">
            <div className={styles.menu} id="menu">
                <svg className={styles.cross} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={closeSettings}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <div className={styles.nav}>
                    {navArray.map((el, index) => <NavItem key={el.text} text={el.text} select={{name: el.select, index: index}} selected={selected} setSelected={setSelected} length={navArray.length}/>)}
                </div>
            </div>
            <NavProvider selected={selected} pins={pins} setSelectedName={setSelectedName} display={display} setDisplay={setDisplay} name={name} setName={setName} themes={themes} setThemes={setThemes}/>
        </motion.div>
    )
}