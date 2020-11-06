import React from "react";

import Layout from "../components/layout";

const Contact = () => {
  return (
    <Layout pageTitle="contact">
      <h1>contact</h1>
      <address>
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
