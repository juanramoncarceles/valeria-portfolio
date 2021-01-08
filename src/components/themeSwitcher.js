import React from "react";
import PropTypes from "prop-types";

import { useTheme } from "../context/ThemeContext";

import themeSwitcherStyles from "./themeSwitcher.module.css";

const ThemeSwitcher = ({ alwaysDark }) => {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      className={`${themeSwitcherStyles.root} ${
        alwaysDark ? themeSwitcherStyles.dark : ""
      }`}
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

ThemeSwitcher.propTypes = {
  alwaysDark: PropTypes.bool,
};

ThemeSwitcher.defaultProps = {
  alwaysDark: false,
};

export default ThemeSwitcher;
