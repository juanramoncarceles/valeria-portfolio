import React from "react";

import Layout from "../components/layout";
import useProjects from "../hooks/use-projects";
import ProjectPreview from "../components/project-preview";

const Home = () => {
  const projects = useProjects();

  return (
    <Layout pageTitle="portfolio" fullHeightHeader={true}>
      <h3>Hi people</h3>
      <p>Here go the projects</p>
      <div>
        {projects.map((project, i) => (
          <ProjectPreview key={project.id} project={project} position={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
