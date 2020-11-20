import React from "react";

import Layout from "../components/layout";

import contactStyles from "./contact.module.css";

const Contact = () => {
  return (
    <Layout pageTitle="contact" cssClass={contactStyles.pageContainer}>
      <h1 className={contactStyles.mainTitle}>contact</h1>
      <address className={contactStyles.address}>
        <p>08014 Barcelona</p>
        <p>+34 622 888 349</p>
        <p>valerialovato90@gmail.com</p>
        <a
          href="https://www.linkedin.com/in/valeria-lovato-98885080/"
          target="_blank"
          rel="noreferrer"
          title="Valeria Lovato's LinkedIn profile. Opens in a new browser tab."
        >
          LinkedIn
        </a>
      </address>
    </Layout>
  );
};

export default Contact;
