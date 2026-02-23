interface NavItemObject {
    text: string
    select: string
}

export const navArray: (lang: string) => NavItemObject[] = (lang) => [
    {
        text: lang === "en" ? "General" : "Загальне",
        select: "global"
    },
    {
        text: lang === "en" ? "Preset themes" : "Готові теми",
        select: "themes_done"
    },
    {
        text: lang === "en" ? "Custom themes" : "Власні теми",
        select: "themes_custom"
    },
    {
        text: lang === "en" ? "Pinned tabs" : "Закріпленні вкладки",
        select: "pinned"
    },
    {
        text: lang === "en" ? "Information" : "Інформація",
        select: "information"
    },
]