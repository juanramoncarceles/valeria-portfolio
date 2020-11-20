import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

import postStyles from "./post.module.css";

const Post = ({
  data: {
    markdownRemark: { html, frontmatter },
  },
}) => {
  const featuredImgFluid = frontmatter.featuredImage.sharp.fluid;

  return (
    <Layout pageTitle={frontmatter.title} cssClass={postStyles.pageContainer}>
      <div className={postStyles.postWrapper}>
        <h1>{frontmatter.title}</h1>
        <Img fluid={featuredImgFluid} />
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        featuredImage {
          sharp: childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

export default Post;
