import React from "react";
import { Link } from "gatsby";

import styles from "./Tags.module.css";

export default function Tags({ frontmatter }) {
  if (frontmatter.tags) {
    return (
      <div className={styles.tagContainer}>
        {frontmatter.tags.map(function(tag, index) {
          return (
            <Link
              to={`/tags/${tag}`}
              key={index}
              className={styles.tagContainer__tag}
            >
              #{tag}
            </Link>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}
