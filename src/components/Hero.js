import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Styled from "styled-components";

const imageQuery = graphql`
  query {
    file(base: { eq: "computer-screens-large.jpg" }) {
      publicURL
    }
  }
`;

const Component = function({ file }) {
  const Hero = Styled.header`
		height: 95vh;
		background-image: url(${file.publicURL});
		background-size: cover;
    background-attachment: fixed;
    display: flex;
    padding: 0 var(--pageMargin);
    align-items: center;
    justify-content: center;
		@media screen and (max-width: 30em) {
			background-position: center top;
		}
  `;

  const Paragraph = Styled.p`
    background: hsla(0, 0%, 85%, 0.4);
    padding: 2em;
    margin: 0;
    width: 100%;
    font-size: 120%;
    @media screen and (min-width: 30em) {
      font-size: 180%;
    }
  `;
  return (
    <Hero>
      <Paragraph>
        Hello, World! My name is{" "}
        <strong itemProp="//schema.org/Author">Brian Emilius</strong>.<br />I
        teach web development.
      </Paragraph>
    </Hero>
  );
};

export default function Hero() {
  return (
    <StaticQuery query={imageQuery} render={data => <Component {...data} />} />
  );
}
