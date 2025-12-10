import styles from "../Settings.module.css"

interface AddProps {
    closeModals: () => void
}

export default function Add({ closeModals }:AddProps){
    function switchOpen(e: React.MouseEvent<HTMLDivElement>){
        e.stopPropagation()
        closeModals()

    }
    return (
        <div className={`${styles.add} back-alpha`} onClick={switchOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
    )
}
