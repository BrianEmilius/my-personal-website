import React, { Component } from "react";
import { graphql } from "gatsby";
import Styled from "styled-components";

// eslint-disable-next-line
import { fluidImage } from "../components/queryFragments";
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

export default class TagList extends Component {
  render() {
    console.log(this.props);
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    return (
      <Layout title={tag}>
        <Section>
          <h1>Tag: {tag}</h1>
          {posts.map(({ node }, index) => (
            <Card key={index} {...node} />
          ))}
        </Section>
      </Layout>
    );
  }
}

export const tagListQuery = graphql`
  query tagListQuery($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 300)
          fields {
            slug
          }
          frontmatter {
            tags
            title
            date(formatString: "YYYY-MM-DD")
            image {
              ...fluidImage
            }
          }
        }
      }
    }
  }
`;
