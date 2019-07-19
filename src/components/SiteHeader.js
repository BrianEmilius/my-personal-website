import React from "react";
import Styled from "styled-components";
import { Link, StaticQuery, graphql } from "gatsby";

import PrimaryNavigation from "./PrimaryNavigation";

const Header = Styled.header`
	background-color: hsl(240, 30%, 20%);
  height: 5vh;
	display: flex;
	justify-content: space-between;
  line-height: 5vh;
  padding: 0 var(--pageMargin);
`;

const Image = Styled.img`
  height: 1em;
  width: 1em;
  line-height: 5vh;
  display: inline-block;
`;

function Component({ data }) {
  return (
    <Header>
      <Link to="/">
        <Image src={data.home.publicURL} alt="" />
      </Link>
      <PrimaryNavigation />
    </Header>
  );
}

const query = graphql`
  query {
    home: file(base: { eq: "home.svg" }) {
      publicURL
    }
  }
`;

export default function SiteHeader() {
  return (
    <StaticQuery query={query} render={data => <Component data={data} />} />
  );
}
