import React from "react";
import { Link } from "gatsby";

import CoverImage from "./CoverImage";
import Tags from "./Tags";
import styles from "./Card.module.css";

export default function Card({ excerpt, frontmatter, fields }) {
  return (
    <article className={styles.article}>
      <p className={styles.article__published}>
        <time dateTime={frontmatter.date}>{frontmatter.date}</time>
      </p>
      <CoverImage frontmatter={frontmatter} />
      <h1>
        <Link to={fields.slug} className={styles.article__heading}>
          {frontmatter.title}
        </Link>
      </h1>
      {excerpt}
      <Tags frontmatter={frontmatter} />
    </article>
  );
}
