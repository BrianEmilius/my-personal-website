import React from "react";
import { StaticQuery, graphql } from "gatsby";
import Styled from "styled-components";

// eslint-disable-next-line
import { fluidImage } from "../components/queryFragments";
import Layout from "../components/Layout";
import SubscribeButton from "../components/SubscribeButton";
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
  }
`;

const Component = function({ rss, allMarkdownRemark }) {
  return (
    <Layout title="Blog">
      <Section>
        <h1>Blog</h1>
        <p>
          <SubscribeButton />
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
