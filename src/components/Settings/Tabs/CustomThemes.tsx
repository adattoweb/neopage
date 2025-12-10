import styles from "../Settings.module.css"

import { useState } from "react"
import Add from "./Add"
import { useModalsStore } from "@/store/useModalStore"
import { useThemesStore } from "@/store/useThemesStore"

export interface Theme {
    src: string
}

interface ThemeProps extends Theme {
    index: number
    selectedIndex: number
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
    themes: string[]
    setThemes: (value: string[]) => void
}
  
function ThemesItem({ src, index, selectedIndex, setSelectedIndex, themes, setThemes }:ThemeProps){
    function handleClick(){
        setSelectedIndex(index)
        localStorage.setItem("neopage-background", src)
        document.documentElement.style.setProperty("--background", `url(${src})`)
    }
    function handleContext(e: React.MouseEvent){
        e.preventDefault()
        let newThemes = [...themes]
        newThemes = newThemes.filter(el => el !== src)
        setThemes(newThemes)
        localStorage.setItem("neopage-themes", JSON.stringify(newThemes))
    }
    return (
        <div style={{backgroundImage: `url(${src})`}} className={`${styles.theme} ${index === selectedIndex ? styles.active : ""}`} onClick={handleClick} onContextMenu={handleContext}></div>
    )
}

export default function CustomThemes(){
    const themes = useThemesStore(state => state.themes)
    const setThemes = useThemesStore(state => state.setThemes)

    const [selectedIndex, setSelectedIndex] = useState(themes.findIndex(el => el === localStorage.getItem("neopage-background")))

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)


    return (
        <div className={styles.list} id="list">
            <div className={styles.themes}>
                <Add closeModals={() => setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: !modals.isThemeCreateOpen, isThemeEditOpen: false })}/>
                {themes.map((el, index) => <ThemesItem key={index} src={el} index={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} themes={themes} setThemes={setThemes}/>)}
            </div>
        </div>
    )
}