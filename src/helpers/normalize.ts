export function normalize(url: string): string {
    if (!url.startsWith("http")) {
        return "https://" + url
    }

    return url
}
