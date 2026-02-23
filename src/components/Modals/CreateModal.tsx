import { useState } from "react";
import type { PinObject } from "../Settings/Tabs/Pinned";
import { regex } from "@/helpers/HTTPRegex";
import { useModalsStore } from "@/store/useModalsStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { usePinsStore } from "@/store/usePinsStore";
import { Modal } from "./Modal/Modal";
import { Button, ButtonWrapper, Error, Input } from "./Modal/Constructor";

interface Error {
    text: string
    ID: number
}

export default function CreateModal(){
    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [error, setError] = useState<Error>({text: "", ID: 0})

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    const lang = useLanguageStore(state => state.lang);

    const pins = usePinsStore(state => state.pins)
    const setPins = usePinsStore(state => state.setPins)


    function disableError(){
        if(error.text !== ""){
            setTimeout(() => {
                setError({text: "", ID: 0})
            }, 6000)
        }
    }

    function addPin(){
        const pinsArray = [...pins]

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

    return (
        <Modal isOpen={modals.isCreateOpen}>
            <Input id="name" name={lang === "en" ? "Name" : "Назва"} value={name} onChange={(e) => setName(e.target.value)}>
                <Error hasError={error.ID === 1} error={error.text}/>
            </Input>
            <Input id="link" name={lang === "en" ? "Link" : "Посилання"} value={link} onChange={(e) => setLink(e.target.value)}>
                <Error hasError={error.ID === 2} error={error.text}/>
            </Input>
            <ButtonWrapper>
                <Button onClick={addPin}>{lang === "en" ? "Add" : "Додати"}</Button>
            </ButtonWrapper>
        </Modal>
    )
}