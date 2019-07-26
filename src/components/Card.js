import React from "react";
import { Link } from "gatsby";
import Styled from "styled-components";

import CoverImage from "./CoverImage";

const Article = Styled.article`
  margin-bottom: 3em;
  padding-bottom: 1em;
  border-bottom: 3px solid hsl(240, 30%, 20%);
`;

const Published = Styled.p`
  font-size: .8em;
  color: grey;
  text-align: center;
`;

export default function Card({ excerpt, frontmatter }) {
  return (
    <Article>
      <Published>
        <time dateTime={frontmatter.date}>{frontmatter.date}</time>
      </Published>
      <CoverImage frontmatter={frontmatter} />
      <h1>
        <Link to={frontmatter.path}>{frontmatter.title}</Link>
      </h1>
      {excerpt}
    </Article>
  );
}
