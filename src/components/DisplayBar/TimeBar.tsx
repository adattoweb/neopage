import { useState, useEffect } from "react";
import styles from "./DisplayBar.module.css";

export default function HelloBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={styles.time}>
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </h1>
  );
}
