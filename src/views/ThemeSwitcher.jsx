import { useState, useEffect } from "react";
// custom styles
import styles from "./themeswitcher.module.css";

//custom hook
import useLocalStorage from "../hooks/useLocalStorage";

//icons
import {
  XMarkIcon,
  SunIcon,
  MoonIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

const ThemeSwitcher = () => {
  const [hue, setHue] = useLocalStorage("react-todo.color", "240");
  const [isColorPicking, setIsColorPicking] = useState(false);

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "react-todo.theme",
    defaultDark ? "dark" : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--_hue", hue);
  }, [hue]);

  return (
    <aside
      className={styles.wrapper}
      style={{
        backgroundColor: isColorPicking
          ? "hsl(var(--muted) / .6)"
          : "transparent",
      }}
    >
      {isColorPicking ? (
        <>
          <button
            className={`btn ${styles.close}`}
            onClick={() => setIsColorPicking(false)}
          >
            <XMarkIcon />
          </button>
          <input
            type="range"
            className={styles.picker}
            min="0"
            max="360"
            value={hue}
            onInput={(e) => setHue(e.target.value)}
          />
        </>
      ) : (
        <div className={styles.btns}>
          <button
            className="btn"
            aria-label={`switch theme to ${
              theme === "light" ? "light" : "dark"
            } mode`}
            role="switch"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button className="btn" onClick={() => setIsColorPicking(true)}>
            <SwatchIcon />
          </button>
        </div>
      )}
    </aside>
  );
};

export default ThemeSwitcher;
