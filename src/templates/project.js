import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

const Project = ({ data: { markdownRemark: project } }) => {
  const {
    title,
    subtitle,
    excerpt,
    body,
    credits,
    featuredImage,
    images,
  } = project.frontmatter;

  return (
    <Layout pageTitle={title}>
      <h1>{title}</h1>
      {subtitle ? <h2>{subtitle}</h2> : ""}
      {excerpt ? <p>{excerpt}</p> : ""}
      {body ? <p>{body}</p> : ""}
      {credits ? <p>{credits}</p> : ""}
      {featuredImage ? <Img fluid={featuredImage.sharp.fluid} /> : ""}
      {images && images.length > 0
        ? images.map(img => <Img fluid={img.sharp.fluid} key={img.id} />)
        : ""}
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        subtitle
        excerpt
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
