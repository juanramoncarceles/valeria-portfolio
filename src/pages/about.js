import React from "react";

import Layout from "../components/layout";

import background from "../images/about-img.jpg";

const About = () => {
  return (
    <Layout pageTitle="about me" fullHeightHeading={{ bgimg: background }}>
      <p>content here</p>
    </Layout>
  );
};

export default About;
