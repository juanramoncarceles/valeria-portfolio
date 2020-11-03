const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") { // If using MDX change for "Mdx".
    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;
    // The slug is created as the name of the file or parent folder in case of files called index.
    const slug = createFilePath({ node, getNode });
    // Add field 'collection' (type) to the node.
    createNodeField({
      node,
      name: "collection",
      value: collection,
    });
    // Add field 'slug' to the node.
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  
  // THE POSTS
  const {
    data: {
      allMarkdownRemark: {
        nodes: posts
      }
    }
  } = await graphql(`
    query {
      allMarkdownRemark(filter: {fields: {collection: {eq: "post"}}}) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  posts.forEach( post => {
    createPage({
      path: `blog${post.fields.slug}`, // Another option is to use the frontmatter title to create the slug parsing it.
      component: path.resolve("./src/templates/post.js"),
      context: {
        id: post.id,
      },
    });
  });


  // THE PROJECTS
  const {
    data: {
      allMarkdownRemark: {
        nodes: projects
      }
    }
  } = await graphql(`
    query {
      allMarkdownRemark(filter: {fields: {collection: {eq: "project"}}}) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);
  
  projects.forEach( project => {
    createPage({
      path: `project${project.fields.slug}`,
      component: path.resolve("./src/templates/project.js"),
      context: {
        id: project.id,
      },
    });
  });
}
