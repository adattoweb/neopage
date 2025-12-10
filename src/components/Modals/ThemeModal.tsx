import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"
import { useEffect, useState } from "react";
import { regex } from "@/helpers/HTTPRegex";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useModalsStore } from "@/store/useModalStore";
import { usePosStore } from "@/store/usePosStore";
import { useThemesStore } from "@/store/useThemesStore";

interface Error {
    text: string
    ID: number
}

export default function ThemeModal(){
    const [link, setLink] = useState("")
    const [error, setError] = useState<Error>({text: "", ID: 0})

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    const lang = useLanguageStore(state => state.lang);
    const posStore = usePosStore.getState()
    const themes = useThemesStore(state => state.themes)
    const setThemes = useThemesStore(state => state.setThemes)

    useEffect(() => { // ТРЕБА БУДЕ ПЕРЕГЛЯНУТИ
        posStore.setPos({x: posStore.pos.x, y: posStore.pos.y})
    }, [modals])

    function disableError(){
        if(error.text !== ""){
            setTimeout(() => {
                setError({text: "", ID: 0})
            }, 6000)
        }
    }

    function addPin(){
        if(!regex.test(link)){
            setError({text: lang === "en" ? "Invalid link format" : "Неправильний формат посилання", ID: 2  })
            disableError()
            return
        }
        if(themes.includes(link)){
            setError({text: lang === "en" ? "This image already exist" : "Таке зображення вже існує", ID: 2  })
            disableError()
            return
        }

        const newThemes = [...themes, link]
        console.log(newThemes)
        localStorage.setItem("neopage-themes", JSON.stringify(newThemes))
        setThemes(newThemes)

        setLink("")
        setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })
        setError({text: "", ID: 0})
    }

    return createPortal(
        <AnimatePresence mode="wait">
            {modals.isThemeCreateOpen && <motion.div key="modal" className={`${styles.modal} back-alpha`} style={{top: posStore.pos.y, left: posStore.pos.x}} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrapper}>
                    <label className={styles.input__label} htmlFor="link">{lang === "en" ? "Link" : "Посилання"}</label>
                    <input className={styles.input} type="text" id="link" value={link} onChange={(e) => setLink(e.target.value)}/>
                    {error.ID === 2 && <p className={styles.error}>{error.text}</p>}
                </div>
                <div className={styles.buttons}>
                    <motion.div className={styles.button} whileTap={{scale: 1.05}} onClick={addPin}>{lang === "en" ? "Add" : "Додати"}</motion.div>
                </div>
            </motion.div>}
        </AnimatePresence>,
        document.getElementById("root")!
    )
}