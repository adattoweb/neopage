import styles from "./App.module.css"

import DisplayBar from "./components/DisplayBar/DisplayBar"
import SearchBar from "./components/SearchBar/SearchBar"
import SearchFooter from "./components/SearchFooter/SearchFooter"
import Settings from "./components/Settings/Settings"

import Modal from "./components/Modals/ContextModal"
import EditModal from "./components/Modals/EditModal"
import CreateModal from "./components/Modals/CreateModal"

import { useEffect, useRef } from "react"
import Quotes from "./components/Quotes/Quotes"
import { initialization } from "./helpers/initialization"
import Wrapper from "./Wrapper"
import ThemeModal from "./components/Modals/ThemeModal"
import { usePosStore } from "./store/usePosStore"
import { useModalsStore } from "./store/useModalStore"

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
    document.documentElement.style.setProperty('--blur', `${localStorage.getItem("neopage-blur")!}px`);
    document.documentElement.style.setProperty('--alpha', `${+localStorage.getItem("neopage-transparency")! / 100}`);
    document.documentElement.style.setProperty('--radius', `${localStorage.getItem("neopage-radius")!}px`);
  }, [])


  const modals = useModalsStore(state => state.modals)

  useEffect(() => {
    const isAnyModalOpen =
      modals.isContextOpen ||
      modals.isCreateOpen ||
      modals.isEditOpen ||
      modals.isThemeCreateOpen ||
      modals.isThemeEditOpen;
  
    if (isAnyModalOpen) return; // Не вішаємо mousemove, якщо хоч одна модалка відкрита
  
    const handleMove = (e: MouseEvent) => {
      usePosStore.getState().setPos({ x: e.clientX, y: e.clientY });
    };
  
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [modals]);
  
  
  

  const isQuoteEnabled = localStorage.getItem("neopage-quote") === "true"


  return (
    <>
      <EditModal />
      <CreateModal />
      <ThemeModal/>
      <Wrapper>
        {isQuoteEnabled && <Quotes />}
        <div className={styles.search}>
          <DisplayBar />
          <SearchBar />
          <SearchFooter />
          <Modal />
          <Settings/>
        </div>
      </Wrapper>
    </>
  )
}
