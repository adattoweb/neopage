import styles from "../Settings.module.css"

import type { Theme } from "@/helpers/themes"
import { themes } from "@/helpers/themes"
import { useState } from "react"

interface ThemeProps extends Theme {
    index: number
    selectedIndex: number
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}
  
function ThemesItem({ preview, src, index, selectedIndex, setSelectedIndex }:ThemeProps){
    function handleClick(){
        setSelectedIndex(index)
        localStorage.setItem("neopage-background", src)
        document.documentElement.style.setProperty("--background", `url(${src})`)
    }
    return (
        <div style={{backgroundImage: `url(${preview})`}} className={`${styles.theme} ${index === selectedIndex ? styles.active : ""}`} onClick={handleClick}></div>
    )
}

export default function Themes(){
    const [selectedIndex, setSelectedIndex] = useState(themes.findIndex(el => el.src === localStorage.getItem("neopage-background")))

    return (
        <div className={styles.list} id="list">
            <div className={styles.themes}>
                {themes.map((el, index) => <ThemesItem preview={el.preview} src={el.src} index={index} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>)}
            </div>
        </div>
    )
}