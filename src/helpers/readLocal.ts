export function readLocal(key:string){
    const value = localStorage.getItem(key)
    if(value === null) return []
    let array = []
    try {
        array = JSON.parse(value) || []
    } catch {
        array = []
    }
    return array
}