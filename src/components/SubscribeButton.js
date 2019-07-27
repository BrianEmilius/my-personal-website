import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Styled from "styled-components";

const Subscribe = Styled.a`
  border: 1px solid grey;
  border-radius: 5px;
  padding: .4em 1em;
  font-size: .8em;
  background: linear-gradient(hsl(120, 50%, 50%), hsl(120, 50%, 30%));
  display: inline-block;
  margin-bottom: 1em;
  text-decoration: none;
  color: hsl(0, 0%, 97%);
`;

const query = graphql`
  query {
    rss: file(relativePath: { eq: "subscribe-rss-button.svg" }) {
      publicURL
    }
  }
`;

const Component = function({ rss }) {
  return (
    <Subscribe href="/feed.rss">
      <img
        src={rss.publicURL}
        alt="RSS feed icon"
        style={{ height: "1em", width: "auto" }}
      />{" "}
      Subscribe to this blog
    </Subscribe>
  );
};

export default function SubscribeButton() {
  return <StaticQuery query={query} render={data => <Component {...data} />} />;
}
