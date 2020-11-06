import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const Contact = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <h1>contact</h1>
      <address>
        <p>08014 Barcelona</p>
        <p>+34 622 888 349</p>
        <p>valerialovato90@gmail.com</p>
        <a href="#">LinkedIn</a>
      </address>
    </Layout>
  );
};

export default Contact;
