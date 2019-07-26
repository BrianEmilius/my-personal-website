import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Styled from "styled-components";

import Layout from "../components/Layout";
import Card from "../components/Card";

const Section = Styled.section`
  background-color: hsl(0, 0%, 97%);
  padding: 1em;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  min-height: 95vh;
  @media screen and (min-width: 30em) {
    margin: 0 var(--pageMargin);
  }
`;

const Subscribe = Styled.a`
  border: 1px solid grey;
  border-radius: 5px;
  padding: 1em;
  background: linear-gradient(hsl(120, 50%, 50%), hsl(120, 50%, 30%));
  display: inline-block;
  margin-bottom: 1em;
  text-decoration: none;
  color: hsl(0, 0%, 97%);
`;

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`;

const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "YYYY MMMM DD")
            image {
              ...fluidImage
            }
          }
          excerpt(pruneLength: 300)
        }
      }
    }
    rss: file(base: { eq: "subscribe-rss-button.svg" }) {
      publicURL
    }
  }
`;

const Component = function({ rss, allMarkdownRemark }) {
  return (
    <Layout title="Blog">
      <Section>
        <h1>Blog</h1>
        <p>
          <Subscribe href="/feed.rss">
            <img
              src={rss.publicURL}
              alt="RSS feed icon"
              style={{ height: "1em", width: "auto" }}
            />{" "}
            Subscribe to this blog
          </Subscribe>
        </p>
        {allMarkdownRemark.edges.map(({ node }, index) => (
          <Card key={index} {...node} />
        ))}
      </Section>
    </Layout>
  );
};

export default function BlogList() {
  return <StaticQuery query={query} render={data => <Component {...data} />} />;
}
