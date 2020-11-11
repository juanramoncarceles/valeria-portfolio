import { graphql, useStaticQuery } from "gatsby";

const useProjects = () => {
  const {
    allMarkdownRemark: { nodes: allProjects },
  } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fields: { collection: { eq: "project" } } }) {
        nodes {
          id
          frontmatter {
            title
            subtitle
            excerpt
            featuredImage {
              sharp: childImageSharp {
                fluid(maxWidth: 900) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `);

  return allProjects.map(project => ({
    id: project.id,
    title: project.frontmatter.title,
    subtitle: project.frontmatter?.subtitle,
    excerpt: project.frontmatter?.excerpt,
    featuredImage: project.frontmatter.featuredImage,
    slug: project.fields.slug,
  }));
};

export default useProjects;