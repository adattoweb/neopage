import styles from "./SearchFooter.module.css"

interface ItemProps {
    name: string,
    link: string,
    onRightClick: React.MouseEventHandler<HTMLAnchorElement>
}

export default function Pin({ name, link, onRightClick }:ItemProps){
    function normalize(url: string):string{
        if(!url.startsWith("http")) {
          return "https://" + url;
        }
        return url;
      }
    return (
        <a href={normalize(link)} className={styles.item} onContextMenu={onRightClick} draggable={false}>
            <p className={`${styles.logo} back-alpha`}>{name[0]?.toUpperCase()}</p>
            <div className={styles.name}>{name}</div>
        </a>
    )
}