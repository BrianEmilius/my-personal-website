import React from "react";
import { Link } from "gatsby";
import Styled from "styled-components";

const Article = Styled.article`
  border: 1px solid grey;
  background-color: hsl(0, 0%, 97%);
  padding: 1em;
  &:not(last-of-type) {
    margin-bottom: 2em;
  }
`;

function featuredImage(frontmatter) {
  if (frontmatter.featured_image && frontmatter.featured_image.publicURL) {
    return <img src={frontmatter.featured_image.publicURL} alt="" />;
  } else {
    return;
  }
}

export default function Card({ excerpt, frontmatter }) {
  return (
    <Article>
      {featuredImage(frontmatter)}
      <p>
        <time dateTime={frontmatter.date}>{frontmatter.date}</time>
      </p>
      <h1>
        <Link to={frontmatter.path}>{frontmatter.title}</Link>
      </h1>
      <div>{excerpt}</div>
    </Article>
  );
}
