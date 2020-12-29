import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import { useTheme } from "../context/ThemeContext";
import SEO from "./seo";
import Header from "./header";
import Footer from "./footer";
import FullHeightHeading from "./full-height-heading";

import "../styles/main.css";
import layoutStyles from "./layout.module.css";

const Layout = ({ children, pageTitle, fullHeightHeading, cssClass }) => {
  const { isDark } = useTheme();

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const capitalize = str => {
    const strTrimmed = str.trim();
    return strTrimmed[0].toUpperCase() + strTrimmed.slice(1);
  };

  return (
    <div
      className={`${layoutStyles.layoutWrapper} ${
        isDark ? layoutStyles.dark : ""
      }`}
    >
      <SEO title={capitalize(pageTitle)} />
      <Header
        siteTitle={data.site.siteMetadata.title}
        above={!!fullHeightHeading}
      />
      <main
        style={{
          flexGrow: 1,
        }}
        className={cssClass}
      >
        {fullHeightHeading ? (
          <FullHeightHeading
            pageTitle={pageTitle}
            bgimg={fullHeightHeading.bgimg}
          />
        ) : (
          ""
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
  fullHeightHeading: PropTypes.object,
  cssClass: PropTypes.string,
};

Layout.defaultProps = {
  fullHeightHeading: undefined,
  cssClass: "",
};

export default Layout;
