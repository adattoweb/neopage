import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"
import { useLanguageStore } from "@/store/useLanguageStore";
import { useModalsStore } from "@/store/useModalStore";
import { usePosStore } from "@/store/usePosStore";
import { useSettingsOpenStore } from "@/store/useSettingsOpen";

export default function Modal(){
    const setIsOpen = useSettingsOpenStore(state => state.setIsOpen)
    function openSettings(){
        setIsOpen(true)
    }

    const modals = useModalsStore(state => state.modals)
    const lang = useLanguageStore(state => state.lang);
    const posStore = usePosStore.getState()

    const modal = {
        width: 230,
        height: 100,
    }

    let isLeft = false;
    let isTop = false;
    if(window.innerWidth - posStore.pos.x <= modal.width) isLeft = true
    if(window.innerHeight - posStore.pos.y <= modal.height) isTop = true

    return createPortal(
        <AnimatePresence mode="wait">
            {modals.isContextOpen && <motion.div key="modal" className={`${styles.context__modal} back-alpha`} style={{top: isTop ? posStore.pos.y - modal.height : posStore.pos.y, left: isLeft ? posStore.pos.x - modal.width : posStore.pos.x}} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}}>
                <p className={styles.item} onClick={openSettings}>{lang === "en" ? "Settings" : "Налаштування"}</p>
                <a className={styles.item} target="_blank" href="https://github.com/adattoweb">{lang === "en" ? "Developer’s GitHub" : "Github розробника"}</a>
            </motion.div>}
        </AnimatePresence>,
        document.getElementById("root")!
    )
}