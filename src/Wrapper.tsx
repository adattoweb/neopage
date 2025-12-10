import { useContext } from "react";
import styles from "./App.module.css"
import { ModalsContext } from "./context/contexts";

interface WrapperProps {
    children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps){
    const context = useContext(ModalsContext);
    if (!context ) throw new Error("Context is null");
    
    const { modals, setModals } = context;

    function handleRightClick(e: React.MouseEvent<HTMLDivElement>){
        e.preventDefault()
        setModals({ isContextOpen: !modals.isContextOpen, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })
    }
    return (
        <div className={styles.wrapper} onContextMenu={handleRightClick} onClick={() => setModals({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false })}>
            {children}
        </div>
    )
}