const path = require("path");

exports.createPages = function({ actions, graphql }) {
  const { createPage } = actions;
  const template = path.resolve("src/templates/blogPost.js");

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
