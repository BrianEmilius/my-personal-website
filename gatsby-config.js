module.exports = {
  siteMetadata: {
    title: "Brian Emilius' Personal Site",
    siteUrl: "https://www.brianemilius.com",
    description: "A personal website about Brian Emilius.",
    author: "Brian Emilius"
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Brian Emilius' Personal Site",
        short_name: "BE Site",
        start_url: "/",
        background_color: "#242442",
        theme_color: "#242442",
        display: "standalone",
        icon: "./src/images/icon.png",
        crossOrigin: "use-credentials"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "scripts",
        path: `${__dirname}/src/scripts`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 786
            }
          },
          "gatsby-remark-prismjs"
        ]
      }
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-transition-link",
    "gatsby-plugin-netlify",
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                })
              ),
            query: `
              {
                allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.rss",
            title: "Brian Emilius' RSS Feed"
          }
        ]
      }
    }
  ]
};
