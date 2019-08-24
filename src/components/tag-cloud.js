import React from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
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
              console.log(tag);
              return (
                <AniLink
                  fade
                  to={"/tags/" + tag}
                  key={index}
                  className={styles.tag}
                >
                  #{tag}
                </AniLink>
              );
            })}
          </div>
        );
      }}
    />
  );
}
