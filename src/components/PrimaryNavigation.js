import React from "react";
import { Link } from "gatsby";
import Styled from "styled-components";

const Ul = Styled.ul`
	list-style: none;
	padding: 0;
  margin: 0;
  line-height: 5vh;
  display: flex;
`;

const Anchor = Styled(Link)`
  color: hsl(0, 0%, 96%);
  text-decoration: none;
  &:not(last-of-type) {
    padding: 0 1em;
  }
`;

export default function PrimaryNavigation() {
  return (
    <nav>
      <Ul>
        <li>
          <Anchor to="/blog">Blog</Anchor>
        </li>
      </Ul>
    </nav>
  );
}
