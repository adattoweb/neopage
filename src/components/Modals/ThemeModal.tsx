import { useState } from "react"
import { regex } from "@/helpers/HTTPRegex"
import { useLanguageStore } from "@/store/useLanguageStore"
import { useModalsStore } from "@/store/useModalsStore"
import { useThemesStore } from "@/store/useThemesStore"
import { Modal } from "./Modal/Modal"
import { Button, ButtonWrapper, Error, Input } from "./Modal/Constructor"

interface Error {
    text: string
    ID: number
}

export default function ThemeModal() {
    const [link, setLink] = useState("")
    const [error, setError] = useState<Error>({ text: "", ID: 0 })

    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    const lang = useLanguageStore(state => state.lang)
    const themes = useThemesStore(state => state.themes)
    const setThemes = useThemesStore(state => state.setThemes)

    function disableError() {
        if (error.text !== "") {
            setTimeout(() => {
                setError({ text: "", ID: 0 })
            }, 6000)
        }
    }

    function addPin() {
        if (!regex.test(link)) {
            setError({ text: lang === "en" ? "Invalid link format" : "Неправильний формат посилання", ID: 2 })
            disableError()
            return
        }
        if (themes.includes(link)) {
            setError({ text: lang === "en" ? "This image already exist" : "Таке зображення вже існує", ID: 2 })
            disableError()
            return
        }

        const newThemes = [...themes, link]
        console.log(newThemes)
        localStorage.setItem("neopage-themes", JSON.stringify(newThemes))
        setThemes(newThemes)

        setLink("")
        setModals({
            isContextOpen: false,
            isEditOpen: false,
            isCreateOpen: false,
            isThemeCreateOpen: false,
            isThemeEditOpen: false,
        })
        setError({ text: "", ID: 0 })
    }

    return (
        <Modal isOpen={modals.isThemeCreateOpen}>
            <Input
                id="link"
                name={lang === "en" ? "Link" : "Посилання"}
                value={link}
                onChange={e => setLink(e.target.value)}
                maxLength={Infinity}
            >
                <Error hasError={error.ID === 2} error={error.text} />
            </Input>
            <ButtonWrapper>
                <Button onClick={addPin}>{lang === "en" ? "Add" : "Додати"}</Button>
            </ButtonWrapper>
        </Modal>
    )
}
