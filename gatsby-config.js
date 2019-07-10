module.exports = {
  siteMetadata: {
    title: "A Blog",
    siteUrl: "https://example.com",
    description: "A Blog.",
    author: "A Person"
  },
  plugins: [
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
        name: "images",
        path: `${__dirname}/src/images`
      }
    },
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
          }
        ]
      }
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet"
  ]
};
