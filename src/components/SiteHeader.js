import React from "react";
import Styled from "styled-components";
import { Link } from "gatsby";

import PrimaryNavigation from "./PrimaryNavigation";

const Header = Styled.header`
	background-color: hsl(240, 30%, 20%);
  height: 5vh;
	display: flex;
	justify-content: space-between;
  line-height: 5vh;
  padding: 0 var(--pageMargin);
`;

export default function SiteHeader() {
  return (
    <Header>
      <Link to="/">
        <img src="" alt="icon in the shape of a house" />
      </Link>
      <PrimaryNavigation />
    </Header>
  );
}
