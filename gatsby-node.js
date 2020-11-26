const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    // If using MDX change for "Mdx".
    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;
    // The slug is created as the name of the file or parent folder in case of files called index.
    let slug = createFilePath({ node, getNode });
    // TODO the slug could be created here instead of below: /lang/collection/slug/
    // Regular expression to match the language sub extension.
    const regexp = /\.(?<lang>[a-z]{2})$/;
    const match = regexp.exec(parent.name);
    let lang = "";
    // If there is a lang code in the name of the file it is set as the value of the lang field to use it later for the slug
    if (match && match["groups"].lang) {
      slug = slug.replace(`${parent.name}/`, "");
      lang = match["groups"].lang;
    }
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
    // Add field 'lang' to the node.
    createNodeField({
      node,
      name: "lang",
      value: lang,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // THE POSTS
  const {
    data: {
      allMarkdownRemark: { nodes: posts },
    },
  } = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { collection: { eq: "post" } } }) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  posts.forEach(post => {
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
      allMarkdownRemark: { nodes: projects },
    },
  } = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fields: { collection: { eq: "project" } }
          frontmatter: { visible: { ne: false } }
        }
      ) {
        nodes {
          id
          fields {
            slug
            lang
          }
        }
      }
    }
  `);

  projects.forEach(project => {
    const projectPath = `${project.fields.lang}/project${project.fields.slug}`;
    createPage({
      path: projectPath,
      component: path.resolve("./src/templates/project.js"),
      context: {
        id: project.id,
      },
    });
    reporter.info(`Created project: ${projectPath}`);
  });
};
