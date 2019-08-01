import React from "react";
import { graphql } from "gatsby";
import Styled from "styled-components";

// eslint-disable-next-line
import { fluidImage } from "../components/queryFragments";
import Layout from "../components/Layout";
import Main from "../components/main";
import SubscribeButton from "../components/SubscribeButton";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

const Section = Styled.section`
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

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout title="Blog">
        <Main>
          <Section>
            <h1>Blog</h1>
            <p>
              <SubscribeButton />
            </p>
            {posts.map(({ node }, index) => (
              <Card key={index} {...node} />
            ))}
            <Pagination
              path={this.props.path}
              pageContext={this.props.pageContext}
            />
          </Section>
        </Main>
      </Layout>
    );
  }
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            tags
            title
            date
            image {
              ...fluidImage
            }
          }
          fields {
            slug
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`;