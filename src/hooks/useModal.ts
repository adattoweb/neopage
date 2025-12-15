import { useModalsStore } from "@/store/useModalsStore"
import { useState, useLayoutEffect } from "react"

export function useModal(modalRef: React.RefObject<HTMLDivElement | null>){
    const modals = useModalsStore(state => state.modals)
    const [modal, setModal] = useState({ width: 230, height: 100 })
    
    useLayoutEffect(() => {
        const el = modalRef.current
        if (!el) return
      
        const observer = new ResizeObserver(([entry]) => {
          const { width, height } = entry.contentRect
          setModal({ width, height })
        })
      
        observer.observe(el)
      
        return () => observer.disconnect()
      }, [modals])      
      return modal
}