import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import ThemeContext from "../context/ThemeContext";
import Header from "./header";
import Footer from "./footer";

import "../styles/layout.css";
import "../styles/main.css";
import layoutStyles from "./layout.module.css";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeContext.Consumer>
      {theme => (
        <div
          id={layoutStyles.layoutWrapper}
          className={theme.dark ? "dark" : "light"}
        >
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <main
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0 1.0875rem 1.45rem`,
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
