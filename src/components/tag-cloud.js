import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import styles from "./tag-cloud.module.css";

const query = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;

export default function TagCloud() {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const edges = data.allMarkdownRemark.edges;
        const tags = [];
        edges.forEach(edge => tags.push(edge.node.frontmatter.tags));
        return (
          <div className={styles.tagContainer}>
            {Array.from(new Set(tags.flat())).map((tag, index) => {
              return (
                <Link
                  to={"/tags/" + tag}
                  key={index}
                  className={styles.tag}
                >
                  #{tag}
                </Link>
              );
            })}
          </div>
        );
      }}
    />
  );
}
