import styles from "@/components/SearchFooter/SearchFooter.module.css"

interface ItemProps {
    name: string,
    onClick: React.MouseEventHandler<HTMLParagraphElement>
}

export default function Pin({ name, onClick }:ItemProps){
    return (
        <div className={`${styles.item} ${styles.item__radius}`} onClick={onClick}>
            <p className={`${styles.logo} back-alpha`}>{name[0].toUpperCase()}</p>
            <div className={styles.name}>{name}</div>
        </div>
    )
}