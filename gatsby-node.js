const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

// Get the `Gatsby plugin intl` config options to use when creating the posts and project pages.
const config = require(`./gatsby-config`);
// TODO Move this to the onPreInit phase.
let gatsbyPluginIntlOptions;
const gatsbyPluginIntlConfig = config.plugins.find(
  plugin => plugin.resolve === "gatsby-plugin-intl"
);
if (gatsbyPluginIntlConfig) {
  gatsbyPluginIntlOptions = gatsbyPluginIntlConfig.options;
} else {
  console.error(
    "No `gatsby-plugin-intl` was found in gatsby-config.js plugins array."
  );
}

/************* Methods from Gatsby plugin intl - gatsby-node.js **************/

const flattenMessages = (nestedMessages, prefix = "") => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? prefix + "." + key : key;

    if (typeof value === "string") {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
};

const getMessages = (path, language) => {
  try {
    const messages = require(path + "/" + language + ".json");
    return flattenMessages(messages);
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      process.env.NODE_ENV !== "test" &&
        console.error(
          "[gatsby-plugin-intl] couldn't find file \"" +
            path +
            "/" +
            language +
            '.json"'
        );
    }

    throw error;
  }
};

/*****************************************************************************/

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    // If using MDX change for "Mdx".
    const parent = getNode(node.parent);
    const collection = parent.sourceInstanceName;
    // The slug is created as the `folder name + file name`, or only the folder name in case of files called index.
    let slug = createFilePath({ node, getNode });
    // TODO the slug could be created here instead of below: /lang/collection/slug/
    // Regular expression to match the language sub extension.
    const regexp = /\.(?<lang>[a-z]{2})$/;
    const match = regexp.exec(parent.name);
    // Set by default as the defaultLanguage.
    let lang = gatsbyPluginIntlOptions.defaultLanguage;
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
            lang
          }
        }
      }
    }
  `);

  posts.forEach(post => {
    // With `getMessages()` I replicate the `gatsby-plugin-intl` behavior but for posts, which are handled by me.
    const messages = getMessages(
      gatsbyPluginIntlOptions.path,
      post.fields.lang
    );
    const postPath = `${
      post.fields.lang === gatsbyPluginIntlOptions.defaultLanguage
        ? ""
        : post.fields.lang
    }/blog${post.fields.slug}`;
    createPage({
      path: postPath,
      component: path.resolve("./src/templates/post.js"),
      context: {
        id: post.id,
        // `intl` makes gatsby-plugin-intl skip this page, otherwise creates a route for each lang code for each translation which is wrong.
        intl: {
          language: post.fields.lang,
          languages: gatsbyPluginIntlOptions.languages,
          routed: true,
          originalPath: `blog${post.fields.slug}`,
          messages,
          ignore: true, // This is a custom field to be used later to know that this page's url translations are handled by me.
        },
      },
    });
    reporter.info(`Created post: ${postPath}`);
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
    // With `getMessages()` I replicate the `gatsby-plugin-intl` behavior but for projects, which are handled by me.
    const messages = getMessages(
      gatsbyPluginIntlOptions.path,
      project.fields.lang
    );
    const projectPath = `${
      project.fields.lang === gatsbyPluginIntlOptions.defaultLanguage
        ? ""
        : project.fields.lang
    }/project${project.fields.slug}`;
    createPage({
      path: projectPath,
      component: path.resolve("./src/templates/project.js"),
      context: {
        id: project.id,
        // `intl` makes gatsby-plugin-intl skip this page, otherwise creates a route for each lang code for each translation which is wrong.
        intl: {
          language: project.fields.lang,
          languages: gatsbyPluginIntlOptions.languages,
          routed: true,
          originalPath: `project${project.fields.slug}`,
          messages,
          ignore: true, // This is a custom field to be used later to know that this page's url translations are handled by me.
        },
      },
    });
    reporter.info(`Created project: ${projectPath}`);
  });
};
