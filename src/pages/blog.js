import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import { Link as LinkIntl } from "gatsby-plugin-intl";

import Layout from "../components/layout";

import blogStyles from "./blog.module.css";

const Blog = ({ data: { allMarkdownRemark: posts } }) => {
  const lastPost = posts.nodes[0];

  /*
  IMPORTANT
  Currently only posts in italian are displayed for all langs, if this changes
  remove from below the /it part of the string and replace the Link elements from
  gatsby for the LinkIntl from gatsby-plugin-intl
  */
  const basePostPath = "/it/blog";

  return (
    <Layout pageTitle="blog" cssClass={blogStyles.pageContainer}>
      <section className={blogStyles.headerSection}>
        <h1 className={blogStyles.pageTitle}>blog</h1>
        <p className={blogStyles.blogIntro}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies
          augue eget purus euismod pulvinar. Vivamus dui ante, finibus non porta
          ut, feugiat sed ante. Sed turpis sapien, cursus ut venenatis id,
          finibus non ante. Maecenas volutpat gravida tortor, eu consequat neque
          ultricies sit amet. Integer et semper dui. Vestibulum ut ultrices
          nunc. Duis vulputate lorem eu felis vestibulum, at luctus odio
          pulvinar. Proin rutrum finibus imperdiet. Nullam in porta neque.
          Pellentesque consequat tempor vehicula.
        </p>
      </section>

      {lastPost ? (
        <>
          <section
            className={`${blogStyles.postWrapper} ${blogStyles.postFeatured}`}
          >
            <Link
              to={`${basePostPath}${lastPost.fields.slug}`}
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
            <time dateTime="">{lastPost.frontmatter.date}</time>
            <Link
              to={`${basePostPath}${lastPost.fields.slug}`}
              className={blogStyles.postTitle}
            >
              <h2>{lastPost.frontmatter.title}</h2>
            </Link>
            <p className={blogStyles.postExcerpt}>{posts.nodes[0].excerpt}</p>
            <LinkIntl to="/" className={blogStyles.postCategory}>
              Category
            </LinkIntl>
          </section>

          {posts.nodes.length > 1 ? (
            <section className={blogStyles.postsList}>
              {posts.nodes.map((node, i) => {
                if (i > 0)
                  return (
                    <article
                      key={node.id}
                      className={`${blogStyles.postWrapper} ${blogStyles.postListItem}`}
                    >
                      <Link
                        to={`${basePostPath}${node.fields.slug}`}
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
                      <time dateTime="">{node.frontmatter.date}</time>
                      <Link
                        to={`${basePostPath}${node.fields.slug}`}
                        className={blogStyles.postTitle}
                      >
                        <h2>{node.frontmatter.title}</h2>
                      </Link>
                      <p className={blogStyles.postExcerpt}>{node.excerpt}</p>
                      <LinkIntl to="/" className={blogStyles.postCategory}>
                        Category
                      </LinkIntl>
                    </article>
                  );
              })}
            </section>
          ) : null}
        </>
      ) : (
        <p style={{ marginTop: "2rem" }}>
          Sorry, there are no posts available.
        </p>
      )}
    </Layout>
  );
};

/*
IMPORTANT:
Currently the 'lang' value in the query filter has been hardcoded since there are
only italian posts and those should be visible in all lang versions of the website.
If in the future the posts have translations change the query to filter by the page
language. To do so add ($language: String) after the query name, and replace the
"it" with $language. The variable value is already being passed to the pageContext
by the gatsby-plugin-intl .
*/
export const query = graphql`
  query allMdPost {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { collection: { eq: "post" }, lang: { eq: "it" } } }
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
