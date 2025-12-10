import type { SelectedObject } from "./Settings"
import styles from "./Settings.module.css"

import Main from "./Tabs/Main"
import Pinned, { type PinObject } from "./Tabs/Pinned"
import Themes from "./Tabs/Themes"
import CustomThemes from "./Tabs/CustomThemes"
import Information from "./Tabs/Information"

interface ProviderProps {
    selected: SelectedObject
    pins: PinObject[]
    setSelectedName: React.Dispatch<React.SetStateAction<string>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    display: string
    setDisplay: React.Dispatch<React.SetStateAction<string>>
    themes: string[]
    setThemes: React.Dispatch<React.SetStateAction<string[]>>
}

export default function NavProvider({ selected, pins, setSelectedName, display, setDisplay, name, setName, themes, setThemes }:ProviderProps){
    return (
        <div className={styles.content} id="nav">
            {selected.name === "global" && <Main display={display} setDisplay={setDisplay} name={name} setName={setName}/>}
            {selected.name === "pinned" && <Pinned pins={pins} setSelectedName={setSelectedName}/>}
            {selected.name === "themes_done" && <Themes/>}
            {selected.name === "themes_custom" && <CustomThemes themes={themes} setThemes={setThemes}/>}
            {selected.name === "information" && <Information/>}
        </div>
    )
}