import styles from "../Settings.module.css"

import Add from "./Add"
import { useModalsStore, type Modals } from "@/store/useModalsStore"
import { useThemesStore } from "@/store/useThemesStore"
import { useCustomStore } from "@/store/useCustomThemeStore"

export interface Theme {
    src: string
}

interface ThemeProps extends Theme {
    src: string
    link: string
    setLink: (value: string) => void
    modals: Modals
}
  
function ThemesItem({ src, link, setLink, modals }:ThemeProps){
    const setModals = useModalsStore(state => state.setModals)
    function handleClick(){
        setLink(src)
        localStorage.setItem("neopage-background", src)
        document.documentElement.style.setProperty("--background", `url(${src})`)
    }
    function handleContext(e: React.MouseEvent){
        e.preventDefault()
        e.stopPropagation()
        setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: !modals.isThemeEditOpen })
        setLink(src)
    }
    return (
        <div style={{backgroundImage: `url(${src})`}} className={`${styles.theme} ${src === link ? styles.active : ""}`} onClick={handleClick} onContextMenu={handleContext}></div>
    )
}

export default function CustomThemes(){
    const themes = useThemesStore(state => state.themes)

    const link = useCustomStore(state => state.link)
    const setLink = useCustomStore(state => state.setLink)

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)

    console.log(themes)


    return (
        <div className={styles.list} id="list">
            <div className={styles.themes}>
                <Add closeModals={() => setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: !modals.isThemeCreateOpen, isThemeEditOpen: false })}/>
                {themes.map((el, index) => <ThemesItem key={index} src={el} link={link} setLink={setLink} modals={modals}/>)}
            </div>
        </div>
    )
}