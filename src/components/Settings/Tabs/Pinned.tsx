import Pin from "./Pin"
import Add from "./Add"
import styles from "../Settings.module.css"
import { ModalsContext } from "@/context/contexts"
import { useContext } from "react"

interface PinProps {
    pins: PinObject[]
    setSelectedName: React.Dispatch<React.SetStateAction<string>>
}

export interface PinObject {
    name: string
    link: string
}

export default function Pinned({ pins, setSelectedName }:PinProps){
    const context = useContext(ModalsContext);
    if (!context) throw new Error("Context is null");

    const { modals, setModals } = context;
    function handleRightClick(e: React.MouseEvent<HTMLParagraphElement>, name:string){
        e.preventDefault()
        e.stopPropagation()
        setModals({ isContextOpen: false, isEditOpen: !modals.isEditOpen, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })
        setSelectedName(name)
    }
    return (
        <div className={styles.list} id="list">
            {/* <h3 className={styles.header}>{lang === "en" ? "Pinned tabs" : "Закріпленні вкладки"}</h3> */}
            <div className={styles.pinned}>
                <Add closeModals={() => setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: !modals.isCreateOpen, isThemeCreateOpen: false, isThemeEditOpen: false })}/>
                {pins.map((el:PinObject) => <Pin key={el.name} name={el.name} onClick={(e) => handleRightClick(e, el.name)}/>)}
            </div>
        </div>
    )
}