import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Styled from "styled-components";
import Layout from "../components/Layout";
import Card from "../components/Card";

const Section = Styled.section`
  min-height: 100vh;
  padding: 0 var(--pageMargin);
`;

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
                  featured_image {
                    publicURL
                  }
                }
                excerpt(pruneLength: 150)
              }
            }
          }
        }
      `}
      render={data => (
        <Layout>
          <Section>
            <h1>Blog</h1>
            {data.allMarkdownRemark.edges.map(({ node }, index) => (
              <Card key={index} {...node} />
            ))}
          </Section>
        </Layout>
      )}
    />
  );
}
