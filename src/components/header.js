import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";

import ThemeContext from "../context/ThemeContext";
import headerStyles from "./header.module.css";

const Header = ({ siteTitle, pageTitle, fullHeightHeader }) => (
  <ThemeContext.Consumer>
    {theme => (
      <header
        className={`${headerStyles.root} ${
          fullHeightHeader ? headerStyles.fullHeight : ""
        }`}
      >
        <div className={headerStyles.navContainer}>
          <h1 className={headerStyles.siteTitle}>
            <Link to="/">{siteTitle.toLowerCase()}</Link>
          </h1>
          <nav className={headerStyles.nav}>
            <Link to="/">portfolio</Link>
            <Link to="/about/">about me</Link>
            <Link to="/contact/">contact</Link>
            <Link to="/blog/">blog</Link>
          </nav>
        </div>
        <h2 className={headerStyles.pageTitle}>{pageTitle}</h2>
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
  pageTitle: PropTypes.string,
};

Header.defaultProps = {
  pageTitle: "",
  fullHeightHeader: false,
};

export default Header;
