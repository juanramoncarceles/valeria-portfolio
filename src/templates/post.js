import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import { useTheme } from "../context/ThemeContext";

import postStyles from "./post.module.css";

const Post = ({
  data: {
    markdownRemark: { html, frontmatter },
  },
}) => {
  const { isDark } = useTheme();
  const featuredImgFluid = frontmatter.featuredImage.sharp.fluid;

  const categories = frontmatter.categories ?? ["uncategorized"];

  return (
    <Layout
      pageTitle={frontmatter.title}
      cssClass={`${postStyles.pageContainer} ${isDark ? postStyles.dark : ""}`}
    >
      <hgroup className={postStyles.title}>
        <h1>{frontmatter.title}</h1>
        {frontmatter.subtitle ? <h2>{frontmatter.subtitle}</h2> : null}
      </hgroup>
      <time className={postStyles.date} dateTime={frontmatter.date}>
        {frontmatter.formattedDate}
      </time>
      <ul className={postStyles.categories}>
        {categories.map(category => (
          <li key={category}>
            {category}
            {/* <Link to={`/category/${category}`}>{category}</Link> */}
          </li>
        ))}
      </ul>
      <figure>
        <Img fluid={featuredImgFluid} />
        {frontmatter.featuredImageCaption ? (
          <figcaption className={postStyles.featuredImageCaption}>
            {frontmatter.featuredImageCaption}
          </figcaption>
        ) : null}
      </figure>
      <section
        className={postStyles.postWrapper}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {frontmatter.resources ? (
        <section className={postStyles.resources}>
          <h4>Fonti e link correlati</h4>
          <ul>
            {frontmatter.resources.map(resource => (
              <li key={resource.url}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Layout>
  );
};

export const query = graphql`
  query($id: String!, $lang: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        date
        formattedDate: date(formatString: "DD MMMM, YYYY", locale: $lang)
        featuredImage {
          sharp: childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        featuredImageCaption
        categories
        resources {
          text
          url
        }
      }
    }
  }
`;

export default Post;
