import React from "react";
import { Link } from "gatsby";
import Styled from "styled-components";

const Article = Styled.article`
  border: 1px solid grey;
  background-color: hsl(0, 0%, 97%);
  padding: 1em;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  margin-bottom: 2em;
`;

const Image = Styled.img`
  max-width: 100%;
`;

function featuredImage(frontmatter) {
  if (frontmatter.featured_image && frontmatter.featured_image.publicURL) {
    return <Image src={frontmatter.featured_image.publicURL} alt="" />;
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
