import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
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

const Image = Styled.img`
  height: 1rem;
  width: auto;
  display: inline-block;
`;

const Component = function({ rss }) {
  return (
    <nav>
      <Ul>
        <li>
          <Anchor to="/blog">Blog</Anchor>
        </li>
        <li>
          <Anchor to="/rss.xml">
            <Image src={rss.publicURL} alt="RSS feed icon" title="RSS Feed" />{" "}
            RSS Feed
          </Anchor>
        </li>
      </Ul>
    </nav>
  );
};

const query = graphql`
  query {
    rss: file(base: { eq: "subscribe-rss-button.svg" }) {
      publicURL
    }
  }
`;

export default function PrimaryNavigation() {
  return <StaticQuery query={query} render={data => <Component {...data} />} />;
}
