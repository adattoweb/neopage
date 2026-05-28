import { normalize } from "@/helpers/normalize"
import styles from "./SearchFooter.module.css"
import { getFavicon } from "@/helpers/getFavicon"
import { useShortcutsStore } from "@/store/useShortcutsStore"

interface ItemProps {
    name: string
    link: string
    onRightClick: React.MouseEventHandler<HTMLAnchorElement>
}

export default function Pin({ name, link, onRightClick }: ItemProps) {
    const normalized = normalize(link)
    const faviconSrc = getFavicon(link)

    const shortcuts = useShortcutsStore(state => state.shortcuts)
    return (
        <a href={normalized} className={styles.item} onContextMenu={onRightClick} draggable={false}>
            <p className={`${styles.logo} back-alpha`}>
                {faviconSrc && shortcuts === "icons" ? (
                    <img className={styles.image} src={faviconSrc} alt={name} draggable={false} />
                ) : (
                    name[0]?.toUpperCase()
                )}
            </p>
            <div className={styles.name}>{name}</div>
        </a>
    )
}
