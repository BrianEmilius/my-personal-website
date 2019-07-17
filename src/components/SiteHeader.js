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
  height: 100%;
  width: auto;
`;

function Component({ data }) {
  return (
    <Header>
      <Link to="/">
        <Image src={data.file.publicURL} alt="icon in the shape of a house" />
      </Link>
      <PrimaryNavigation />
    </Header>
  );
}

const query = graphql`
  query {
    file(base: { eq: "home.svg" }) {
      publicURL
    }
  }
`;

export default function SiteHeader() {
  return (
    <StaticQuery query={query} render={data => <Component data={data} />} />
  );
}
