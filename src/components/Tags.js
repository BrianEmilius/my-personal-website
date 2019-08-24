import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";

import styles from "./Tags.module.css";

export default function Tags({ frontmatter }) {
  if (frontmatter.tags) {
    return (
      <div className={styles.tagContainer}>
        {frontmatter.tags.map(function(tag, index) {
          return (
            <AniLink
              fade
              to={`/tags/${tag}`}
              key={index}
              className={styles.tagContainer__tag}
            >
              #{tag}
            </AniLink>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
