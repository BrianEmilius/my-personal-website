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
  margin-bottom: 3em;
  position: relative;
`;

const Published = Styled.p`
  position: absolute;
  top: -2.2em;
  left: -0.04em;
  background-color: hsl(0, 0%, 97%);
  border: 1px solid grey;
  border-bottom: none;
  padding: 0 1em;
`;

export default function Card({ excerpt, frontmatter }) {
  return (
    <Article>
      <Published>
        <time dateTime={frontmatter.date}>{frontmatter.date}</time>
      </Published>
      <h1>
        <Link to={frontmatter.path}>{frontmatter.title}</Link>
      </h1>
      <div>{excerpt}</div>
    </Article>
  );
}
