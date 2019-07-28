import React from "react";
import { graphql } from "gatsby";
import Styled from "styled-components";

// eslint-disable-next-line
import { fluidImage } from "../components/queryFragments";
import Layout from "../components/Layout";
import SubscribeButton from "../components/SubscribeButton";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

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

export default class BlogList extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout title="Blog">
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
            date(formatString: "YYYY MMMM DD")
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
