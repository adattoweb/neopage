import styles from "./App.module.css"

import DisplayBar from "./components/DisplayBar/DisplayBar"
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
import { initialization } from "./helpers/initialization"
import Wrapper from "./Wrapper"
import ThemeModal from "./components/Modals/ThemeModal"
import { usePosStore } from "./store/usePosStore"

export default function App() {
  initialization()

  const rerender = useRef(0)
  console.log(rerender.current++)

  useEffect(() => {
    const isDark = localStorage.getItem("neopage-theme") === "dark"
    if(isDark){
      document.getElementById("root")?.classList.add("dark")
    }
    document.documentElement.style.setProperty('--background', `url("${localStorage.getItem("neopage-background")}")`);
  }, [])

  const [selectedName, setSelectedName] = useState("")

  const [pins, setPins] = useState<PinObject[]>(readLocal("neopage-pins"))
  const [themes, setThemes] = useState<string[]>(readLocal('neopage-themes'))
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      usePosStore.getState().setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  
  

  const isQuoteEnabled = localStorage.getItem("neopage-quote") === "true"


  return (
    <>
      <EditModal selectedName={selectedName} setSelectedName={setSelectedName} setPins={setPins} />
      <CreateModal setPins={setPins} />
      <ThemeModal themes={themes} setThemes={setThemes} />
      <Wrapper>
        {isQuoteEnabled && <Quotes />}
        <div className={styles.search}>
          <DisplayBar />
          <SearchBar />
          <SearchFooter pins={pins} setSelectedName={setSelectedName} />
          <Modal />
          <Settings pins={pins} setSelectedName={setSelectedName} themes={themes} setThemes={setThemes} />
        </div>
      </Wrapper>
    </>
  )
}
