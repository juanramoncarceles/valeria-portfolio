import React from "react";

import footerStyles from "./footer.module.css";

const Footer = () => (
  <footer className={footerStyles.root}>
    <p>© {new Date().getFullYear()}, Built by Valeria Lovato</p>
  </footer>
);

export default Footer;
