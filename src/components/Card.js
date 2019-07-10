import React from "react";
import { Link } from "gatsby";

export default function Card({ frontmatter }) {
  return (
    <article>
      <h1>
        <Link to={frontmatter.path}>{frontmatter.title}</Link>
      </h1>
    </article>
  );
}
