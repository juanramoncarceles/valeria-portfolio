import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import ThemeContext from "../context/ThemeContext";
import SEO from "./seo";
import Header from "./header";
import Footer from "./footer";

import "../styles/layout.css";
import "../styles/main.css";
import layoutStyles from "./layout.module.css";

const Layout = ({ children, pageTitle, fullHeightHeader }) => {
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
    <ThemeContext.Consumer>
      {theme => (
        <div
          id={layoutStyles.layoutWrapper}
          className={theme.dark ? "dark" : "light"}
        >
          <SEO title={capitalize(pageTitle)} />
          <Header
            siteTitle={data.site.siteMetadata.title}
            pageTitle={pageTitle}
            fullHeightHeader={fullHeightHeader}
          />
          <main
            style={{
              flexGrow: 1,
            }}
          >
            {children}
          </main>
          <Footer />
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
