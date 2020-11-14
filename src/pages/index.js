import React from "react";

import Layout from "../components/layout";
import ProjectPreview from "../components/project-preview";
import useProjects from "../hooks/use-projects";
import { createElementIdFromSlug } from "../utils";

import background from "../images/landing-img.jpg";

const Home = () => {
  const projects = useProjects();

  return (
    <Layout pageTitle="portfolio" fullHeightHeading={{ bgimg: background }}>
      {projects.map((project, i) => (
        <ProjectPreview
          key={project.id}
          project={project}
          position={i}
          id={createElementIdFromSlug(project.slug)}
        />
      ))}
    </Layout>
  );
};

export default Home;
