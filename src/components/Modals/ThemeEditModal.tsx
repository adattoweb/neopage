import { useEffect, useState } from "react";
import { regex } from "@/helpers/HTTPRegex";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useModalsStore } from "@/store/useModalsStore";
import { useThemesStore } from "@/store/useThemesStore";
import { useCustomStore } from "@/store/useCustomThemeStore";
import { Modal } from "./Modal/Modal";
import { Button, ButtonWrapper, Error, Input } from "./Modal/Constructor";

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

    return (
        <Modal isOpen={modals.isThemeEditOpen}>
            <Input id="link" name={lang === "en" ? "Link" : "Посилання"} value={newLink} onChange={(e) => setNewLink(e.target.value)}>
                <Error hasError={error.ID === 2} error={error.text}/>
            </Input>
            <ButtonWrapper>
                <Button onClick={remove}>{lang === "en" ? "Delete" : "Видалити"}</Button>
                <Button onClick={editPin}>{lang === "en" ? "Save" : "Зберегти"}</Button>
            </ButtonWrapper>
        </Modal>
    )
}