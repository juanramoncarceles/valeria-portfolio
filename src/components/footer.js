import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import footerStyles from "./footer.module.css";

const Footer = () => {
  const {
    site: { siteMetadata: meta },
  } = useStaticQuery(graphql`
    query SiteAuthorQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  return (
    <footer className={footerStyles.root}>
      <p>
        © {new Date().getFullYear()} {meta.author}
      </p>
    </footer>
  );
};

export default Footer;
