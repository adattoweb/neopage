import { useContext } from "react";
import styles from "../Settings.module.css"
import { LanguageContext } from "@/context/contexts";

export default function Information() {

    const langContext = useContext(LanguageContext);
    if (!langContext) throw new Error("Context is null");
    const { lang } = langContext;
    return (
        <div className={`${styles.list} ${styles.information}`} id="list">
            <h3 className={styles.header}>
                {lang === "en" ? "Information" : "Інформація"}
            </h3>

            <h4 className={styles.smallheader}>
                {lang === "en" ? "About Neopage" : "Про Neopage"}
            </h4>
            <p className={styles.text}>
                {lang === "en"
                    ? "Neopage is a home page where you can fully customize the appearance: from the background and theme to background transparency, blur, and corner rounding. You can also easily choose a search engine (Google, Bing, DuckDuckGo, Yahoo!, Qwant)."
                    : "Neopage – це домашня сторінка, де можна повністю налаштувати зовнішній вигляд: від фону та теми до прозорості, розмиття фону й заокруглення країв. Також без проблем можна обрати пошуковий рушій (Google, Bing, DuckDuckGo, Yahoo!, Qwant)."
                }
            </p>

            <h4 className={styles.smallheader}>
                {lang === "en" ? "How to set a custom background" : "Як встановити власне фонове зображення"}
            </h4>
            <p className={styles.text}>
                {lang === "en"
                    ? "To set your own background image, first copy the link to the image (or obtain it by uploading the image to any image hosting service, for example Imgur, and then copying the link). Then open the Custom Themes tab, click the plus icon, paste the link, and click Add. After adding, select the image."
                    : "Щоб встановити власне фонове зображення, спочатку скопіюйте посилання на нього (або отримайте це посилання, завантаживши зображення на будь-який фотохостинг, наприклад Imgur, а потім скопіювавши посилання). Після цього відкрийте вкладку «Кастомні теми», натисніть на плюс, вставте посилання та натисніть «Додати». Після додавання оберіть зображення."
                }
            </p>
        </div>
    )
}