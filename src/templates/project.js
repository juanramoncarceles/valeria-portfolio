import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

const Project = ({ data: { markdownRemark: project }}) => {

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
    <Layout>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{excerpt}</p>
      <p>{body}</p>
      <p>{credits ?? ""}</p>
      <Img fluid={featuredImage.childImageSharp.fluid} />
      {images && images.length > 0 ? images.map(img => (
        <Img fluid={img.childImageSharp.fluid} key={img.id} />
      )) : ""}
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
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        images {
          id
          childImageSharp {
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



/*
html
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
*/