import React, { createContext, useEffect, useState, useContext } from "react";
import { useStaticQuery, graphql } from "gatsby";

const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  // Query to check if the dark theme should be available.
  const {
    site: {
      siteMetadata: { darkThemeSwitcher },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            darkThemeSwitcher
          }
        }
      }
    `
  );

  const supportsDarkMode = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches === true;

  const toggleDark = () => {
    const toggledIsDark = !isDark;
    localStorage.setItem("isDark", toggledIsDark);
    setIsDark(toggledIsDark);
  };

  useEffect(() => {
    if (darkThemeSwitcher) {
      const isDark = JSON.parse(localStorage.getItem("isDark"));
      if (isDark) {
        setIsDark(isDark);
      } else if (supportsDarkMode()) {
        setIsDark(true);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeContextProvider ");
  }
  return context;
};

export { ThemeContextProvider, useTheme };
