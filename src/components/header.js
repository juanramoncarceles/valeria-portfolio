import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import ThemeContext from "../context/ThemeContext";
import headerStyles from "./header.module.css";

const Header = ({ siteTitle }) => (
  <ThemeContext.Consumer>
    {theme => (
      <header className={headerStyles.root}>
        <div className={headerStyles.navContainer}>
          <Link to="/" className={headerStyles.siteTitle}>
            {siteTitle.toLowerCase()}
          </Link>
          <nav className={headerStyles.nav}>
            <Link to="/">portfolio</Link>
            <Link to="/about/">about me</Link>
            <Link to="/contact/">contact</Link>
            <Link to="/blog/">blog</Link>
          </nav>
        </div>
        {false ? (
          <button className="dark-switcher" onClick={theme.toggleDark}>
            {theme.dark ? <span>Light mode ☀</span> : <span>Dark mode ☾</span>}
          </button>
        ) : (
          ""
        )}
      </header>
    )}
  </ThemeContext.Consumer>
);

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
};

export default Header;
