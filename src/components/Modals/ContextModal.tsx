import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"
import type { Pos } from "@/App";
import { useContext } from "react";
import { LanguageContext, ModalsContext } from "@/context/contexts";

interface ModalProps {
    pos: React.RefObject<Pos>
    setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ pos, setIsSettingsOpen }:ModalProps){
    const context = useContext(ModalsContext);
    if (!context) throw new Error("Context is null");

    const { modals } = context;
    function openSettings(){
        setIsSettingsOpen(true)
    }

    const langContext = useContext(LanguageContext);
    if (!langContext) throw new Error("Context is null");
        
    const { lang } = langContext;

    return createPortal(
        <AnimatePresence mode="wait">
            {modals.isContextOpen && <motion.div key="modal" className={`${styles.context__modal} back-alpha`} style={{top: pos.current.y, left: pos.current.x}} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}}>
                <p className={styles.item} onClick={openSettings}>{lang === "en" ? "Settings" : "Налаштування"}</p>
                <a className={styles.item} target="_blank" href="https://github.com/adattoweb">{lang === "en" ? "Developer’s GitHub" : "Github розробника"}</a>
            </motion.div>}
        </AnimatePresence>,
        document.getElementById("root")!
    )
}