import { useRef } from "react"
import styles from "./SearchBar.module.css"

export default function SearchBar(){
    const searchRef = useRef<HTMLInputElement | null>(null)

    function startSearch(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        const engine = localStorage.getItem("neopage-search-engine")!
        const searchEngines: { [key: string]: string } = {
            google: "https://www.google.com/search?q=",
            bing: "https://www.bing.com/search?q=",
            yahoo: "https://search.yahoo.com/search?p=",
            duckduckgo: "https://duckduckgo.com/?q=",
            qwant: "https://www.qwant.com/?q="
        };
        const url = searchEngines[engine] + encodeURIComponent(searchRef.current?.value ?? "")
        window.open(url, "_self")
    }

    return (
        <form onSubmit={startSearch}>
            <input autoFocus className={`${styles.field} back-alpha`} type="text" ref={searchRef}/>
        </form>
    )
}