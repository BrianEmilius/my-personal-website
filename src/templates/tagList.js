import React, { Component } from "react";
import { graphql } from "gatsby";
import Styled from "styled-components";

// eslint-disable-next-line
import { fluidImage } from "../components/queryFragments";
import Layout from "../components/Layout";
import Main from "../components/main";
import Card from "../components/Card";

const Section = Styled.section`
min-height: 100vh;
padding: 1em;
@media screen and (min-width: 40em) {
  width: 70%;
  max-width: 40em;
  margin: 0 auto;
}
@media screen and (min-width: 64em) {
  width: 100%;
  max-width: 30em;
}
@media screen and (min-width: 70em) {
  width: 100%;
  max-width: 35em;
}
`;

export default class TagList extends Component {
  render() {
    console.log(this.props);
    const posts = this.props.data.allMarkdownRemark.edges;
    const tag = this.props.pageContext.tag;
    return (
      <Layout title={tag}>
        <Main>
          <Section>
            <h1>Tag: {tag}</h1>
            {posts.map(({ node }, index) => (
              <Card key={index} {...node} />
            ))}
          </Section>
        </Main>
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
