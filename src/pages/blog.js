import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout";
import Card from "../components/Card";

export default function BlogList() {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                frontmatter {
                  title
                  path
                  date(formatString: "YYYY MMMM DD")
                }
                excerpt(pruneLength: 150)
              }
            }
          }
        }
      `}
      render={data => (
        <Layout>
          <h1>Blog</h1>
          {data.allMarkdownRemark.edges.map(({ node }, index) => (
            <Card key={index} {...node} />
          ))}
        </Layout>
      )}
    />
  );
}
