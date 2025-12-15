export function getLocal(key: string, initial: string){
    const value = localStorage.getItem(key)
    if(value === null) return initial
    return value
}