import styles from "./Modal.module.css"
import type { PropsWithChildren } from "react"
import { motion } from "framer-motion"

interface WithClassName {
    className?: string
}

export function Header({ className = "", children }:PropsWithChildren<WithClassName>){
    return <h2 className={`${styles.header} ${className}`}>{children}</h2>
}

interface ErrorProps {
    hasError: boolean
    error: string
}

export function Error({ hasError, error }:ErrorProps){
    if(hasError) return <p className={styles.error}>{error}</p>
}

interface InputProps extends WithClassName {
    id: string
    name: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
}

export function Input({ className = "", id, name, value, onChange, children }:PropsWithChildren<InputProps>) {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            <label className={styles.input__label} htmlFor={id}>{name}</label>
            <input className={styles.input} type="text" id={id} value={value} onChange={onChange} maxLength={32} />
            {children}
        </div>
    )
}

interface LinkProps extends WithClassName {
    href?: string
    target?: string
    onClick?: () => void
}

export function Link({ className = "", href, target, children, onClick }:PropsWithChildren<LinkProps>){
    if(href === undefined) return <p className={`${styles.item} ${className}`} onClick={onClick}>{children}</p>
    return <a className={`${styles.item} ${className}`} target={target} href={href} onClick={onClick}>{children}</a>
}

export function ButtonWrapper({ className = "", children }:PropsWithChildren<WithClassName>){
    return <div className={`${styles.buttons} ${className}`}>{children}</div>
}

interface ButtonProps extends WithClassName {
    onClick: () => void
}

export function Button({ className = "", children, onClick }:PropsWithChildren<ButtonProps>){
    return <motion.div className={`${styles.button} ${className}`} whileTap={{scale: 1.05}} onClick={onClick}>{children}</motion.div>
}