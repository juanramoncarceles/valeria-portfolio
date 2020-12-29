import React from "react";
import PropTypes from "prop-types";
import { useIntl, Link } from "gatsby-plugin-intl";
import { useStaticQuery, graphql } from "gatsby";

import headerStyles from "./header.module.css";

import Language from "./language";
import ThemeSwitcher from "./themeSwitcher";

const Header = ({ siteTitle, above }) => {
  const intl = useIntl();

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
        <div className={headerStyles.nav}>
          <nav className={headerStyles.navLinksWrapper}>
            <Link to="/">portfolio</Link>
            <Link to="/about/">
              {intl.formatMessage({ id: "about.title" })}
            </Link>
            <Link to="/contact/">{intl.formatMessage({ id: "contact" })}</Link>
            <Link to="/blog/">blog</Link>
          </nav>
          <div className={headerStyles.otherControls}>
            <Language />
            {darkThemeSwitcher ? <ThemeSwitcher /> : null}
          </div>
        </div>
      </div>
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
