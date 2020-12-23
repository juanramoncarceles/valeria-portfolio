import React from "react";
import PropTypes from "prop-types";
import { useIntl, Link } from "gatsby-plugin-intl";
import { useStaticQuery, graphql } from "gatsby";

import { useTheme } from "../context/ThemeContext";
import headerStyles from "./header.module.css";

import Language from "./language";

const Header = ({ siteTitle, above }) => {
  const intl = useIntl();
  const { isDark, toggleDark } = useTheme();

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

  return (
    <header
      className={`${headerStyles.root} ${
        above ? headerStyles.above : headerStyles.default
      }`}
    >
      <div className={headerStyles.navContainer}>
        <Link to="/" className={headerStyles.siteTitle}>
          {siteTitle.toLowerCase()}
        </Link>
        <nav className={headerStyles.nav}>
          <Link to="/">portfolio</Link>
          <Link to="/about/">{intl.formatMessage({ id: "about.title" })}</Link>
          <Link to="/contact/">{intl.formatMessage({ id: "contact" })}</Link>
          <Link to="/blog/">blog</Link>
          <Language />
        </nav>
      </div>
      {darkThemeSwitcher ? (
        <button className="dark-switcher" onClick={() => toggleDark()}>
          {isDark ? <span>Dark mode ☾</span> : <span>Light mode ☀</span>}
        </button>
      ) : (
        ""
      )}
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  above: PropTypes.bool,
};

Header.defaultProps = {
  above: false,
};

export default Header;
