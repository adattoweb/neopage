import styles from "./Constructor.module.css"

interface BlockProps {
    name: string
    children: React.ReactNode
}

export function NavBlock({ name, children }:BlockProps){
    return (
        <div className={styles.block}>
            <p className={styles.block__name}>{name}</p>
            {children}
        </div>
    )
}

interface InputProps {
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    maxLength: number
}

export function NavInput({ value, onChange, maxLength }:InputProps){
    return (
        <input type="text" className={styles.input} value={value} onChange={onChange} maxLength={maxLength}/>
    )
}

interface RangeProps {
    value: number
    onChange: React.ChangeEventHandler<HTMLInputElement>
    min: number
    max: number
}

export function NavRange({ value, onChange, min, max }:RangeProps){
    return (
        <input type="range" className={styles.slider} min={min} max={max} value={value} onChange={onChange}/>
    )
}