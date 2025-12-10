import { useEffect, useState, type ReactNode } from "react";
import { SettingsContext, LanguageContext, ModalsContext, type Modals } from "./contexts";

interface ProviderProps {
  children: ReactNode
}


export function SettingsProvider({ children }:ProviderProps) {
    const [blur, setBlur] = useState(localStorage.getItem("neopage-blur")!)
    const [transparency, setTransparency] = useState(localStorage.getItem("neopage-transparency")!)
    const [radius, setRadius] = useState(localStorage.getItem("neopage-radius")!)

    useEffect(() => {
        document.documentElement.style.setProperty('--blur', `${blur}px`);
    }, [blur])
    
    useEffect(() => {
    document.documentElement.style.setProperty('--alpha', `${+transparency / 100}`);
    }, [transparency])
    
    useEffect(() => {
    document.documentElement.style.setProperty('--radius', `${radius}px`);
    }, [radius])
  
    const value = {
      blur, setBlur,
      transparency, setTransparency,
      radius, setRadius,
    };
  
    return (
      <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
    )
  }

  export function LanguageProvider({ children }:ProviderProps) {
    const [lang, setLang] = useState(localStorage.getItem("neopage-lang")!)

    const value = {
      lang, setLang,
    };
  
    return (
      <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
    )
  }

  export function ModalsProvider({ children }:ProviderProps){
    const [modals, setModals] = useState<Modals>({ isContextOpen: false, isEditOpen: false, isCreateOpen: false, isThemeCreateOpen: false, isThemeEditOpen: false})

    const value = {
      modals, setModals,
    }
    return (
      <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
    )
  }