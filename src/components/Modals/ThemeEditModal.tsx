import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"
import { useEffect, useRef, useState } from "react";
import { regex } from "@/helpers/HTTPRegex";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useModalsStore } from "@/store/useModalsStore";
import { usePosStore } from "@/store/usePosStore";
import { useThemesStore } from "@/store/useThemesStore";
import { useCustomStore } from "@/store/useCustomThemeStore";
import { useModal } from "@/hooks/useModal";

interface Error {
    text: string
    ID: number
}

export default function ThemeEdit(){
    const link = useCustomStore(state => state.link)
    const setLink = useCustomStore(state => state.setLink)
    const [newLink, setNewLink] = useState(link)
    const [error, setError] = useState<Error>({text: "", ID: 0})

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    const lang = useLanguageStore(state => state.lang);
    const posStore = usePosStore.getState()
    const themes = useThemesStore(state => state.themes)
    const setThemes = useThemesStore(state => state.setThemes)

    useEffect(() => {
        setNewLink(link)
    }, [link])

    function disableError(){
        if(error.text !== ""){
            setTimeout(() => {
                setError({text: "", ID: 0})
            }, 6000)
        }
    }

    function remove(){
        let newThemes = [...themes]
        newThemes = newThemes.filter(el => el !== link)
        setThemes(newThemes)
        setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })
    }

    function editPin(){
        if(!regex.test(newLink)){
            setError({text: lang === "en" ? "Invalid link format" : "Неправильний формат посилання", ID: 2  })
            disableError()
            return
        }
        if(themes.includes(newLink)){
            setError({text: lang === "en" ? "This image already exist" : "Таке зображення вже існує", ID: 2  })
            disableError()
            return
        }

        const newThemes = [...themes]
        const index = newThemes.findIndex(el => el === link)
        newThemes[index] = newLink
        setThemes(newThemes)
        setLink(newLink)

        setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })
        setError({text: "", ID: 0})
    }

    const modalRef = useRef<HTMLDivElement | null>(null)

    const modal = useModal(modalRef)

    let isLeft = false;
    let isTop = false;
    if(window.innerWidth - posStore.pos.x <= modal.width) isLeft = true
    if(window.innerHeight - posStore.pos.y <= modal.height) isTop = true

    return createPortal(
        <AnimatePresence mode="wait">
            {modals.isThemeEditOpen && <motion.div key="modal" ref={modalRef} className={`${styles.modal} back-alpha`} style={{top: isTop ? posStore.pos.y - modal.height : posStore.pos.y, left: isLeft ? posStore.pos.x - modal.width : posStore.pos.x}} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrapper}>
                    <label className={styles.input__label} htmlFor="link">{lang === "en" ? "Link" : "Посилання"}</label>
                    <input className={styles.input} type="text" id="link" value={newLink} onChange={(e) => setNewLink(e.target.value)}/>
                    {error.ID === 2 && <p className={styles.error}>{error.text}</p>}
                </div>
                <div className={styles.buttons}>
                    <motion.div className={styles.button} whileTap={{scale: 1.05}} onClick={remove}>{lang === "en" ? "Delete" : "Видалити"}</motion.div>
                    <motion.div className={styles.button} whileTap={{scale: 1.05}} onClick={editPin}>{lang === "en" ? "Save" : "Зберегти"}</motion.div>
                </div>
            </motion.div>}
        </AnimatePresence>,
        document.getElementById("root")!
    )
}