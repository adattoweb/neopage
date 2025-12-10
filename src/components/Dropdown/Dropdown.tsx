import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import styles from "./Dropdown.module.css"

interface SelectProps {
    select: string
    value: string
    setSelected: (value: string) => void
}

function Select({ select, value, setSelected }:SelectProps){
    return (
        <div className={styles.select} onClick={() => setSelected(value)}>{select}</div>
    )
}

interface DropdownPorps {
    selected: string
    setSelected: (value: string) => void
    array: string[][]
    minWidth?: number
}

export default function Dropdown({ selected, setSelected, array, minWidth }:DropdownPorps){
    if(!minWidth) minWidth = 40
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={styles.dropdown} onClick={() => setIsOpen(prev => !prev)}>
            <motion.div whileTap={{scale: 0.95}} whileHover={{scale: 1.05}} className={styles.button} style={{minWidth: minWidth}}><p>{array.find(el => el[1] === selected)![0]}</p></motion.div>
            <AnimatePresence mode="wait">
                {isOpen && <motion.div className={styles.content} initial={{scale: 0.8, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0.8, opacity: 0}}> 
                    {array.map((el:string[], index:number) => <Select key={index} select={el[0]} value={el[1]} setSelected={setSelected}/>)}
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}