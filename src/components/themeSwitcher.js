import React from "react";

import { useTheme } from "../context/ThemeContext";

import themeSwitcherStyles from "./themeSwitcher.module.css";

const ThemeSwitcher = () => {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      className={themeSwitcherStyles.root}
      title="Theme switcher"
      onClick={() => toggleDark()}
    >
      {isDark ? (
        <span>
          <span className="visually-hidden">Light mode</span> ☀
        </span>
      ) : (
        <span>
          <span className="visually-hidden">Dark mode</span> ☾
        </span>
      )}
    </button>
  );
};

export default ThemeSwitcher;
