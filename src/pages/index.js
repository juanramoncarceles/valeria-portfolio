import React from "react";

import Layout from "../components/layout";
import useProjects from "../hooks/use-projects";
import ProjectPreview from "../components/project-preview";

const Home = () => {
  const projects = useProjects();

  return (
    <Layout pageTitle="portfolio" fullHeightHeader={true}>
      {projects.map((project, i) => (
        <ProjectPreview key={project.id} project={project} position={i} />
      ))}
    </Layout>
  );
};

export default Home;
