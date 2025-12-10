import type { SelectedObject } from "./Settings"
import styles from "./Settings.module.css"

interface ItemProps {
    text: string
    select: SelectedObject
    selected: SelectedObject
    setSelected: React.Dispatch<React.SetStateAction<SelectedObject>>
    length: number
}

export default function NavItem({ text, select, selected, setSelected, length }:ItemProps){
    let isCloser = false
    let isLeft = false
    let isRight = false
    if(window.innerWidth <= 800){
        isCloser = Math.abs(select.index - selected.index) === 1 || (selected.index === 0 && select.index === length - 1) || (selected.index === length - 1 && select.index === 0)
        isLeft = select.index - selected.index === 1 || (selected.index === length - 1 && select.index === 0)
        isRight = select.index - selected.index === -1 || (selected.index === 0 && select.index === length - 1)
    }
    console.log(text, selected.index, select.index)
    return (
        <div className={`${styles.nav__item} ${selected.index === select.index ? styles.active : ""} ${isCloser ? styles.closer : ""} ${isLeft ? styles.left : isRight ? styles.right : !isLeft && !isRight ? styles.center : ""}`} onClick={() => setSelected({name: select.name, index: select.index})}>{text}</div>
    )
}