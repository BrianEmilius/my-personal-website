const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const Jimp = require("jimp");

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
              title
            }
          }
        }
      }
    }
  `).then(function(result) {
    if (result.errors) return Promise.reject(result.errors);

    /* async function createCardImage(node) {
      try {
        const base = await Jimp.read("./src/images/base-card-image.png");
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        const filename = node.frontmatter.path.split("/blog/").pop();
        base.print(
          font,
          32,
          32,
          {
            text: node.frontmatter.title,
            alignmentX: Jimp.HORIZONTAL_ALIGN_LEFT,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
          },
          625,
          358
        );
        base.write(`./src/images/${filename}.png`);
      } catch (error) {
        console.log(error);
      }
    } */

    return result.data.allMarkdownRemark.edges.forEach(function({ node }) {
      //createCardImage(node);
      createPage({
        path: node.frontmatter.path,
        component: template,
        context: {}
      });
    });
  });
};
