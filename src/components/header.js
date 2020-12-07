import React from "react";
import PropTypes from "prop-types";
import { useIntl, Link } from "gatsby-plugin-intl";

import ThemeContext from "../context/ThemeContext";
import headerStyles from "./header.module.css";

import Language from "./language";

const Header = ({ siteTitle, above }) => {
  const intl = useIntl();

  return (
    <ThemeContext.Consumer>
      {theme => (
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
              <Link to="/about/">
                {intl.formatMessage({ id: "about.title" })}
              </Link>
              <Link to="/contact/">
                {intl.formatMessage({ id: "contact" })}
              </Link>
              <Link to="/blog/">blog</Link>
              <Language />
            </nav>
          </div>
          {false ? (
            <button className="dark-switcher" onClick={theme.toggleDark}>
              {theme.dark ? (
                <span>Light mode ☀</span>
              ) : (
                <span>Dark mode ☾</span>
              )}
            </button>
          ) : (
            ""
          )}
        </header>
      )}
    </ThemeContext.Consumer>
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
