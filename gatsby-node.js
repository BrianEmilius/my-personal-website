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
  const template = {
    blogList: path.resolve("./src/templates/blogList.js"),
    blogPost: path.resolve("./src/templates/blogPost.js"),
    tagList: path.resolve("./src/templates/tagList.js")
  };

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
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(function(result) {
    if (result.errors) return Promise.reject(result.errors);

    const posts = result.data.allMarkdownRemark.edges;
    const postsPerPage = 5;
    const numPages = Math.ceil(posts.length / postsPerPage);
    let tags = [];

    // Create blog-list pages
    Array.from({ length: numPages }).forEach(function(_, i) {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: template.blogList,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      });
    });

    // Create blog post pages
    posts.forEach(function({ node }) {
      createPage({
        path: node.fields.slug,
        component: template.blogPost,
        context: {}
      });
    });

    posts.forEach(function({ node }) {
      if (node.frontmatter.tags) {
        tags = tags.concat(node.frontmatter.tags);
      }
    });
    new Set(tags).forEach(function(tag) {
      createPage({
        path: `/tags/${tag}`,
        component: template.tagList,
        context: {
          tag
        }
      });
    });
  });
};
