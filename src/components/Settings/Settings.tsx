import { useState } from "react"
import styles from "./Settings.module.css"

import NavItem from "./NavItem"
import NavProvider from "./NavProvider"

import { useLanguageStore } from "@/store/useLanguageStore"
import { useSettingsOpenStore } from "@/store/useSettingsOpen"

import { motion, AnimatePresence } from "framer-motion"

export interface SelectedObject {
    name: string
    index: number
}

interface NavItemObject {
  text: string
  select: string
}

export default function Settings(){
    const [selected, setSelected] = useState<SelectedObject>({name: "global", index: 0})

    const lang = useLanguageStore(state => state.lang);
    const isOpen = useSettingsOpenStore(state => state.isOpen)
    const setIsOpen = useSettingsOpenStore(state => state.setIsOpen)
      

    function closeSettings(){
    setIsOpen(false)
  }

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

  // type: "spring", stiffness: 120, damping: 20, mass: 0.8

  const width = window.innerWidth
  const right = width >= 1000 ? 1000 : width

  return (
    <AnimatePresence mode="wait">
      {isOpen && <motion.div className={styles.settings} id="settings" initial={{ x: right }} animate={{ x: 0 }} exit={{ x: right }} transition={{ type: "spring", stiffness: 100, damping: 16, mass: 0.8 }}>
        <div className={styles.menu} id="menu">
          <svg className={styles.cross} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={closeSettings}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <div className={styles.nav}>
            {navArray.map((el, index) => <NavItem key={el.text} text={el.text} select={{ name: el.select, index: index }} selected={selected} setSelected={setSelected} length={navArray.length} />)}
          </div>
        </div>
        <NavProvider selected={selected} />
      </motion.div>}
    </AnimatePresence>
  )
}