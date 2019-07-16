import React from "react";
import { Link } from "gatsby";
import Styled from "styled-components";

const Article = Styled.article`

`;

export default function Card({ excerpt, frontmatter }) {
  return (
    <Article>
      <h1>
        <Link to={frontmatter.path}>{frontmatter.title}</Link>
      </h1>
      <div>{excerpt}</div>
    </Article>
  );
}
