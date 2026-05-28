import { normalize } from "./normalize"

export function getFavicon(url: string): string | false {
    try {
        const hostname = new URL(normalize(url)).hostname

        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`
    } catch {
        return false
    }
}
