import styles from "./SearchFooter.module.css"
import Pin from "./Pin"
import type { PinObject } from "../Settings/Tabs/Pinned"
import { useModalsStore } from "@/store/useModalStore"
import { usePinsStore } from "@/store/usePinsStore"
import { useSelectedNameStore } from "@/store/useSelectedNameStore"

export default function SearchFooter(){
    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)
    const pins = usePinsStore(state => state.pins)
    const setSelectedName = useSelectedNameStore(state => state.setSelectedName)
    
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