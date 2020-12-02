import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

import blogStyles from "./blog.module.css";

const Blog = ({ data: { allMarkdownRemark: posts } }) => {
  const lastPost = posts.nodes[0];

  return (
    <Layout pageTitle="blog" cssClass={blogStyles.pageContainer}>
      <h1>Blog</h1>
      <p>Lorem ipsum...</p>

      <section className={blogStyles.postFeatured}>
        <Link to={`/blog${lastPost.fields.slug}`}>
          <Img
            fluid={lastPost.frontmatter.featuredImage.sharp.fluid}
            className={blogStyles.postImage}
            alt=""
          />
        </Link>
        <time className={blogStyles.postDate} dateTime="2001-05-15">
          {lastPost.frontmatter.date}
        </time>
        <Link to={`/blog${lastPost.fields.slug}`}>
          <h2 className={blogStyles.postTitle}>{lastPost.frontmatter.title}</h2>
        </Link>
        <p className={blogStyles.postExcerpt}>{posts.nodes[0].excerpt}</p>
        <Link to="/" className={blogStyles.postCategory}>
          Category
        </Link>
      </section>

      <section className={blogStyles.postsList}>
        {posts.nodes.map((node, i) => {
          if (i > 0)
            return (
              <article key={node.id}>
                <Link to={`/blog${node.fields.slug}`}>
                  <Img
                    fluid={node.frontmatter.featuredImage.sharp.fluid}
                    className={""}
                    alt=""
                  />
                </Link>
                <time dateTime="">{node.frontmatter.date}</time>
                <Link to={`/blog${node.fields.slug}`}>
                  <h2>{node.frontmatter.title}</h2>
                </Link>
                <p>{node.excerpt}</p>
                <Link to="/">Category</Link>
              </article>
            );
        })}
      </section>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "post" } } }
    ) {
      totalCount
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          featuredImage {
            sharp: childImageSharp {
              fluid(maxWidth: 360) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
`;

export default Blog;
