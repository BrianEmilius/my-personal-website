import React from "react";
import { graphql, StaticQuery } from "gatsby";

// eslint-disable-next-line
import { fluidImage } from "./queryFragments";
import Card from "./Card";
import styles from "./LatestPosts.module.css";

const query = graphql`
  query postsQuery {
    allMarkdownRemark(
      limit: 6
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            tags
            image {
              ...fluidImage
            }
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default function LatestPosts() {
  return (
    <StaticQuery
      query={query}
      render={data => (
        <section className={styles.latestPosts}>
          <h1 className={styles.latestPosts__heading}>Latest Blogposts</h1>
          {data.allMarkdownRemark.edges.map((post, i) => (
            <Card {...post.node} key={i} />
          ))}
        </section>
      )}
    />
  );
}
