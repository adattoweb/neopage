import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"
import { useRef } from "react";
import type { PropsWithChildren } from "react";
import { usePosStore } from "@/store/usePosStore";
import { useModal } from "@/hooks/useModal";

import styles from "./Modal.module.css"

interface Props {
    className?: string
    isOpen: boolean
}

export function Modal({ className = styles.modal, isOpen, children }: PropsWithChildren<Props>){
    const modalRef = useRef<HTMLDivElement | null>(null)

    const modal = useModal(modalRef)

    const posStore = usePosStore.getState()
    

    let isLeft = false;
    let isTop = false;
    if(window.innerWidth - posStore.pos.x <= modal.width) isLeft = true
    if(window.innerHeight - posStore.pos.y <= modal.height) isTop = true
    return createPortal(
        <AnimatePresence mode="wait">
            {isOpen && <motion.div key="modal" ref={modalRef} className={`${className} back-alpha`} style={{top: isTop ? posStore.pos.y - modal.height : posStore.pos.y, left: isLeft ? posStore.pos.x - modal.width : posStore.pos.x}} initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}}>
                {children}
            </motion.div>}
        </AnimatePresence>,
        document.getElementById("root")!)
}