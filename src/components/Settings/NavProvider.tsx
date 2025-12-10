import type { SelectedObject } from "./Settings"
import styles from "./Settings.module.css"

import Main from "./Tabs/Main"
import Pinned from "./Tabs/Pinned"
import Themes from "./Tabs/Themes"
import CustomThemes from "./Tabs/CustomThemes"
import Information from "./Tabs/Information"

interface ProviderProps {
    selected: SelectedObject
}

export default function NavProvider({ selected }:ProviderProps){
    return (
        <div className={styles.content} id="nav">
            {selected.name === "global" && <Main/>}
            {selected.name === "pinned" && <Pinned/>}
            {selected.name === "themes_done" && <Themes/>}
            {selected.name === "themes_custom" && <CustomThemes/>}
            {selected.name === "information" && <Information/>}
        </div>
    )
}