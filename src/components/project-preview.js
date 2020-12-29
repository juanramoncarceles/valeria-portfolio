import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";

import { useTheme } from "../context/ThemeContext";

import projPreviewStyle from "./project-preview.module.css";

const ProjectPreview = ({ project, position, id }) => {
  const { isDark } = useTheme();

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
      className={`${isDark ? projPreviewStyle.dark : ""}
      ${projPreviewStyle.root} ${position % 2 === 1 ? projPreviewStyle.odd : ""}
    `}
      id={id}
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
  id: PropTypes.string,
};

ProjectPreview.defaultProps = {
  position: 0,
  id: "",
};

export default ProjectPreview;
