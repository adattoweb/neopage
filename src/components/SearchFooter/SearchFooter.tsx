import styles from "./SearchFooter.module.css"
import Pin from "./Pin"
import type { PinObject } from "../Settings/Tabs/Pinned"
import { ModalsContext } from "@/context/contexts"
import { useContext } from "react"

interface FooterProps {
    pins: PinObject[]
    setSelectedName: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchFooter({ pins, setSelectedName }:FooterProps){
    const context = useContext(ModalsContext);
    if (!context) throw new Error("Context is null");

    const { modals, setModals } = context;
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