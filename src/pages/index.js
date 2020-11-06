import React from "react";

import Layout from "../components/layout";
import Image from "../components/image";

const Home = () => (
  <Layout pageTitle="portfolio" fullHeightHeader={true}>
    <h3>Hi people</h3>
    <p>Here go the projects</p>
    <div>
      <Image />
    </div>
  </Layout>
);

export default Home;
