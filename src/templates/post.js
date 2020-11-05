import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

const Post = ({ data: { markdownRemark: post }}) => {

  const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid;

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <Img fluid={featuredImgFluid} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
    }
  }
`;

export default Post;
