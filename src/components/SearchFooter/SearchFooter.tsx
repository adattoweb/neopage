import styles from "./SearchFooter.module.css"
import Pin from "./Pin"
import type { PinObject } from "../Settings/Tabs/Pinned"
import { useModalsStore } from "@/store/useModalStore"

interface FooterProps {
    pins: PinObject[]
    setSelectedName: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchFooter({ pins, setSelectedName }:FooterProps){
    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    function handleRightClick(e: React.MouseEvent<HTMLAnchorElement>, name:string){
        e.preventDefault()
        e.stopPropagation()
        setSelectedName(name)
        setModals({ isContextOpen: false, isEditOpen: !modals.isEditOpen, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })
    }
    return (
        <div className={styles.footer}>
            {pins.map((el:PinObject) => <Pin key={el.name} name={el.name} link={el.link} onRightClick={(e) => handleRightClick(e, el.name)}/>)}
        </div>
    )
}