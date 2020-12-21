import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

import blogStyles from "./blog.module.css";

const Blog = ({ data: { allMarkdownRemark: posts } }) => {
  const lastPost = posts.nodes[0];

  return (
    <Layout pageTitle="blog" cssClass={blogStyles.pageContainer}>
      <h1 className={blogStyles.pageTitle}>blog</h1>
      <p className={blogStyles.blogIntro}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies
        augue eget purus euismod pulvinar. Vivamus dui ante, finibus non porta
        ut, feugiat sed ante. Sed turpis sapien, cursus ut venenatis id, finibus
        non ante. Maecenas volutpat gravida tortor, eu consequat neque ultricies
        sit amet. Integer et semper dui. Vestibulum ut ultrices nunc. Duis
        vulputate lorem eu felis vestibulum, at luctus odio pulvinar. Proin
        rutrum finibus imperdiet. Nullam in porta neque. Pellentesque consequat
        tempor vehicula.
      </p>

      <section
        className={`${blogStyles.postWrapper} ${blogStyles.postFeatured}`}
      >
        <Link
          to={`/blog${lastPost.fields.slug}`}
          className={blogStyles.postImage}
        >
          <Img
            fluid={{
              ...lastPost.frontmatter.featuredImage.sharp.fluid,
              aspectRatio: 2 / 1.25,
            }}
            alt=""
          />
        </Link>
        <time className={blogStyles.postDate} dateTime="2001-05-15">
          {lastPost.frontmatter.date}
        </time>
        <Link
          to={`/blog${lastPost.fields.slug}`}
          className={blogStyles.postTitle}
        >
          <h2>{lastPost.frontmatter.title}</h2>
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
              <article
                key={node.id}
                className={`${blogStyles.postWrapper} ${blogStyles.postListItem}`}
              >
                <Link
                  to={`/blog${node.fields.slug}`}
                  className={blogStyles.postImage}
                >
                  <Img
                    fluid={{
                      ...node.frontmatter.featuredImage.sharp.fluid,
                      aspectRatio: 2 / 1.25,
                    }}
                    alt=""
                  />
                </Link>
                <time className={blogStyles.postDate} dateTime="">
                  {node.frontmatter.date}
                </time>
                <Link
                  to={`/blog${node.fields.slug}`}
                  className={blogStyles.postTitle}
                >
                  <h2>{node.frontmatter.title}</h2>
                </Link>
                <p className={blogStyles.postExcerpt}>{node.excerpt}</p>
                <Link to="/" className={blogStyles.postCategory}>
                  Category
                </Link>
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
              fluid(maxWidth: 900) {
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
