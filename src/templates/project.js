import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

import { createElementIdFromSlug } from "../utils";

import projectStyles from "./project.module.css";

const Project = ({
  data: {
    markdownRemark: { fields, frontmatter },
  },
}) => {
  const { title, subtitle, body, credits, featuredImage, images } = frontmatter;

  return (
    <Layout pageTitle={title} cssClass={projectStyles.pageContainer}>
      <Link
        to={`/#${createElementIdFromSlug(fields.slug)}`}
        className={projectStyles.portfolioLink}
      >
        &larr; back to projects
      </Link>
      {featuredImage ? (
        <div className={projectStyles.featuredImage}>
          <Img fluid={featuredImage.sharp.fluid} />
        </div>
      ) : (
        ""
      )}
      <div className={projectStyles.textContent}>
        <div className={projectStyles.titlesWrapper}>
          <h1 className={projectStyles.mainTitle}>{title}</h1>
          {subtitle ? <h2>{subtitle}</h2> : ""}
        </div>
        {body ? <p className={projectStyles.description}>{body}</p> : ""}
      </div>
      <div className={projectStyles.imagesContainer}>
        {images && images.length > 0
          ? images.map(img => {
              if (!img) {
                console.error(
                  `[Project] An image could not be found while rendering the project page, please check the 'images' paths of the project ${title}.`
                );
                return null;
              }
              return <Img fluid={img.sharp.fluid} key={img.id} />;
            })
          : ""}
      </div>
      {credits ? (
        <small className={projectStyles.credits}>{credits}</small>
      ) : (
        ""
      )}
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        subtitle
        body
        credits
        featuredImage {
          sharp: childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        images {
          id
          sharp: childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default Project;
