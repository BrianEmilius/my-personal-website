import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import styles from "./Pagination.module.css";

export default function Pagination({ path, pageContext }) {
  return (
    <nav className={styles.pagination}>
      {Array.from({ length: pageContext.numPages }).map((_, i) => {
        const page = i + 1;
        if (page === pageContext.currentPage) {
          let className = styles.pagination__link;
          className += " " + styles.pagination__link__active;
          return (
            <span className={className} key={i}>
              {page}
            </span>
          );
        } else {
          return (
            <AniLink
              to={`/blog/${page > 1 ? page : ""}`}
              className={styles.pagination__link}
              key={i}
            >
              {page}
            </AniLink>
          );
        }
      })}
    </nav>
  );
}
