type DefaultsMap = {
    [key: string]: string
  }

export function initialization(){
    
    const defaults: DefaultsMap = {
        "neopage-lang": "en",
        "neopage-theme": "light",
        "neopage-quote": "false",
        "neopage-name": "user",
        "neopage-blur": "60",
        "neopage-transparency" : "5",
        "neopage-radius": "24",
        "neopage-search-engine": "google",
        "neopage-display": "greetings",
        "neopage-background": `/neopage/themes/themes/theme1.jpg`,
        "neopage-themes": "[]",
      } 
    
      for (const key in defaults) {
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, defaults[key])
        }
      }
}