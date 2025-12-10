import styles from "./App.module.css"
import { useModalsStore } from "./store/useModalStore";

interface WrapperProps {
    children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps){
    const modals = useModalsStore(state => state.modals)
    const setModals = useModalsStore(state => state.setModals)

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