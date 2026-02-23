import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useModalsStore } from "@/store/useModalsStore";
import { usePinsStore } from "@/store/usePinsStore";

import type { PinObject } from "../Settings/Tabs/Pinned";
import { useSelectedNameStore } from "@/store/useSelectedNameStore";
import { Modal } from "./Modal/Modal";
import { Button, ButtonWrapper, Header, Input } from "./Modal/Constructor";

export default function EditModal(){

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    const lang = useLanguageStore(state => state.lang);
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
        setPins(newPins)
        localStorage.setItem("neopage-pins", JSON.stringify(newPins))
    }

    const closeModals = () => setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })

    return (
        <Modal isOpen={modals.isEditOpen}>
            <Header>{selectedName}</Header>
            <Input id="name" name={lang === "en" ? "Name" : "Назва"} value={selectedName} onChange={(e) => editPin(e.target.value, link)}/>
            <Input id="link" name={lang === "en" ? "Link" : "Посилання"} value={link} onChange={(e) => editPin(selectedName, e.target.value)}/>
            <ButtonWrapper>
                <Button onClick={deletePin}>{lang === "en" ? "Delete" : "Видалити"}</Button>
                <Button onClick={closeModals}>{lang === "en" ? "Save" : "Зберегти"}</Button>
            </ButtonWrapper>
        </Modal>
   )
}