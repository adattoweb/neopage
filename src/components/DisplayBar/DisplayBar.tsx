import TimeBar from "./TimeBar"
import HelloBar from "./HelloBar"
import { useDisplayStore } from "@/store/useDisplayStore"

export default function DisplayBar() {
    const display = useDisplayStore(state => state.display)
    return display === "time" ? <TimeBar /> : display === "greetings" ? <HelloBar /> : null
}
