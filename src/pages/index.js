import React from "react";

import Layout from "../components/layout";
import useProjects from "../hooks/use-projects";
import PageHeading from "../components/page-heading";
import ProjectPreview from "../components/project-preview";

import background from "../images/landing-img.jpg";

const Home = () => {
  const projects = useProjects();

  return (
    <Layout pageTitle="portfolio">
      <PageHeading
        pageTitle="portfolio"
        fullHeightHeading={true}
        bgimg={background}
      />
      {projects.map((project, i) => (
        <ProjectPreview key={project.id} project={project} position={i} />
      ))}
    </Layout>
  );
};

export default Home;
