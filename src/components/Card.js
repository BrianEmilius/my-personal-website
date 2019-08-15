import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import moment from "moment";

import CoverImage from "./CoverImage";
import Tags from "./Tags";
import styles from "./Card.module.css";

export default function Card({ excerpt, frontmatter, fields }) {
  return (
    <article className={styles.article}>
      <p className={styles.article__published}>
        <time dateTime={frontmatter.date}>
          {moment(frontmatter.date).format("MMM Do YYYY")}
        </time>
      </p>
      <CoverImage frontmatter={frontmatter} />
      <h1>
        <AniLink fade to={fields.slug} className={styles.article__heading}>
          {frontmatter.title}
        </AniLink>
      </h1>
      <p className={styles.excerpt}>{excerpt}</p>
      <Tags frontmatter={frontmatter} />
    </article>
  );
}
