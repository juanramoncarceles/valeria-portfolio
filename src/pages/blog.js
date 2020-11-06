import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";

const Blog = ({ data }) => (
  <Layout pageTitle="blog">
    <h1>Blog</h1>
    <p>This is the list of posts</p>
    <h4>{data.allMarkdownRemark.totalCount} posts</h4>
    {data.allMarkdownRemark.nodes.map(node => (
      <div key={node.id}>
        <Link to={`/blog${node.fields.slug}`}>
          <h3>
            {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
          </h3>
          <p>{node.excerpt}</p>
        </Link>
      </div>
    ))}
  </Layout>
);

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
