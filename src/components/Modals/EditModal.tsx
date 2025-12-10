import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"
import styles from "./Modal.module.css"
import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useModalsStore } from "@/store/useModalStore";
import { usePosStore } from "@/store/usePosStore";
import { usePinsStore } from "@/store/usePinsStore";

import type { PinObject } from "../Settings/Tabs/Pinned";
import { useSelectedNameStore } from "@/store/useSelectedNameStore";

export default function EditModal(){

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    const lang = useLanguageStore(state => state.lang);
    const posStore = usePosStore.getState()
    const pins = usePinsStore(state => state.pins)
    const setPins = usePinsStore(state => state.setPins)
    
    const selectedName = useSelectedNameStore(state => state.selectedName)
    const setSelectedName = useSelectedNameStore(state => state.setSelectedName)

    let pin = pins.find((el:PinObject) => el.name === selectedName)
    const index = pins.findIndex((el:PinObject) => el.name === selectedName)
    if(pin === undefined) pin = {
        name: "",
        link: ""
    }
    const [name, setName] = useState(selectedName)
    const [link, setLink] = useState(pin.link)

    useEffect(() => {
        setName(pin.name)
        setLink(pin.link)
    }, [selectedName])

    useEffect(() => { // ТРЕБА БУДЕ ПЕРЕГЛЯНУТИ
        posStore.setPos({x: posStore.pos.x, y: posStore.pos.y})
    }, [modals])

    function editPin(newName:string, newLink:string){
        if(!pin) return
        if(newName === name) setLink(newLink) 
        else setName(newName)

        setSelectedName(newName)
        pin.name = newName;
        pin.link = newLink;
        pins[index] = pin

        setPins(pins)
        localStorage.setItem("neopage-pins", JSON.stringify(pins))
    }

    function deletePin(){
        const newPins: PinObject[] = [...pins]
        newPins.splice(index, 1)

        pin!.name = ""
        pin!.link = ""

        setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })
        setSelectedName("")
        setPins(pins)
        localStorage.setItem("neopage-pins", JSON.stringify(pins))
    }

    return createPortal(
        <AnimatePresence mode="wait">
            {modals.isEditOpen && <motion.div key="modal" className={`${styles.modal} back-alpha`} style={{top:posStore.pos.y, left:posStore.pos.x}} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.header}>{selectedName}</h2>
                <div className={styles.wrapper}>
                    <label className={styles.input__label} htmlFor="name">{lang === "en" ? "Name" : "Назва"}</label>
                    <input className={styles.input} type="text" id="name" value={name} onChange={(e) => editPin(e.target.value, link)} maxLength={32}/>
                </div>
                <div className={styles.wrapper}>
                    <label className={styles.input__label} htmlFor="link">{lang === "en" ? "Link" : "Посилання"}</label>
                    <input className={styles.input} type="text" id="link" value={link} onChange={(e) => editPin(name, e.target.value)}/>
                </div>
                <div className={styles.buttons}>
                    <motion.div className={styles.button} whileTap={{scale: 1.05}} onClick={deletePin}>{lang === "en" ? "Delete" : "Видалити"}</motion.div>
                    <motion.div className={styles.button} whileTap={{scale: 1.05}} onClick={() => setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })}>{lang === "en" ? "Save" : "Зберегти"}</motion.div>
                </div>
            </motion.div>}
        </AnimatePresence>,
        document.getElementById("root")!
    )
}