import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

import projPreviewStyle from "./project-preview.module.css";

const ProjectPreview = ({ project, position }) => {
  let subtitle;
  let excerpt;

  const logMissingData = (title, missing) =>
    console.log(`[ProjectPreview] Project ${title} is missing the ${missing}.`);

  if (project.subtitle) subtitle = project.subtitle;
  else logMissingData(project.title, "subtitle");

  if (project.excerpt) excerpt = project.excerpt;
  else logMissingData(project.title, "excerpt");

  return (
    <article
      className={`
      ${projPreviewStyle.root} ${position % 2 === 0 ? projPreviewStyle.odd : ""}
    `}
    >
      {project.featuredImage ? (
        <Img
          className={projPreviewStyle.img}
          fluid={project.featuredImage.sharp.fluid}
        />
      ) : (
        ""
      )}
      <div className={projPreviewStyle.dataContainer}>
        <h3>{project.title}</h3>
        {subtitle ? <h4>{subtitle}</h4> : ""}
        {excerpt ? <p>{project.excerpt}</p> : ""}
        <Link to={`/project${project.slug}`}>more...</Link>
      </div>
    </article>
  );
};

ProjectPreview.propTypes = {
  project: PropTypes.object.isRequired,
  position: PropTypes.number,
};

ProjectPreview.defaultProps = {
  position: 0,
};

export default ProjectPreview;
