const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = function({ node, actions, getNode }) {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value
    });
  }
};

exports.createPages = function({ actions, graphql }) {
  const { createPage, createRedirect } = actions;
  const template = path.resolve("src/templates/blogPost.js");

  createRedirect({
    fromPath: "https://brianemilius.netlify.com/*",
    toPath: "https://www.brianemilius.com/:splat",
    isPermanent: true
  });
  createRedirect({
    fromPath: "https://brianemilius.com/*",
    toPath: "https://www.brianemilius.com/:splat",
    isPermanent: true
  });

  return graphql(`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(function(result) {
    if (result.errors) return Promise.reject(result.errors);

    return result.data.allMarkdownRemark.edges.forEach(function({ node }) {
      createPage({
        path: node.frontmatter.path,
        component: template,
        context: {}
      });
    });
  });
};
