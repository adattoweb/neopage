import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"
import { useEffect, useState } from "react";
import { readLocal } from "@/helpers/readLocal";
import type { PinObject } from "../Settings/Tabs/Pinned";
import { regex } from "@/helpers/HTTPRegex";
import { useModalsStore } from "@/store/useModalStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { usePosStore } from "@/store/usePosStore";

interface ModalProps {
    setPins: React.Dispatch<React.SetStateAction<PinObject[]>>
}

interface Error {
    text: string
    ID: number
}

export default function CreateModal({ setPins }:ModalProps){
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [error, setError] = useState<Error>({text: "", ID: 0})

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    const lang = useLanguageStore(state => state.lang);
    const posStore = usePosStore.getState()

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
        const pinsArray = readLocal("neopage-pins")

        if(name.length === 0) {
            setError({text: lang === "en" ? "Enter the field" : "Заповніть поле", ID: 1})
            disableError()
            return
        }

        if(pinsArray.some((el:PinObject) => el.name === name)) {
            setError({text: lang === "en" ? "This name already exists" : "Така назва вже існує", ID: 1})
            disableError()
            return
        }
        
        if(!regex.test(link)){
            setError({text: lang === "en" ? "Invalid link format" : "Неправильний формат посилання", ID: 2  })
            disableError()
            return
        }

        const newPin = {
            name: name,
            link: link,
        }
        pinsArray.push(newPin)
        setPins(pinsArray)
        localStorage.setItem("neopage-pins", JSON.stringify(pinsArray))

        setName("")
        setLink("")
        setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })
        setError({text: "", ID: 0})
    }

    return createPortal(
        <AnimatePresence mode="wait">
            {modals.isCreateOpen && <motion.div key="modal" className={`${styles.modal} back-alpha`} style={{top: posStore.pos.y, left: posStore.pos.x}} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} onClick={(e) => e.stopPropagation()}>
                <div className={styles.wrapper}>
                    <label className={styles.input__label} htmlFor="name">{lang === "en" ? "Name" : "Назва"}</label>
                    <input className={styles.input} type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={32}/>
                    {error.ID === 1 && <p className={styles.error}>{error.text}</p>}
                </div>
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