import styles from "./Modal/Modal.module.css"
import { useLanguageStore } from "@/store/useLanguageStore";
import { useModalsStore } from "@/store/useModalsStore";
import { useSettingsOpenStore } from "@/store/useSettingsOpen";

import { Modal } from "./Modal/Modal";
import { Link } from "./Modal/Constructor";

export default function ContextModal(){
    const setIsOpen = useSettingsOpenStore(state => state.setIsOpen)
    function openSettings(){
        setIsOpen(true)
    }

    const modals = useModalsStore(state => state.modals)
    const lang = useLanguageStore(state => state.lang);

    return (
        <Modal className={styles.context__modal} isOpen={modals.isContextOpen}>
            <Link onClick={openSettings}>{lang === "en" ? "Settings" : "Налаштування"}</Link>
            <Link target="_blank" href="https://github.com/adattoweb">{lang === "en" ? "Developer’s GitHub" : "Github розробника"}</Link>
        </Modal>
    )
}