import TimeBar from "./TimeBar"
import HelloBar from "./HelloBar"
import { useDisplayState } from "@/store/useDisplayStore"

export default function DisplayBar(){
    const display = useDisplayState(state => state.display)
    return display === "time" ? <TimeBar/> : display === "greetings" ? <HelloBar/> : null
}