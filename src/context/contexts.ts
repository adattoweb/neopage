import { createContext } from "react";

interface SettingsContextType {
    blur: string
    setBlur: React.Dispatch<React.SetStateAction<string>>
    transparency: string
    setTransparency: React.Dispatch<React.SetStateAction<string>>
    radius: string
    setRadius: React.Dispatch<React.SetStateAction<string>>
};
export const SettingsContext = createContext<SettingsContextType | null>(null)

interface LanguageContextType {
    lang: string
    setLang: React.Dispatch<React.SetStateAction<string>>
};
export const LanguageContext = createContext<LanguageContextType | null>(null)

export interface Modals {
  isContextOpen: boolean
  isEditOpen: boolean
  isCreateOpen: boolean
  isThemeCreateOpen: boolean
  isThemeEditOpen: boolean
}

interface ModalsContextType {
    modals: Modals
    setModals: React.Dispatch<React.SetStateAction<Modals>>
}

export const ModalsContext = createContext<ModalsContextType | null>(null)