import styles from "./App.module.css"

import HelloBar from "./components/DisplayBar/HelloBar"
import TimeBar from "./components/DisplayBar/TimeBar"
import SearchBar from "./components/SearchBar/SearchBar"
import SearchFooter from "./components/SearchFooter/SearchFooter"
import Settings from "./components/Settings/Settings"

import Modal from "./components/Modals/ContextModal"
import EditModal from "./components/Modals/EditModal"
import CreateModal from "./components/Modals/CreateModal"

import { useState, useEffect, useRef } from "react"
import { readLocal } from "./helpers/readLocal"
import type { PinObject } from "./components/Settings/Tabs/Pinned"
import Quotes from "./components/Quotes/Quotes"
import { LanguageProvider, ModalsProvider, SettingsProvider } from "./context/Providers"
import { initialization } from "./helpers/initialization"
import Wrapper from "./Wrapper"
import ThemeModal from "./components/Modals/ThemeModal"



export interface Pos {
  x: number
  y: number
}

export default function App() {

  initialization()

  useEffect(() => {
    const isDark = localStorage.getItem("neopage-theme") === "dark"
    if(isDark){
      document.getElementById("root")?.classList.add("dark")
    }
    document.documentElement.style.setProperty('--background', `url("${localStorage.getItem("neopage-background")}")`);
  }, [])

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const [selectedName, setSelectedName] = useState("")
  
  const [name, setName] = useState(localStorage.getItem("neopage-name")!)

  const [pins, setPins] = useState<PinObject[]>(readLocal("neopage-pins"))
  const [themes, setThemes] = useState<string[]>(readLocal('neopage-themes'))

  const [display, setDisplay] = useState(localStorage.getItem("neopage-display")!)

  const pos = useRef<Pos>({ x: 0, y: 0 })

  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  

  const isQuoteEnabled = localStorage.getItem("neopage-quote") === "true"


  return (
    <>
      <LanguageProvider>
        <ModalsProvider>
          <EditModal pos={pos} selectedName={selectedName} setSelectedName={setSelectedName} setPins={setPins} />
          <CreateModal setPins={setPins} pos={pos}/>
          <ThemeModal pos={pos} themes={themes} setThemes={setThemes}/>
          <Wrapper>
            {isQuoteEnabled && <Quotes/>}
            <div className={styles.search}>
              {display !== "nothing" ? display === "time" ? <TimeBar /> : <HelloBar name={name}/> : null}
              <SearchBar />
              <SearchFooter pins={pins} setSelectedName={setSelectedName} />
              <Modal pos={pos} setIsSettingsOpen={setIsSettingsOpen}/>
              <SettingsProvider>
                <Settings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} pins={pins} setSelectedName={setSelectedName} display={display} setDisplay={setDisplay} name={name} setName={setName} themes={themes} setThemes={setThemes} />
              </SettingsProvider>
            </div>
          </Wrapper>
        </ModalsProvider>
      </LanguageProvider>
    </>
  )
}
